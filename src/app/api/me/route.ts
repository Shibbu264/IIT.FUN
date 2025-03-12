import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ensure you have the correct import for Prisma

export async function POST(req: Request) {
    try {
        const body = await req.json(); // Parse the request body
        const { email } = body; // Assuming email is sent in the request body

        // Fetch user from the database
        const user = await prisma.user.findUnique({
            where: { email },
            include:{
                socialAccounts:true,
                bounties:true
            }
        });

        return NextResponse.json(user);
    }
    catch (error) {
        console.log('Error fetching me', error);
        return NextResponse.json({ error: 'Failed to fetch me' }, { status: 500 });
    }
}
