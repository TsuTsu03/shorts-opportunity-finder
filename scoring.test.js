const { scoreClip, identifyClips } = require('../src/utils/scoring');

describe('Scoring Utilities', () => {
  describe('scoreClip', () => {
    test('should score a clip with optimal length higher', () => {
      const segment = {
        id: 1,
        start_time: 0,
        end_time: 45, // 45 seconds - optimal
        speaker: 'Test Speaker',
        text: 'This is a test segment with optimal length.'
      };
      
      const result = scoreClip(segment);
      
      expect(result.score).toBeGreaterThan(0);
      expect(result.factors.optimal_length).toBe(true);
    });
    
    test('should detect questions in text', () => {
      const segment = {
        id: 1,
        start_time: 0,
        end_time: 45,
        speaker: 'Test Speaker',
        text: 'Why do developers love clean code?'
      };
      
      const result = scoreClip(segment);
      
      expect(result.factors.has_question).toBe(true);
      expect(result.score).toBeGreaterThan(0);
    });
    
    // TODO: Add more tests for your scoring logic
  });
  
  describe('identifyClips', () => {
    test('should filter clips by duration', () => {
      const transcript = [
        {
          id: 1,
          start_time: 0,
          end_time: 10, // Too short
          speaker: 'Speaker',
          text: 'Short segment.'
        },
        {
          id: 2,
          start_time: 10,
          end_time: 55, // Good length
          speaker: 'Speaker',
          text: 'This is a good length segment with interesting content.'
        },
        {
          id: 3,
          start_time: 55,
          end_time: 200, // Too long
          speaker: 'Speaker',
          text: 'Very long segment that goes on and on...'
        }
      ];
      
      const clips = identifyClips(transcript, {
        minDuration: 30,
        maxDuration: 90
      });
      
      expect(clips.length).toBe(1);
      expect(clips[0].duration).toBeGreaterThanOrEqual(30);
      expect(clips[0].duration).toBeLessThanOrEqual(90);
    });
    
    // TODO: Add more tests for your clip identification logic
  });
});
