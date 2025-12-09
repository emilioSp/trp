import { writeFileSync } from "node:fs";
import * as path from "node:path";
import { member } from "./member.ts";
import { team } from "./team.ts";

const getClassFromGroupId = (groupId?: number) => {
	switch (groupId) {
		case 1:
			return "Rookie";
		case 2:
			return "D";
		case 3:
			return "C";
		case 4:
			return "B";
		case 5:
			return "A";
		case 6:
			return "Pro";
		default:
			return "Unknown";
	}
};

export const trpMembers = async () => {
	const teamData = await team("346718");
	const memberIds = teamData.roster.map((m) => m.cust_id);
	const members = await member(memberIds.join(","));

	const membersClean = members.members.map((m) => {
		const roadLicense = m.licenses.find((l) => l.category_id === 5);

		return {
			id: m.cust_id,
			name: m.display_name,
			classOrder: roadLicense?.group_id,
			className: getClassFromGroupId(roadLicense?.group_id),
			safetyRating: roadLicense?.safety_rating,
			iRating: roadLicense?.irating,
		};
	});

	console.log(JSON.stringify(membersClean, null, 2));

	writeFileSync(
		path.join(process.cwd(), "data", "trp_members.json"),
		JSON.stringify(membersClean, null, 2),
	);
};
