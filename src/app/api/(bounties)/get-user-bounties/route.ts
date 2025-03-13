import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId || isNaN(parseInt(userId))) {
      return NextResponse.json({ error: "Invalid or missing userId" }, { status: 400 });
    }

    const userBounties = await prisma.userBounty.findMany({
      where: { userId: parseInt(userId) },
      include: { bounty: true }, // Include bounty details
    });

    return NextResponse.json({ userBounties }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user bounties:", error);
    return NextResponse.json({ error: "Failed to fetch user bounties" }, { status: 500 });
  }
}
