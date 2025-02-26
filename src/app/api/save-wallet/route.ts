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

        return NextResponse.json({ success: true, user: updatedUser });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Error updating wallet' }, { status: 500 });
    }
}
