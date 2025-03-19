import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN; 
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

async function sendTelegramMessage(chatId: number, message: string) {
  await fetch(TELEGRAM_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "Markdown" }),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.message) {
      const { text, from, chat } = body.message;
      if (text?.startsWith("/verify ")) {
        const username = text.split(" ")[1]?.trim();
        if (!username) {
          await sendTelegramMessage(chat.id, `❌ *${from.first_name}*, Username missing in command.`);
          return NextResponse.json({ message: "Username missing in command" });
        }

        const existingUser = await prisma.user.findUnique({ where: { username } });

        if (existingUser && !existingUser.telegramId) {
          await prisma.user.update({
            where: { username },
            data: { telegramId: from.id.toString(), telegram: true, points: { increment: 50 } },
          });

          await sendTelegramMessage(
            chat.id,
            `✅ *${from.first_name}* verified *${username}* successfully! (+50 points)`
          );
          return NextResponse.json({ message: `User ${username} verified successfully!`, points: 50 });
        } else {
          const responseMessage = existingUser
            ? `⚠️ *${from.first_name}*, user *${username}* is already verified.`
            : `❌ *${from.first_name}*, no user found with username *${username}*.`;
          await sendTelegramMessage(chat.id, responseMessage);
          return NextResponse.json({ message: responseMessage });
        }
      }
    }

    // Handle user leaving event
    if (body.my_chat_member?.new_chat_member?.status === "left") {
      const telegramId = body.my_chat_member.from.id.toString();
      const chatId = body.my_chat_member.chat.id;

      const existingUser = await prisma.user.findMany({ where: { telegramId } });

      if (existingUser.length > 0) {
        await prisma.user.updateMany({
          where: { telegramId },
          data: { telegram: false, telegramId: null, points: { decrement: 50 } },
        });

        await sendTelegramMessage(
          chatId,
          `⚠️ User *${existingUser[0].username}* has left the group and was unlinked (-50 points).`
        );
        return NextResponse.json({ message: `User ${existingUser[0].username} left and was unlinked` });
      }
    }

    return NextResponse.json({ message: "No valid event detected" });
  } catch (error: any) {
    console.log("Webhook error:", error.message);
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 });
  }
}
