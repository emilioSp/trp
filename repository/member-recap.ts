import { fetchData } from './api.ts';
import { API_BASE_URL } from './constant.ts';

export const memberRecap = async (memberId: string, year: string) => {
  const memberRecap = await fetchData(
    `${API_BASE_URL}/stats/member_recap?cust_id=${memberId}&year=${year}`,
  );
  return memberRecap;
};
