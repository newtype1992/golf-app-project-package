import type { HoleScore } from '@/services/roundEngine/types';

export function createEmptyHoleScore(holeNumber: number): HoleScore {
  return {
    holeNumber,
    strokes: null,
    putts: null,
    fairwayHit: null,
    gir: null,
    penalties: 0
  };
}
