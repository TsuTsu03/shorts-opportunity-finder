const { scoreClip, identifyClips } = require("../src/utils/scoring");

describe("Scoring Utilities", () => {
  describe("scoreClip", () => {
    test("should score a clip with optimal length higher", () => {
      const segment = {
        id: 1,
        start_time: 0,
        end_time: 45, // 45 seconds - optimal
        speaker: "Test Speaker",
        text: "This is a test segment with optimal length."
      };

      const result = scoreClip(segment);

      expect(result.score).toBeGreaterThan(0);
      expect(result.factors.optimal_length).toBe(true);
    });

    test("should detect questions in text", () => {
      const segment = {
        id: 1,
        start_time: 0,
        end_time: 45,
        speaker: "Test Speaker",
        text: "Why do developers love clean code?"
      };

      const result = scoreClip(segment);

      expect(result.factors.has_question).toBe(true);
      expect(result.score).toBeGreaterThan(0);
    });

    test("should penalize intro or outro content", () => {
      const segment = {
        start_time: 0,
        end_time: 50,
        text: "Welcome to the show, thanks for listening!"
      };

      const result = scoreClip(segment);

      expect(result.score).toBeLessThan(30);
    });

    test("should reward actionable advice", () => {
      const segment = {
        start_time: 0,
        end_time: 50,
        text:
          "Here is how you fix this problem. First, measure. Second, improve."
      };

      const result = scoreClip(segment);

      expect(result.score).toBeGreaterThan(60);
    });

    test("should detect numbers and specificity", () => {
      const segment = {
        start_time: 0,
        end_time: 45,
        text: "There are 3 ways to reduce cloud costs by 40%."
      };

      const result = scoreClip(segment);

      expect(result.factors.has_numbers).toBe(true);
    });
  });

  describe("identifyClips", () => {
    test("should filter clips by duration", () => {
      const transcript = [
        {
          id: 1,
          start_time: 0,
          end_time: 10, // Too short
          speaker: "Speaker",
          text: "Short segment."
        },
        {
          id: 2,
          start_time: 10,
          end_time: 55, // Good length
          speaker: "Speaker",
          text: "This is a good length segment with interesting content."
        },
        {
          id: 3,
          start_time: 55,
          end_time: 200, // Too long
          speaker: "Speaker",
          text: "Very long segment that goes on and on..."
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

    test("should combine segments when enabled", () => {
      const transcript = [
        {
          id: 1,
          start_time: 0,
          end_time: 20,
          text: "The biggest mistake I see."
        },
        {
          id: 2,
          start_time: 20,
          end_time: 55,
          text: "Is teams not measuring outcomes."
        }
      ];

      const clips = identifyClips(transcript, {
        minDuration: 30,
        maxDuration: 90,
        combineSegments: true
      });

      expect(clips.length).toBeGreaterThan(0);
      expect(clips[0].duration).toBeGreaterThanOrEqual(30);
    });

    test("should not combine segments by default", () => {
      const transcript = [
        {
          id: 1,
          start_time: 0,
          end_time: 20,
          text: "Short."
        },
        {
          id: 2,
          start_time: 20,
          end_time: 55,
          text: "Good segment."
        }
      ];

      const clips = identifyClips(transcript, {
        minDuration: 30,
        maxDuration: 90
      });

      expect(clips.length).toBe(1);
    });
  });
});
