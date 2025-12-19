import { fetchData } from './api.ts';
import { API_BASE_URL } from './constant.ts';

export const memberCareer = async (memberId: string) =>
  fetchData(`${API_BASE_URL}/stats/member_career?cust_id=${memberId}`);
