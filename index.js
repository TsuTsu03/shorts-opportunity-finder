const express = require('express');
const cors = require('cors');
const { loadTranscripts } = require('./utils/dataLoader');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Load sample data on startup
let transcriptData = [];
try {
  transcriptData = loadTranscripts();
  console.log(`✓ Loaded ${transcriptData.length} episodes`);
  console.log(`✓ Total segments: ${transcriptData.reduce((sum, ep) => sum + ep.transcript.length, 0)}`);
} catch (error) {
  console.error('❌ Error loading transcript data:', error.message);
  process.exit(1);
}

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Shorts Opportunity Finder API',
    status: 'running',
    endpoints: {
      health: 'GET /',
      clips: 'GET /api/clips',
      episodes: 'GET /api/episodes'
    }
  });
});

// Get list of available episodes
app.get('/api/episodes', (req, res) => {
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

// Main endpoint: Identify and score potential clips
app.get('/api/clips', (req, res) => {
  // TODO: Implement your clip identification and scoring logic here
  // 
  // Your implementation should:
  // 1. Parse transcript segments from transcriptData
  // 2. Identify potential clips (30-90 seconds ideal)
  // 3. Score each clip based on engagement factors
  // 4. Return top clips sorted by score
  //
  // Query parameters you might want to support:
  // - episode_id: filter by specific episode
  // - min_duration: minimum clip length in seconds
  // - max_duration: maximum clip length in seconds
  // - limit: number of results to return
  
  const { episode_id, limit = 10 } = req.query;
  
  // Example response structure (replace with your actual implementation)
  const exampleResponse = {
    message: 'TODO: Implement clip identification and scoring',
    clips: [],
    total_analyzed: 0,
    query_params: {
      episode_id: episode_id || 'all',
      limit: parseInt(limit)
    }
  };
  
  res.json(exampleResponse);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.method} ${req.path} not found`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Episodes loaded: ${transcriptData.length}`);
  console.log(`\n💡 Start building your solution!\n`);
});

module.exports = app;
