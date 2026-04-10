import type { Round } from '@/services/roundEngine/types';

export function calculateRoundTotal(round: Round) {
  return round.holeScores.reduce((total, hole) => total + (hole.strokes ?? 0), 0);
}
