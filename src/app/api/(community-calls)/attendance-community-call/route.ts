import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json(
            {
                error: "Unauthorized",
                message: "You must be logged in to mark attendance.",
            },
            { status: 401 }
        );
    }

    try {
        const { userId, id, code } = await req.json();

        // Find the community call
        const communityCall = await prisma.communityCall.findUnique({
            where: { id },
        });

        if (!communityCall) {
            return NextResponse.json(
                { error: "Community call not found" },
                { status: 404 }
            );
        }

        // Check if the provided code matches the community call's code
        if (communityCall.code === code) {
            // Update attended to true for the user
            await prisma.userCommunityCall.updateMany({
                where: {
                    userId: userId,
                    communityCallId: id,
                },
                data: { attended: true },
            });

            return NextResponse.json({ message: "Attendance marked successfully! Check attended tab !" });
        }

        return NextResponse.json(
            { error: "Invalid attendance code" },
            { status: 400 }
        );
    } catch (error) {
        console.error("Error marking attendance:", error);
        return NextResponse.json(
            {
                error: "Failed to mark attendance",
                message: "An error occurred while marking attendance",
            },
            { status: 500 }
        );
    }
}
