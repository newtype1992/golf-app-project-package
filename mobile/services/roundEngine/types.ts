export type HoleScore = {
  holeNumber: number;
  strokes: number | null;
  putts: number | null;
  fairwayHit: boolean | null;
  gir: boolean | null;
  penalties: number;
};

export type RoundStatus = 'in_progress' | 'completed';

export type Round = {
  id: string;
  courseId: string;
  courseName: string;
  startedAt: string;
  completedAt?: string;
  currentHole: number;
  status: RoundStatus;
  holeScores: HoleScore[];
};
