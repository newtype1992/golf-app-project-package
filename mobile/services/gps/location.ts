import * as Location from 'expo-location';

import type { Coordinate } from '@/services/course/types';

export async function requestForegroundLocation() {
  const permission = await Location.requestForegroundPermissionsAsync();

  if (permission.status !== 'granted') {
    return null;
  }

  return Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced
  });
}

export async function getCurrentCoordinate(): Promise<Coordinate | null> {
  const position = await requestForegroundLocation();

  if (!position) {
    return null;
  }

  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  };
}

export async function watchForegroundCoordinate(
  onUpdate: (coordinate: Coordinate) => void
) {
  const permission = await Location.requestForegroundPermissionsAsync();

  if (permission.status !== 'granted') {
    return null;
  }

  return Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.Balanced,
      distanceInterval: 8,
      timeInterval: 5000
    },
    (position) => {
      onUpdate({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }
  );
}
