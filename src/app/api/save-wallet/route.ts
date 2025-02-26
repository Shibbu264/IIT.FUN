import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust the import path as necessary

export async function POST(request: Request) {
    const { email, wallet } = await request.json();

    try {
        // Update the wallet key in the user object
        const updatedUser = await prisma.user.update({
            where: { email },
            data: { wallet },
        });

        // Convert BigInt values to strings
        const userResponse = JSON.parse(JSON.stringify(updatedUser, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));

        return NextResponse.json({ success: true, user: userResponse });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Error updating wallet' }, { status: 500 });
    }
}
