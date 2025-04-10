import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export type InstituteData = {
  rank: string;
  name: string;
  contributors: string;
  points: number;
};

export async function POST(req: Request) {
  try {
    // Group users by institute, sum points, and count contributors
    const institutesData = await prisma.user.groupBy({
      by: ["InstituteName"],
      _sum: {
        points: true,
      },
      _count: {
        id: true,
      },
      where: {
        InstituteName: {
          not: null,
        },
      },
      orderBy: {
        _sum: {
          points: "desc",
        },
      },
    });

    const instituteData: InstituteData[] = institutesData.map(
      (institute, index) => ({
        rank: `#${index + 1}`,
        name: institute.InstituteName || "Unknown Institute",
        contributors: `${institute._count.id}`,
        points: institute._sum.points || 0,
      })
    );

    return NextResponse.json({ instituteData });
  } catch (error) {
    console.error("Error fetching institute leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch institute leaderboard" },
      { status: 500 }
    );
  }
}
