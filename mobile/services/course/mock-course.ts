import type { Course, Hole } from './types';

function createHole(number: number): Hole {
  const baseLatitude = 43.6532 + number * 0.00045;
  const baseLongitude = -79.3832 + number * 0.00038;

  return {
    number,
    par: number % 5 === 0 ? 5 : number % 3 === 0 ? 3 : 4,
    distance: 325 + number * 9,
    teeLabel: 'Blue',
    targets: {
      front: { latitude: baseLatitude + 0.00018, longitude: baseLongitude + 0.00018 },
      center: { latitude: baseLatitude + 0.00024, longitude: baseLongitude + 0.00024 },
      back: { latitude: baseLatitude + 0.0003, longitude: baseLongitude + 0.0003 }
    }
  };
}

export const sampleCourse: Course = {
  id: 'harbour-point',
  name: 'Harbour Point Golf Club',
  city: 'Toronto',
  region: 'ON',
  country: 'Canada',
  holes: Array.from({ length: 18 }, (_, index) => createHole(index + 1))
};

export const sampleCourses: Course[] = [sampleCourse];
