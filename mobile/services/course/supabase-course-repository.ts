import { getSupabaseClient } from '@/services/supabase/client';

import type { Course, CourseSummary, Hole } from './types';

type CourseRow = {
  id: string;
  name: string;
  city: string;
  region: string;
  country: string;
  hole_count: number;
  is_playable: boolean;
};

type HoleRow = {
  hole_number: number;
  par: number;
  distance: number;
  tee_label: string;
  green_front_lat: number;
  green_front_lng: number;
  green_center_lat: number;
  green_center_lng: number;
  green_back_lat: number;
  green_back_lng: number;
};

function mapHole(row: HoleRow): Hole {
  return {
    number: row.hole_number,
    par: row.par,
    distance: row.distance,
    teeLabel: row.tee_label,
    targets: {
      front: {
        latitude: row.green_front_lat,
        longitude: row.green_front_lng
      },
      center: {
        latitude: row.green_center_lat,
        longitude: row.green_center_lng
      },
      back: {
        latitude: row.green_back_lat,
        longitude: row.green_back_lng
      }
    }
  };
}

function mapCourseSummary(row: CourseRow): CourseSummary {
  return {
    id: row.id,
    name: row.name,
    city: row.city,
    region: row.region,
    country: row.country,
    holeCount: row.hole_count,
    playable: row.is_playable
  };
}

function mapCourse(row: CourseRow, holes: HoleRow[]): Course {
  return {
    id: row.id,
    name: row.name,
    city: row.city,
    region: row.region,
    country: row.country,
    holes: holes.map(mapHole)
  };
}

export async function fetchCourseSummariesFromSupabase(): Promise<CourseSummary[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('courses')
    .select('id, name, city, region, country, hole_count, is_playable')
    .order('name', { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => mapCourseSummary(row as CourseRow));
}

export async function fetchCourseByIdFromSupabase(courseId: string): Promise<Course | null> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return null;
  }

  const { data: courseRow, error: courseError } = await supabase
    .from('courses')
    .select('id, name, city, region, country, hole_count, is_playable')
    .eq('id', courseId)
    .maybeSingle();

  if (courseError) {
    throw courseError;
  }

  if (!courseRow) {
    return null;
  }

  const { data: holeRows, error: holeError } = await supabase
    .from('holes')
    .select(
      'hole_number, par, distance, tee_label, green_front_lat, green_front_lng, green_center_lat, green_center_lng, green_back_lat, green_back_lng'
    )
    .eq('course_id', courseId)
    .order('hole_number', { ascending: true });

  if (holeError) {
    throw holeError;
  }

  return mapCourse(courseRow as CourseRow, (holeRows ?? []) as HoleRow[]);
}
