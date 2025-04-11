import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export type UserData = {
  rank: string;
  username: string;
  institute: string;
  points: number;
};

export async function POST(req: Request) {
  try {
    const users = await prisma.user.findMany({
      select: {
        username: true,
        InstituteName: true,
        points: true,
      },
      orderBy: {
        points: "desc",
      },
    });

    const userData: UserData[] = users.map((user, index) => ({
      rank: `#${index + 1}`,
      username: user.username || "Anonymous",
      institute: user.InstituteName || "No Institute",
      points: user.points,
    }));

    return NextResponse.json({ userData });
  } catch (error) {
    console.error("Error fetching user leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch user leaderboard" },
      { status: 500 }
    );
  }
}
