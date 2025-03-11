import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!; // Ensure this is set in your .env file

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const hash = url.searchParams.get("hash");
    const payloadBase64 = url.searchParams.get("payload");
    const state = url.searchParams.get("state");

    if (!hash || !payloadBase64 || !state) {
      return new Response(JSON.stringify({ error: "Missing required parameters" }), { status: 400 });
    }

    // Decode and parse the payload
    const payloadString = Buffer.from(payloadBase64, "base64").toString();
    const payload = JSON.parse(payloadString);

    // Verify the hash
    const secretKey = crypto.createHash("sha256").update(BOT_TOKEN).digest();
    const computedHash = crypto.createHmac("sha256", secretKey).update(payloadBase64).digest("hex");

    if (hash !== computedHash) {
      return new Response(JSON.stringify({ error: "Invalid hash" }), { status: 400 });
    }

    // Extract user details
    const { id, first_name, last_name, username } = payload.user;

    // Extract email from state
    const { email } = JSON.parse(decodeURIComponent(state));

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.redirect(new URL("/", req.url)); // Redirect if user not found
    }

    // Upsert Telegram account details in SocialAccount table
    await prisma.socialAccount.upsert({
      create: {
        provider: "telegram",
        providerId: String(id),
        username: username || `${first_name} ${last_name}`,
        profileUrl: `https://t.me/${username}`,
        user: { connect: { email } }, // Use email instead of telegramId
        accessToken: "", // Telegram doesn't provide an access token
        expiresAt: null,
      },
      update: {
        username: username || `${first_name} ${last_name}`,
      },
      where: {
        provider_providerId: {
          provider: "telegram",
          providerId: String(id),
        },
      },
    });

    // Award points for first-time connection
    if (!user.telegram) {
      const pointsToAward = 50;
      await prisma.user.update({
        where: { email }, // Use email for update
        data: {
          points: { increment: pointsToAward },
          telegram: true,
        },
      });
    }

    return NextResponse.redirect(new URL("/", req.url));
  } catch (error) {
    console.error("Error processing Telegram OAuth:", error);
    return NextResponse.redirect(new URL("/500", req.url));
  }
}
