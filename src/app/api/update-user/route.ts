import prisma  from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


export async function POST(req: Request) {
    try {
        // Check for valid session
        const session = await getServerSession(authOptions);
        
        if (!session || !session.user) {
            return NextResponse.json({ 
                error: "Unauthorized access",
                status: 401 
            });
        }

        // Get request body
        const { userId, newUsername } = await req.json();

        if (!userId || !newUsername) {
            return NextResponse.json({ 
                error: "Missing userId or newUsername",
                status: 400 
            });
        }

        // Check if username is already taken
        const existingUser = await prisma.user.findFirst({
            where: {
                username: newUsername,
                NOT: {
                    id: userId
                }
            }
        });

        if (existingUser) {
            return NextResponse.json({ 
                error: "Username already taken",
                status: 409 
            });
        }

        // Update username
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { username: newUsername }
        });

        return NextResponse.json({ 
            message: "Successfully updated username",
            user: updatedUser,
            status: 200 
        });
    } catch (error) {
        console.error("Error updating username:", error);
        return NextResponse.json({ 
            error: error instanceof Error ? error.message : "Failed to update username",
            status: 500 
        });
    }
}
