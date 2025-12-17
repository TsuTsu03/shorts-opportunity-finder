export interface TranscriptSegment {
  id?: number;
  start_time: number;
  end_time: number;
  speaker?: string;
  text: string;
}

export interface EngagementFactors {
  has_question: boolean;
  has_controversy: boolean;
  has_numbers: boolean;
  optimal_length: boolean;
  completeness: boolean;
  action_words: string[];
}

export interface ScoredClip {
  clip_id: string;
  episode_id: string;
  start_time: number;
  end_time: number;
  duration: number;
  speaker?: string;
  score: number;
  rank?: number;
  text: string;
  engagement_factors: EngagementFactors;
  reasoning: string;
}
