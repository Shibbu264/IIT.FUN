import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { userId, communityCallId } = await req.json();

        // Create a new UserCommunityCall entry
        const userCommunityCall = await prisma.userCommunityCall.create({
            data: {
                userId,
                communityCallId,
            },
        });

        return NextResponse.json({ message: "See you in the community call !", userCommunityCall });
    } catch (error) {
        console.error("Error adding UserCommunityCall:", error);
        return NextResponse.json({
            error: "Failed to register for community call",
            message: "Failed to register for community call"
        }, { status: 500 });
    }
}
