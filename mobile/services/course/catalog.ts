import { hasSupabaseConfig } from '@/services/supabase/client';

import { sampleCourses } from './mock-course';
import {
  fetchCourseByIdFromSupabase,
  fetchCourseSummariesFromSupabase
} from './supabase-course-repository';
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
  if (hasSupabaseConfig()) {
    try {
      const remoteCourses = await fetchCourseSummariesFromSupabase();

      if (remoteCourses.length > 0) {
        return remoteCourses;
      }
    } catch (error) {
      console.warn('Falling back to seeded course summaries.', error);
    }
  }

  return sampleCourses.map((course) => toCourseSummary(course));
}

export async function getCourseById(courseId: string) {
  if (hasSupabaseConfig()) {
    try {
      const remoteCourse = await fetchCourseByIdFromSupabase(courseId);

      if (remoteCourse) {
        return remoteCourse;
      }
    } catch (error) {
      console.warn(`Falling back to seeded course for ${courseId}.`, error);
    }
  }

  return sampleCourses.find((course) => course.id === courseId) ?? null;
}

export function toCourseSummary(course: Course): CourseSummary {
  return {
    id: course.id,
    name: course.name,
    city: course.city,
    region: course.region,
    country: course.country,
    holeCount: course.holes.length,
    playable: isPlayableCourse(course)
  };
}
