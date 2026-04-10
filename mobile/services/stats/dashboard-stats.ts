import { calculateRoundTotal } from '@/services/scoring/totals';

import type { Round } from '@/services/roundEngine/types';

function round(value: number) {
  return Number(value.toFixed(1));
}

export function calculateDashboardStats(rounds: Round[]) {
  const totalScore = rounds.reduce((sum, roundItem) => sum + calculateRoundTotal(roundItem), 0);
  const totalPutts = rounds.reduce(
    (sum, roundItem) =>
      sum + roundItem.holeScores.reduce((holeTotal, hole) => holeTotal + (hole.putts ?? 0), 0),
    0
  );

  const fairwayOpportunities = rounds
    .flatMap((roundItem) => roundItem.holeScores)
    .filter((hole) => hole.fairwayHit !== null);
  const fairwayHits = fairwayOpportunities.filter((hole) => hole.fairwayHit).length;

  const girOpportunities = rounds
    .flatMap((roundItem) => roundItem.holeScores)
    .filter((hole) => hole.gir !== null);
  const girHits = girOpportunities.filter((hole) => hole.gir).length;

  return {
    averageScore: round(totalScore / rounds.length),
    fairwayPercentage: round((fairwayHits / Math.max(1, fairwayOpportunities.length)) * 100),
    girPercentage: round((girHits / Math.max(1, girOpportunities.length)) * 100),
    puttsPerRound: round(totalPutts / rounds.length)
  };
}
