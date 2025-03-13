import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const bounties = await prisma.bounty.findMany();
    return NextResponse.json({ bounties });
  } catch (error) {
    console.error("Error fetching Bounties:", error);
    return NextResponse.json({ error: "Failed to fetch Bounties" }, { status: 500 });
  }
}
