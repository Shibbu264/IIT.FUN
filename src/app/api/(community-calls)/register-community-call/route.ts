import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils";

export async function POST(req: Request) {

    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({
            error: "Unauthorized",
            message: "You must be logged in to mark attendance."
        }, { status: 401 });
    }
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
    } catch (error:any) {
        console.log("Error adding UserCommunityCall:", error?.message);
        return NextResponse.json({
            error: "Failed to register for community call",
            message: "Failed to register for community call"
        }, { status: 500 });
    }
}
