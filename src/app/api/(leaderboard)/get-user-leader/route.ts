import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export type UserData = {
  rank: string;
  username: string;
  institute: string;
  points: number;
};

const userData: UserData[] = [
  {
    rank: "#4",
    username: "username",
    institute: "institute name",
    points: 234,
  },
  {
    rank: "#4",
    username: "username",
    institute: "institute name",
    points: 234,
  },
  {
    rank: "#4",
    username: "username",
    institute: "institute name",
    points: 234,
  },
];
export async function POST(req: Request) {
  try {
    return NextResponse.json({ userData });
  } catch (error) {
    console.error("Error fetching user leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch user leaderboard" },
      { status: 500 }
    );
  }
}
