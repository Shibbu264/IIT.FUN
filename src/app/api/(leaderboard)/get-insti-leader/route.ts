import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export type InstituteData = {
  rank: string;
  name: string;
  contributors: string;
  points: number;
};

const instituteData: InstituteData[] = [
  {
    rank: "#4",
    name: "institute name",
    contributors: "contributors number",
    points: 234,
  },
  {
    rank: "#4",
    name: "institute name",
    contributors: "contributors number",
    points: 234,
  },
  {
    rank: "#4",
    name: "institute name",
    contributors: "contributors number",
    points: 234,
  },
  {
    rank: "#4",
    name: "institute name",
    contributors: "contributors number",
    points: 234,
  },
  {
    rank: "#4",
    name: "institute name",
    contributors: "contributors number",
    points: 234,
  },
  {
    rank: "#4",
    name: "institute name",
    contributors: "contributors number",
    points: 234,
  },
  {
    rank: "#4",
    name: "institute name",
    contributors: "contributors number",
    points: 234,
  },
  {
    rank: "#4",
    name: "institute name",
    contributors: "contributors number",
    points: 234,
  },
];
export async function POST(req: Request) {
  try {
    return NextResponse.json({ instituteData });
  } catch (error) {
    console.error("Error fetching institute leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch institute leaderboard" },
      { status: 500 }
    );
  }
}
