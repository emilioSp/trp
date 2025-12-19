import { fetchData } from './api.ts';
import { API_BASE_URL } from './constant.ts';

type License = {
  category_id: number;
  category: string;
  category_name: string;
  license_level: number;
  safety_rating: number;
  irating: number;
  group_name: string;
  group_id: number;
};

type MemberData = {
  members: Array<{
    display_name: string;
    cust_id: number;
    member_since: string;
    flair_name: string;
    licenses: License[];
  }>;
};

export const member = async (memberIds: string): Promise<MemberData> => {
  const member = await fetchData(
    `${API_BASE_URL}/member/get?include_licenses=true&cust_ids=${memberIds}`,
  );
  return member as MemberData;
};
