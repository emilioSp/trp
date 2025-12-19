import { fetchData } from './api.ts';
import { API_BASE_URL } from './constant.ts';

export const memberChartIrating = async (memberId: string) =>
  fetchData(
    `${API_BASE_URL}/member/chart_data?cust_id=${memberId}&category_id=5&chart_type=1`,
  );
