import { getDistance } from 'geolib';

import type { Coordinate, HoleTargets } from '@/services/course/types';

type Units = 'yards' | 'meters';

function convertDistance(distanceInMeters: number, units: Units) {
  if (units === 'meters') {
    return Math.round(distanceInMeters);
  }

  return Math.round(distanceInMeters * 1.09361);
}

export function calculateHoleYardages(
  userLocation: Coordinate,
  targets: HoleTargets,
  units: Units = 'yards'
) {
  return {
    front: convertDistance(getDistance(userLocation, targets.front), units),
    center: convertDistance(getDistance(userLocation, targets.center), units),
    back: convertDistance(getDistance(userLocation, targets.back), units)
  };
}
