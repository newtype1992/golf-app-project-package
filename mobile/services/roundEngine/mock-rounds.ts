import { createEmptyHoleScore } from '@/services/scoring/defaults';

import type { Round } from './types';

function createCompletedRound(
  id: string,
  startedAt: string,
  courseName: string,
  scoreSeed: number
): Round {
  return {
    id,
    courseId: 'harbour-point',
    courseName,
    startedAt,
    completedAt: startedAt,
    currentHole: 18,
    status: 'completed',
    holeScores: Array.from({ length: 18 }, (_, index) => ({
      holeNumber: index + 1,
      strokes: 4 + ((index + scoreSeed) % 3),
      putts: 1 + ((index + scoreSeed) % 2),
      fairwayHit: index % 3 === 0 ? null : (index + scoreSeed) % 2 === 0,
      gir: (index + scoreSeed) % 4 === 0,
      penalties: index % 7 === 0 ? 1 : 0
    }))
  };
}

export const activeRound: Round = {
  id: 'active-round-1',
  courseId: 'harbour-point',
  courseName: 'Harbour Point Golf Club',
  startedAt: '2026-04-10T08:00:00.000Z',
  currentHole: 4,
  status: 'in_progress',
  holeScores: Array.from({ length: 18 }, (_, index) => createEmptyHoleScore(index + 1))
};

activeRound.holeScores[0] = {
  holeNumber: 1,
  strokes: 5,
  putts: 2,
  fairwayHit: true,
  gir: false,
  penalties: 0
};

activeRound.holeScores[1] = {
  holeNumber: 2,
  strokes: 4,
  putts: 1,
  fairwayHit: false,
  gir: true,
  penalties: 0
};

activeRound.holeScores[2] = {
  holeNumber: 3,
  strokes: 3,
  putts: 2,
  fairwayHit: null,
  gir: true,
  penalties: 0
};

export const completedRounds: Round[] = [
  createCompletedRound('round-1', '2026-04-04T14:00:00.000Z', 'Harbour Point Golf Club', 0),
  createCompletedRound('round-2', '2026-03-28T14:00:00.000Z', 'Harbour Point Golf Club', 1),
  createCompletedRound('round-3', '2026-03-21T14:00:00.000Z', 'Harbour Point Golf Club', 2)
];
