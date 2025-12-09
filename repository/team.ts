import { fetchData } from "./api.ts";
import { API_BASE_URL } from "./constant.ts";

type TeamMember = {
	cust_id: number;
	display_name: string;
	owner: boolean;
	admin: boolean;
};

type TeamData = {
	team_id: number;
	owner_id: number;
	team_name: string;
	created: string;
	roster: TeamMember[];
};

export const team = async (teamId: string): Promise<TeamData> => {
	const team = await fetchData(`${API_BASE_URL}/team/get?team_id=${teamId}`);
	return team as TeamData;
};
