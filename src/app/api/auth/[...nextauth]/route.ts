import { validateEmail } from "@/lib/utils";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";


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
        // Check if the user already exists in the database
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        if (existingUser) {
          if (existingUser?.wallet) {
            user.wallet = existingUser?.wallet
          }
        }
        // If the user does not exist, create a new user
        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image:user?.image,
               // Assuming user.name is available
              // Add any other user fields as necessary
            },
          });
        }
        return true; // Allow sign-in
      }
      return false; // Reject sign-in
    },
  },
  // Add any additional NextAuth configuration here
});

export { handler as GET, handler as POST };
