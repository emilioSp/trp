#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { Command } from "commander";
import { performLogin } from "./login.ts";
import { member } from "./member.ts";
import { storage } from "./storage.ts";
import { team } from "./team.ts";
import { teamRacingPointMembers } from "./team_racing_point_members.ts";

if (!process.env.ACCESS_TOKEN_FILE) {
	throw new Error("ACCESS_TOKEN_FILE environment variable is not set");
}

let accessToken: {
	access_token: string;
	token_type: string;
	expire_time: number;
};

try {
	accessToken = JSON.parse(readFileSync(process.env.ACCESS_TOKEN_FILE, "utf8"));
} catch {
	await performLogin();
	accessToken = JSON.parse(readFileSync(process.env.ACCESS_TOKEN_FILE, "utf8"));
}

const now = Date.now();
const diff = accessToken.expire_time - now;

if (diff <= 60_000) {
	await performLogin();
	accessToken = JSON.parse(readFileSync(process.env.ACCESS_TOKEN_FILE, "utf8"));
}

const program = new Command();

program.name("iracing-data-cli").description("CLI for iRacing Data API");

// Team command
program
	.command("team")
	.description("Get team data")
	.argument("<team_id>", "Team ID to fetch data for")
	.action(async (teamId: string) => {
		await storage.run({ accessToken }, async () => {
			const teamData = await team(teamId);
			console.log(JSON.stringify(teamData, null, 2));
		});
	});

// Member command
program
	.command("member")
	.description("Get member profile data")
	.argument("<member_ids>", "Comma-separated member IDs to fetch data for")
	.action(async (memberIds: string) => {
		await storage.run({ accessToken }, async () => {
			const memberData = await member(memberIds);
			console.log(JSON.stringify(memberData, null, 2));
		});
	});

program
	.command("trp-members")
	.description("Get team racing point members")
	.action(async () => {
		await storage.run({ accessToken }, async () => {
			const members = await teamRacingPointMembers();
			console.log(JSON.stringify(members, null, 2));
		});
	});

// Parse command line arguments
program.parse();
