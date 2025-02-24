import { validateEmail } from "@/lib/utils";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
        clientId: '809328833359-t6inuf1bllcbrhvnro3a03f0pd0kovqu.apps.googleusercontent.com' as string,
        clientSecret: process.env.AUTH_SECRET as string,
      }),
    // Add more providers as needed
  ],
  callbacks: {
    async signIn({ user }) {
      // Validate the user's email
      if (user.email && validateEmail(user.email)) {
        return true; // Allow sign-in
      }
      return false; // Reject sign-in
    },
  },
  // Add any additional NextAuth configuration here
});

export { handler as GET, handler as POST };
