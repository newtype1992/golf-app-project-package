insert into public.courses (
  id,
  name,
  city,
  region,
  country,
  hole_count,
  is_playable
) values (
  'harbour-point',
  'Harbour Point Golf Club',
  'Toronto',
  'ON',
  'Canada',
  18,
  true
)
on conflict (id) do update
set
  name = excluded.name,
  city = excluded.city,
  region = excluded.region,
  country = excluded.country,
  hole_count = excluded.hole_count,
  is_playable = excluded.is_playable,
  updated_at = now();

delete from public.holes where course_id = 'harbour-point';

insert into public.holes (
  course_id,
  hole_number,
  par,
  distance,
  tee_label,
  green_front_lat,
  green_front_lng,
  green_center_lat,
  green_center_lng,
  green_back_lat,
  green_back_lng
)
select
  'harbour-point',
  hole_number,
  case
    when mod(hole_number, 5) = 0 then 5
    when mod(hole_number, 3) = 0 then 3
    else 4
  end,
  325 + (hole_number * 9),
  'Blue',
  43.6532 + (hole_number * 0.00045) + 0.00018,
  -79.3832 + (hole_number * 0.00038) + 0.00018,
  43.6532 + (hole_number * 0.00045) + 0.00024,
  -79.3832 + (hole_number * 0.00038) + 0.00024,
  43.6532 + (hole_number * 0.00045) + 0.00030,
  -79.3832 + (hole_number * 0.00038) + 0.00030
from generate_series(1, 18) as hole_number;
