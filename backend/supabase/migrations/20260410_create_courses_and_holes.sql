create table if not exists public.courses (
  id text primary key,
  name text not null,
  city text not null,
  region text not null,
  country text not null,
  hole_count integer not null check (hole_count between 1 and 18),
  is_playable boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.holes (
  id bigint generated always as identity primary key,
  course_id text not null references public.courses(id) on delete cascade,
  hole_number integer not null check (hole_number between 1 and 18),
  par integer not null check (par between 3 and 6),
  distance integer not null check (distance > 0),
  tee_label text not null,
  green_front_lat double precision not null,
  green_front_lng double precision not null,
  green_center_lat double precision not null,
  green_center_lng double precision not null,
  green_back_lat double precision not null,
  green_back_lng double precision not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (course_id, hole_number)
);

alter table public.courses enable row level security;
alter table public.holes enable row level security;

drop policy if exists "courses_readable_by_public" on public.courses;
create policy "courses_readable_by_public"
on public.courses
for select
to anon, authenticated
using (true);

drop policy if exists "holes_readable_by_public" on public.holes;
create policy "holes_readable_by_public"
on public.holes
for select
to anon, authenticated
using (true);
