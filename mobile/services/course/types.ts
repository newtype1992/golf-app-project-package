export type Coordinate = {
  latitude: number;
  longitude: number;
};

export type HoleTargets = {
  front: Coordinate;
  center: Coordinate;
  back: Coordinate;
};

export type Hole = {
  number: number;
  par: number;
  distance: number;
  teeLabel: string;
  targets: HoleTargets;
};

export type Course = {
  id: string;
  name: string;
  city: string;
  region: string;
  country: string;
  holes: Hole[];
};
