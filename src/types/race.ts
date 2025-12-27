export type Race = {
  season_id: number;
  series_id: number;
  series_name: string;
  car_id: number;
  car_class_id: number;
  livery: {
    car_id: number;
    pattern: number;
    color1: string;
    color2: string;
    color3: string;
  };
  license_level: number;
  session_start_time: string;
  winner_group_id: number;
  winner_name: string;
  winner_helmet: {
    pattern: number;
    color1: string;
    color2: string;
    color3: string;
    face_type: number;
    helmet_type: number;
  };
  winner_license_level: number;
  start_position: number;
  finish_position: number;
  qualifying_time: number;
  laps: number;
  laps_led: number;
  incidents: number;
  points: number;
  strength_of_field: number;
  subsession_id: number;
  old_sub_level: number;
  new_sub_level: number;
  oldi_rating: number;
  newi_rating: number;
  track: {
    track_id: number;
    track_name: string;
  };
  drop_race: boolean;
  season_year: number;
  season_quarter: number;
  race_week_num: number;
};

export type MemberData = {
  races: Race[];
};
