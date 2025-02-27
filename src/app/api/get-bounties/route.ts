import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ensure you have the correct import for Prisma

export async function GET(req: Request) {
  try {
    // Fetch user from the database
    const bounties = await prisma.bounty.findMany();
    return NextResponse.json(bounties);
  } catch (error) {
    console.log('Error fetching bounties:', error);
    return NextResponse.json({ error: 'Failed to fetch bounties' }, { status: 500 });
  }
}
