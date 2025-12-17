const express = require("express");
const cors = require("cors");
const path = require("path");
const { loadTranscripts } = require("./utils/dataLoader");
const { identifyClips } = require("./utils/scoring");

const app = express();
const PORT = process.env.PORT || 3000;

// ─────────────────────────────────────────────
// Middleware
// ─────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// ─────────────────────────────────────────────
// Simple in-memory cache (replaceable w/ Redis)
// ─────────────────────────────────────────────
const clipsCache = new Map();

// ─────────────────────────────────────────────
// Load transcript data on startup
// ─────────────────────────────────────────────
let transcriptData = [];
try {
  transcriptData = loadTranscripts();
  console.log(`✓ Loaded ${transcriptData.length} episodes`);
  console.log(
    `✓ Total segments: ${transcriptData.reduce(
      (sum, ep) => sum + ep.transcript.length,
      0
    )}`
  );
} catch (error) {
  console.error("❌ Error loading transcript data:", error.message);
  process.exit(1);
}

// ─────────────────────────────────────────────
// Health check
// ─────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    message: "Shorts Opportunity Finder API",
    status: "running"
  });
});

// ─────────────────────────────────────────────
// List episodes
// ─────────────────────────────────────────────
app.get("/api/episodes", (req, res) => {
  const episodes = transcriptData.map(ep => ({
    episode_id: ep.episode_id,
    title: ep.title,
    duration: ep.duration,
    segment_count: ep.transcript.length
  }));

  res.json({
    episodes,
    total: episodes.length
  });
});

// ─────────────────────────────────────────────
// MAIN: Identify + score clips
// ─────────────────────────────────────────────
app.get("/api/clips", (req, res) => {
  const {
    episode_id = "all",
    min_duration = 30,
    max_duration = 90,
    limit = 10,
    min_score = 70,
    speaker
  } = req.query;

  const query = {
    episode_id,
    min_duration: Number(min_duration),
    max_duration: Number(max_duration),
    min_score: Number(min_score),
    limit: Number(limit)
  };

  // ─── Cache lookup ──────────────────────────
  const cacheKey = JSON.stringify({ ...query, speaker });
  if (clipsCache.has(cacheKey)) {
    return res.json({
      ...clipsCache.get(cacheKey),
      cached: true
    });
  }

  // ─── Filter episodes ───────────────────────
  const episodesProcessed =
    episode_id === "all"
      ? transcriptData
      : transcriptData.filter(ep => ep.episode_id === episode_id);

  // ─── Build + score clips ───────────────────
  let allClips = [];

  for (const ep of episodesProcessed) {
    const clips = identifyClips(ep.transcript, {
      minDuration: query.min_duration,
      maxDuration: query.max_duration,
      minScore: query.min_score,
      combineSegments: true
    });

    const normalized = clips.map(c => ({
      ...c,
      episode_id: ep.episode_id,
      clip_id: `clip_${ep.episode_id}_${c.clip_id}`
    }));

    allClips.push(...normalized);
  }

  // ─── Optional speaker filter ───────────────
  if (speaker) {
    allClips = allClips.filter(c =>
      c.speaker?.toLowerCase().includes(speaker.toLowerCase())
    );
  }

  // ─── Sort + limit ──────────────────────────
  allClips.sort((a, b) => b.score - a.score || a.start_time - b.start_time);

  const top = allClips
    .slice(0, query.limit)
    .map((c, idx) => ({ ...c, rank: idx + 1 }));

  // ─── Metadata ──────────────────────────────
  const scores = top.map(c => c.score);
  const metadata = {
    total_clips_analyzed: transcriptData.reduce(
      (sum, ep) => sum + ep.transcript.length,
      0
    ),
    clips_returned: top.length,
    episodes_processed: episodesProcessed.length,
    min_score: scores.length ? Math.min(...scores) : null,
    max_score: scores.length ? Math.max(...scores) : null,
    avg_score: scores.length
      ? Number((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1))
      : null
  };

  const response = {
    clips: top.map(c => ({
      clip_id: c.clip_id,
      episode_id: c.episode_id,
      start_time: c.start_time,
      end_time: c.end_time,
      duration: Number(c.duration.toFixed(1)),
      speaker: c.speaker,
      score: c.score,
      rank: c.rank,
      text: c.text,
      engagement_factors: c.engagement_factors,
      reasoning: c.reasoning
    })),
    metadata,
    query
  };

  // ─── Cache store ───────────────────────────
  clipsCache.set(cacheKey, response);

  res.json(response);
});

// ─────────────────────────────────────────────
// Error handling
// ─────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    error: "Internal server error",
    message: err.message
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    error: "Not found",
    message: `Route ${req.method} ${req.path} not found`
  });
});

// ─────────────────────────────────────────────
// Start server
// ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Episodes loaded: ${transcriptData.length}`);
});

module.exports = app;
