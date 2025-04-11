import { NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";
import qs from "qs";

function fixMalformedState(state: string): string {
    const decodedState = decodeURIComponent(state).trim();

    if (decodedState.startsWith("{") && decodedState.endsWith("}")) {
        // Replace `key:value` with `"key":"value"`
        const fixedState = decodedState
            .replace("{", '{"') // Add opening quote
            .replace(":", '":"') // Replace : with ":"
            .replace("}", '"}'); // Add closing quote
        return fixedState;
    }

    throw new Error("Invalid state format");
}

export async function GET(req:any) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    if (!code || !state) {
      return new Response(JSON.stringify({ error: "Missing code or state" }), {
        status: 400,
      });
    }
    const fixedState = fixMalformedState(state)
    const { email } = JSON.parse(fixedState);

    // Exchange the authorization code for an access token
    const tokenResponse = await axios.post(
      "https://api.x.com/2/oauth2/token",
      qs.stringify({
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.NEXT_PUBLIC_TWITTER_REDIRECT_URI,
        code_verifier: "challenge",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Basic ${Buffer.from(`${process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID}:${process.env.TWITTER_CLIENT_SECRET}`).toString('base64')}`
        },
      }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    // Fetch the user's Twitter account details
    const twitterUserResponse = await axios.get(
      "https://api.twitter.com/2/users/me",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    
    const twitterUser = twitterUserResponse.data?.data;
    

    // Upsert the social account record in Prisma
    await prisma.socialAccount.upsert({
      create: {
        provider: "twitter",
        providerId: twitterUser.id,
        username: twitterUser.username,
        profileUrl: `https://twitter.com/${twitterUser.username}`,
        user: { connect: { email } },
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt: new Date(Date.now() + expires_in * 1000),
      },
      update: {
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt: new Date(Date.now() + expires_in * 1000),
      },
      where: {
        provider_providerId: {
          provider: "twitter",
          providerId: twitterUser.id,
        },
      },
    });


    // axios.post(`https://api.twitter.com/2/users/${twitterUser.id}/following`, { target_user_id: "VXNlcjoxODg2ODYwNDE3MTU2NDE1NDg4" }, {
    //   headers: {
    //     Authorization: `Bearer ${access_token}`,
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(response => console.log("done done",response.data))
    // .catch((err:any) => console.log(err.response,"qtt"));

    // Allocate points for first-time connection if applicable
    const user = await prisma.user.findUnique({ where: { email } });

    if (user && !user.twitter) {
      const pointsToAward = 50;
      await prisma.user.update({
        where: { email },
        data: {
          points: { increment: pointsToAward },
          twitter: true,
        },
      });
    }

    return NextResponse.redirect(new URL("/profile/me", req.url));
  } catch (error:any) {
    console.log("Error connecting Twitter account:", error?.message);
    return NextResponse.redirect(new URL("/500", req.url));
  }
}
