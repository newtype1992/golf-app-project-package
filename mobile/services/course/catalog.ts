import { sampleCourses } from './mock-course';
import type { Course, CourseSummary, Hole } from './types';

function isValidTargetCoordinate(value: Hole['targets'][keyof Hole['targets']]) {
  return Number.isFinite(value.latitude) && Number.isFinite(value.longitude);
}

export function isPlayableHole(hole: Hole) {
  return (
    hole.number > 0 &&
    hole.par > 0 &&
    hole.distance > 0 &&
    isValidTargetCoordinate(hole.targets.front) &&
    isValidTargetCoordinate(hole.targets.center) &&
    isValidTargetCoordinate(hole.targets.back)
  );
}

export function isPlayableCourse(course: Course) {
  return course.holes.length >= 9 && course.holes.every(isPlayableHole);
}

export async function listCourses(): Promise<CourseSummary[]> {
  return sampleCourses.map((course) => ({
    id: course.id,
    name: course.name,
    city: course.city,
    region: course.region,
    country: course.country,
    holeCount: course.holes.length,
    playable: isPlayableCourse(course)
  }));
}

export async function getCourseById(courseId: string) {
  return sampleCourses.find((course) => course.id === courseId) ?? null;
}
