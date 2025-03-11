import { NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma"; 
import qs from 'qs'
// Import your Prisma client

export async function GET(req:any) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    if (!code || !state) {
        return new Response(JSON.stringify({ error: "Missing code or state" }), { status: 400 });
    }
    console.log(code,state)
    const { email } = JSON.parse(decodeURIComponent(state));

    // Exchange the authorization code for an access token
    const tokenResponse = await axios.post(
        "https://discord.com/api/oauth2/token",
        qs.stringify({
          client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
          client_secret: process.env.DISCORD_CLIENT_SECRET,
          grant_type: "authorization_code",
          code,
          redirect_uri: process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      
    const { access_token } = tokenResponse.data;

    // Fetch the user's Discord account details
    const discordUserResponse = await axios.get("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const discordUser = discordUserResponse.data;
    console.log(discordUser)

    // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: { email:email },
    });

    if (!user) {
        return NextResponse.redirect(new URL("/",req.url));
    }

    // Check if Discord is already connected
    await prisma.socialAccount.upsert({
        create: {
          provider: "discord",
          providerId: discordUser.id,
          username: discordUser.username,
          profileUrl: `https://discord.com/users/${discordUser.id}`,
          user: { connect: { email } },
          accessToken: access_token,
          refreshToken: tokenResponse.data.refresh_token,
          expiresAt: new Date(Date.now() + tokenResponse.data.expires_in * 1000)
        },
        update: {
          accessToken: access_token,
          refreshToken: tokenResponse.data.refresh_token,
          expiresAt: new Date(Date.now() + tokenResponse.data.expires_in * 1000)
        },
        where: {
          provider_providerId: {
            provider: "discord",
            providerId: discordUser.id
          }
        }
    });
      
    if (user.discord) {
        return NextResponse.redirect(new URL("/",req.url));
    }

    // Save the Discord connection in the SocialAccount table


    // Allocate points for first-time connection
    const pointsToAward = 50; 
    await prisma.user.update({
      where: { email },
      data: {
        points: { increment: pointsToAward },
        discord: true, 
      },
    });

    return NextResponse.redirect(new URL("/",req.url));
  } catch (error) {
    console.error("Error connecting Discord account:", error);
    return NextResponse.redirect(new URL("/500",req.url));
  }
}
