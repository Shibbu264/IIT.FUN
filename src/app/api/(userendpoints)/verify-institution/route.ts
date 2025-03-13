// app/api/verify-institution/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { randomUUID } from "crypto";
import prisma from "@/lib/prisma";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Step 1: Initialize the verification process
export async function POST(req: NextRequest) {
  try {
    const { email, instituteName } = await req.json();

    if (!email || !instituteName) {
      return NextResponse.json(
        { error: "Email and institution name are required" },
        { status: 400 }
      );
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update the institution name immediately
    await prisma.user.update({
      where: { email },
      data: { InstituteName: instituteName },
    });

    // Generate verification token
    const token = randomUUID();
    const tokenExpiry = new Date();
    tokenExpiry.setHours(tokenExpiry.getHours() + 24); // Token valid for 24 hours

    // Store token in database
    await prisma.verificationToken.create({
      data: {
        token,
        expires: tokenExpiry,
        identifier: email,
        type: "INSTITUTION",
        metadata: JSON.stringify({ instituteName }),
      },
    });

    // Generate verification URL
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-institution?token=${token}`;

    // Send verification email
    const response = await resend.emails.send({
      from: "iit.fun@resend.dev",
      to: "shivanshu264@gmail.com",
      subject: "Verify Your Institution Email",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Institution Verification</h2>
          <p>We've received a request to verify your institution: <strong>${instituteName}</strong></p>
          <p>Please click the button below to confirm this is your institution email:</p>
          <a href="${verificationUrl}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 16px 0;">
            Verify My Institution
          </a>
          <p>This link will expire in 24 hours.</p>
          <p>If you didn't request this verification, you can safely ignore this email.</p>
        </div>
      `,
    });
    console.log(response)
    return NextResponse.json({
      message: "Verification email sent. Please check your inbox.",
      updated: true,
    });
  } catch (error) {
    console.error("Error initiating institution verification:", error);
    return NextResponse.json(
      { error: "Failed to process verification" },
      { status: 500 }
    );
  }
}

// Step 2: Confirm verification
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Verification token is missing" },
        { status: 400 }
      );
    }

    // Find token in database
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token, type: "INSTITUTION" },
    });

    if (!verificationToken) {
      return NextResponse.json(
        { error: "Invalid or expired verification token" },
        { status: 400 }
      );
    }

    // Check if token has expired
    if (new Date() > verificationToken.expires) {
      // Clean up expired token
      await prisma.verificationToken.delete({
        where: { id: verificationToken.id },
      });
      return NextResponse.json(
        { error: "Verification token has expired" },
        { status: 400 }
      );
    }

    const email = verificationToken.identifier;
    const { instituteName } = JSON.parse(verificationToken.metadata || "{}");

    // Extract institution domain from email
    const emailDomain = email.split("@")[1];

    // Generate institution ID from domain
    const instiId = emailDomain.split(".")[0];

    // Update user record with institution ID and award points
    await prisma.user.update({
      where: { email:"shivanshu.ranjan.che22@itbhu.ac.in" },
      data: {
        InstiId: true,
        points: { increment: 50 },
      },
    });

    // Delete the used token
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });

    // Redirect on successful verification
    return NextResponse.redirect(new URL("/profile/me", process.env.NEXT_PUBLIC_BASE_URL!));
  } catch (error) {
    console.error("Error completing institution verification:", error);
    return NextResponse.json(
      { error: "Verification process failed" },
      { status: 500 }
    );
  }
}
