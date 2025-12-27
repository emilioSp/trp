export type ChartDataPoint = {
  when: string;
  value: number;
};

export type MemberChart = {
  blackout: boolean;
  category_id: number;
  chart_type: number;
  data: ChartDataPoint[];
  success: boolean;
  cust_id: number;
};
