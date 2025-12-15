/**
 * Scoring utilities for identifying engaging short-form clips
 * 
 * Your goal: Implement logic to score transcript segments based on 
 * their potential to become engaging short-form content (30-90 seconds)
 */

/**
 * Score a potential clip based on engagement factors
 * 
 * @param {Object} segment - Transcript segment with start_time, end_time, speaker, text
 * @param {Object} context - Additional context (previous/next segments, episode data, etc.)
 * @returns {Object} Score object with total score and reasoning
 */
function scoreClip(segment, context = {}) {
  let score = 0;
  const factors = {
    optimal_length: false,
    has_hook: false,
    has_question: false,
    has_controversy: false,
    has_numbers: false,
    completeness: false,
    action_words: []
  };
  
  // Calculate clip duration
  const duration = segment.end_time - segment.start_time;
  const text = segment.text.toLowerCase();
  
  // TODO: Implement your scoring logic here
  // Consider factors like:
  // - Duration (30-90 seconds ideal)
  // - Questions (ends with ?)
  // - Strong action words (mistake, never, always, must, secret)
  // - Numbers and statistics
  // - Completeness (ends with proper punctuation)
  // - Controversial or strong opinions
  // - Actionable advice
  
  // Example starter logic (replace with your own):
  
  // Length scoring
  if (duration >= 30 && duration <= 90) {
    score += 30;
    factors.optimal_length = true;
  }
  
  // Question detection
  if (text.includes('?')) {
    score += 10;
    factors.has_question = true;
  }
  
  // TODO: Add more scoring logic here
  
  return {
    score: Math.min(score, 100), // Cap at 100
    factors,
    duration,
    reasoning: generateReasoning(factors)
  };
}

/**
 * Generate human-readable reasoning for the score
 * @param {Object} factors - Engagement factors object
 * @returns {string} Human-readable explanation
 */
function generateReasoning(factors) {
  const reasons = [];
  
  if (factors.optimal_length) reasons.push('optimal length');
  if (factors.has_question) reasons.push('question hook');
  if (factors.has_controversy) reasons.push('controversial take');
  if (factors.has_numbers) reasons.push('specific numbers');
  if (factors.completeness) reasons.push('complete thought');
  if (factors.action_words.length > 0) reasons.push('strong language');
  
  return reasons.length > 0 ? reasons.join(' + ') : 'needs improvement';
}

/**
 * Identify potential clips from an episode's transcript
 * 
 * @param {Array} transcript - Array of transcript segments
 * @param {Object} options - Options for clip identification
 * @returns {Array} Array of potential clips with scores
 */
function identifyClips(transcript, options = {}) {
  const {
    minDuration = 30,
    maxDuration = 90,
    minScore = 0
  } = options;
  
  const clips = [];
  
  // TODO: Implement logic to identify potential clips
  // Consider:
  // - Single segments that are the right length
  // - Multiple consecutive segments combined
  // - Avoiding segments that cut off mid-thought
  
  // Example: Score each segment individually
  transcript.forEach((segment, index) => {
    const duration = segment.end_time - segment.start_time;
    
    // Skip if outside duration range
    if (duration < minDuration || duration > maxDuration) {
      return;
    }
    
    const context = {
      previousSegment: transcript[index - 1],
      nextSegment: transcript[index + 1],
      segmentIndex: index
    };
    
    const scoringResult = scoreClip(segment, context);
    
    if (scoringResult.score >= minScore) {
      clips.push({
        clip_id: `clip_${segment.id}`,
        start_time: segment.start_time,
        end_time: segment.end_time,
        duration: scoringResult.duration,
        speaker: segment.speaker,
        text: segment.text,
        score: scoringResult.score,
        factors: scoringResult.factors,
        reasoning: scoringResult.reasoning
      });
    }
  });
  
  // Sort by score (highest first)
  clips.sort((a, b) => b.score - a.score);
  
  return clips;
}

module.exports = {
  scoreClip,
  identifyClips,
  generateReasoning
};
