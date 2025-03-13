import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Ensure correct import for Prisma
import { format } from "date-fns";

export async function POST(req: Request) {
    try {
        const body = await req.json(); // Parse the request body
        const { email } = body; // Assuming email is sent in the request body

        // Fetch user from the database
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Get today's date in UTC
        const todayUTC = format(new Date(), "yyyy-MM-dd");
        const lastSignInUTC = user.lastSignIn
            ? format(new Date(user.lastSignIn), "yyyy-MM-dd")
            : null;

        let pointsEarned = 0;

        if (todayUTC !== lastSignInUTC) {
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    lastSignIn: new Date(),
                    points: { increment: 20 },
                },
            });

            pointsEarned = 20;
            return NextResponse.json({
                points: 20,
                reason: "Daily Signin +20 points",
            });
        }
        else {
            return NextResponse.json({

            });
        }


    } catch (error) {
        console.log("Error fetching me", error);
        return NextResponse.json({ error: "Failed to fetch me" }, { status: 500 });
    }
}
