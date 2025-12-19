import { fetchData } from './api.ts';
import { API_BASE_URL } from './constant.ts';

export const memberRecentRaces = async (memberId: string) => {
  const recentRaces = await fetchData(
    `${API_BASE_URL}/stats/member_recent_races?cust_id=${memberId}`,
  );
  return recentRaces;
};
