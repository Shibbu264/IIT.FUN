import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.message) {
      const { text, from } = body.message;
      if (text?.startsWith("/verify ")) {
        const username = (text.split(" ")[1]).trim(); // Extract username after "/verify"
        console.log(username)
        if (!username) {
          return NextResponse.json({ message: "Username missing in command" });
        }
        // Find user by username
        const existingUser = await prisma.user.findUnique({ where: { username } });

        if (existingUser && !existingUser.telegramId) {
          await prisma.user.update({
            where: { username },
            data: { telegramId: from.id.toString(), telegram: true, points: { increment: 50 } },
          });

          return NextResponse.json({ message: `User ${username} verified successfully!`,points:50 });
        } else {
          return NextResponse.json({
            message: existingUser ? "User already verified" : `No user found with username ${username}`,
          });
        }
      }
    }

    // Handle user leaving event
    if (body.my_chat_member?.new_chat_member?.status === "left") {
      const telegramId = (body.my_chat_member.from.id).toString();

      // Find user by telegramId
      const existingUser = await prisma.user.findMany({ where: { telegramId } });

      if (existingUser) {
        await prisma.user.updateMany({
          where: { telegramId },
          data: { telegram: false, telegramId: null, points: { decrement: 50 } },
        });

        return NextResponse.json({ message: `User ${existingUser[0].username} left and was unlinked` });
      }
    }

    return NextResponse.json({ message: "No valid event detected" });
  } catch (error: any) {
    console.log("Webhook error:", error.message);
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 });
  }
}
