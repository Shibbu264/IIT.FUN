import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"; // Use next-auth/jwt for decoding session

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const adminRoutes = ["/admin"];

  // Only apply middleware to admin routes
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    // Decode session token using next-auth/jwt (safer and works in middleware)
    const session = await getToken({ req, secret: process.env.AUTH_SECRET });

    if (!session || !session.email) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Fetch user data from /api/me
    try {
      const userRes = await fetch(`${req.nextUrl.origin}/api/me`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session.email }),
      });

      if (!userRes.ok) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      const user = await userRes.json();
      
      // Check if the user is an admin
      if (user.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }

      return NextResponse.next(); // Allow access
    } catch (error) {
      console.error("Middleware error:", error);
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

// Define which routes the middleware should apply to
export const config = {
  matcher: ["/admin/:path*"],
};
