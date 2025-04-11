import { NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";
import qs from "qs";

export async function GET(req: any) {
    try {
        // Extract the refresh token from query parameters
        const { searchParams } = new URL(req.url);
        const refreshToken = searchParams.get("refreshToken");

        if (!refreshToken) {
            return new NextResponse(
                JSON.stringify({ error: "Missing refreshToken query parameter" }),
                { status: 400 }
            );
        }

        // Call Twitter API to refresh the access token
        const response = await axios.post(
            "https://api.twitter.com/2/oauth2/token",
            qs.stringify({
                grant_type: "refresh_token",
                refresh_token: refreshToken,
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Basic ${Buffer.from(`${process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID}:${process.env.TWITTER_CLIENT_SECRET}`).toString('base64')}`
                },
            }
        );

        const { access_token, refresh_token, expires_in } = response.data;

        // Update the database with the new tokens
        await prisma.socialAccount.update({
            where: { refreshToken },
            data: {
                accessToken: access_token, // Encrypt access token if needed
                refreshToken: refresh_token || refreshToken, // Update only if a new refresh token is provided
                expiresAt: new Date(Date.now() + expires_in * 1000), // Calculate new expiration time
            },
        });

        // Return the new tokens in the response
        return NextResponse.json({
            message: "Twitter reconnected !",
            access_token,
            refresh_token: refresh_token || refreshToken,
            expires_in,
        });
    } catch (error: any) {
        console.error("Failed to refresh access token:", error.response?.data || error);
        return new NextResponse(
            JSON.stringify({
                error: "Failed to reconnect twitter !",
                details: error.response?.data || error.message,
            }),
            { status: 500 }
        );
    }
}
