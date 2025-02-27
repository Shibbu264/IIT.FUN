import { NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma'; // Ensure you have the correct import for Prisma

export async function GET(req: Request) {

    // Fetch user from the database
    const bounties = await prisma.bounty.findMany()

    return NextResponse.json(bounties);
}
