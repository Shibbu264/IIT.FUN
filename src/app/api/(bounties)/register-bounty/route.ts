import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, bountyId } = await req.json();

    // Create a new UserBounty entry
    const userBounty = await prisma.userBounty.create({
      data: {
        userId,
        bountyId,
      },
    });

    return NextResponse.json({ message: "Registered for the bounty !", userBounty });
  } catch (error) {
    console.error("Error adding UserBounty:", error);
    return NextResponse.json({ error: "Failed to add UserBounty" }, { status: 500 });
  }
}
