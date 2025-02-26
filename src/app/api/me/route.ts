import { NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma'; // Ensure you have the correct import for Prisma

export async function POST(req: Request) {
    const body = await req.json(); // Parse the request body
    const { email } = body; // Assuming email is sent in the request body

    // Fetch user from the database
    const user = await prisma.user.findUnique({
        where: { email },
    });

    // Handle BigInt conversion for user.id if necessary
    const responseUser = user ? { ...user, id: user.id.toString() } : null;

    return NextResponse.json(responseUser);
}
