import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    // Get all bounty IDs the user is already registered in
    const userBountyIds = await prisma.userBounty.findMany({
      where: { userId: id },
      select: { bountyId: true },
    });

    const registeredBountyIds = userBountyIds.map((ub) => ub.bountyId);

    // Fetch only the bounties that are NOT in userBounty table
    const bounties = await prisma.bounty.findMany({
      where: { id: { notIn: registeredBountyIds } },
    });
    const groups = [...new Set(bounties.map((bounty) => bounty.group))];

    return NextResponse.json({ bounties, groups });
  } catch (error) {
    console.error("Error fetching Bounties:", error);
    return NextResponse.json({ error: "Failed to fetch Bounties" }, { status: 500 });
  }
}
