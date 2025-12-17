const fs = require("fs");
const path = require("path");

/**
 * Load transcript data from JSON file
 * @returns {Array} Array of episode objects with transcripts
 */
function loadTranscripts() {
  const dataPath = path.join(__dirname, "../../data/all_transcripts.json");

  if (!fs.existsSync(dataPath)) {
    throw new Error(`Transcript data not found at ${dataPath}`);
  }

  const rawData = fs.readFileSync(dataPath, "utf8");
  const transcripts = JSON.parse(rawData);

  return transcripts;
}

/**
 * Load a single episode by ID
 * @param {string} episodeId - Episode ID to load
 * @returns {Object} Episode object with transcript
 */
function loadEpisode(episodeId) {
  const transcripts = loadTranscripts();
  const episode = transcripts.find(ep => ep.episode_id === episodeId);

  if (!episode) {
    throw new Error(`Episode ${episodeId} not found`);
  }

  return episode;
}

/**
 * Load historical performance data (optional reference)
 * @returns {Array} Array of historical clip performance data
 */
function loadHistoricalPerformance() {
  const dataPath = path.join(
    __dirname,
    "../../data/historical-performance.json"
  );

  if (!fs.existsSync(dataPath)) {
    console.warn("Historical performance data not found (optional)");
    return [];
  }

  const rawData = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(rawData);
}

module.exports = {
  loadTranscripts,
  loadEpisode,
  loadHistoricalPerformance
};
