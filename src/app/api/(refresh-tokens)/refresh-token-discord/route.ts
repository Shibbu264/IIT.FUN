import { NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";
import qs from "qs";

export async function GET(req:any) {
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

        // Call Discord API to refresh the access token
        const response = await axios.post(
            "https://discord.com/api/oauth2/token",
            qs.stringify({
                client_id: process.env.DISCORD_CLIENT_ID,
                client_secret: process.env.DISCORD_CLIENT_SECRET,
                grant_type: "refresh_token",
                refresh_token: refreshToken,
            }),
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
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
            message:"Discord reconnected !",
            access_token,
            refresh_token: refresh_token || refreshToken,
            expires_in,
        });
    } catch (error:any) {
        console.error("Failed to refresh access token:", error.response?.data || error);
        return new NextResponse(
            JSON.stringify({
                error: "Failed to reconnect discord",
                details: error.response?.data || error.message,
            }),
            { status: 500 }
        );
    }
}
