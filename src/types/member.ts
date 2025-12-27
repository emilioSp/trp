export type RecapStats = {
  starts: number;
  wins: number;
  top5: number;
  avg_start_position: number;
  avg_finish_position: number;
  laps: number;
  laps_led: number;
  favorite_car: {
    car_id: number;
    car_name: string;
    car_image: string;
  };
  favorite_track: {
    config_name: string | null;
    track_id: number;
    track_logo: string;
    track_name: string;
  };
};

export type MemberRecap = {
  year: number;
  stats: RecapStats;
  success: boolean;
  season: string | null;
  cust_id: number;
};

export type CareerStat = {
  category_id: number;
  category: string;
  starts: number;
  wins: number;
  top5: number;
  poles: number;
  avg_start_position: number;
  avg_finish_position: number;
  laps: number;
  laps_led: number;
  avg_incidents: number;
  avg_points: number;
  win_percentage: number;
  top5_percentage: number;
  laps_led_percentage: number;
  poles_percentage: number;
};

export type MemberCareer = {
  stats: CareerStat[];
};
