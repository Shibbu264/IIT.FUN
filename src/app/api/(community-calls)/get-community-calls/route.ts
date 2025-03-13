import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const communityCalls = await prisma.communityCall.findMany();
        return NextResponse.json({ communityCalls });
    } catch (error) {
        console.error("Error fetching Community Calls:", error);
        return NextResponse.json({ error: "Failed to fetch Community Calls" }, { status: 500 });
    }
}
