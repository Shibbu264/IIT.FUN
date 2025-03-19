import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const userId = searchParams.get("id");

    if (!type) {
      return NextResponse.json({ error: "Type parameter is required" }, { status: 400 });
    }

    if ((type === "attended" || type === "registered") && !userId) {
      return NextResponse.json({ error: "User ID is required for attended and registered types" }, { status: 400 });
    }

    let communityCalls;

    if (type === "upcoming") {
      communityCalls = await prisma.communityCall.findMany({
        where: {
          NOT: {
            users: {
              some: {
                userId: Number(userId),
              },
            },
          },
        },
      });
    } else if (type === "attended") {
      communityCalls = await prisma.communityCall.findMany({
        where: {
          users: {
            some: {
              userId: Number(userId),
              attended: true,
            },
          },
        },
      });
    } else if (type === "registered") {
      communityCalls = await prisma.communityCall.findMany({
        where: {
          users: {
            some: {
              userId: Number(userId),
              attended: false,
            },
          },
        },
      });
    } else {
      return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 });
    }

    return NextResponse.json({ communityCalls });
  } catch (error) {
    console.error("Error fetching Community Calls:", error);
    return NextResponse.json({ error: "Failed to fetch Community Calls" }, { status: 500 });
  }
}
