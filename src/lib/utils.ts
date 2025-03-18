
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const iitNames = [
  "IIT Bombay", "IIT Delhi", "IIT Madras", "IIT Kanpur", "IIT Kharagpur",
  "IIT Roorkee", "IIT Guwahati", "IIT BHU", "IIT Hyderabad", "IIT Indore",
  "IIT Jodhpur", "IIT Gandhinagar", "IIT Ropar", "IIT Bhubaneswar", "IIT Patna",
  "IIT Mandi", "IIT Dhanbad", "IIT Tirupati", "IIT Palakkad", "IIT Bhilai",
  "IIT Goa", "IIT Jammu"
];
export function getInstituteNameFromEmail(email: string): string | null {
  const domain = email.split("@")[1]?.split(".")[0]; // Extract domain before the first dot

  switch (true) {
    case domain?.includes("iitr"):
      return "IIT Roorkee";
    case domain?.includes("iitk"):
      return "IIT Kanpur";
    case domain?.includes("iitb"):
      return "IIT Bombay";
    case domain?.includes("iitd"):
      return "IIT Delhi";
    case domain?.includes("iitm"):
      return "IIT Madras";
    case domain?.includes("iitkgp"):
      return "IIT Kharagpur";
    case domain?.includes("iitg"):
      return "IIT Guwahati";
    case domain?.includes("iitbhu") || domain?.includes("itbhu"):
      return "IIT BHU";
    case domain?.includes("iith"):
      return "IIT Hyderabad";
    case domain?.includes("iiti"):
      return "IIT Indore";
    case domain?.includes("iitj"):
      return "IIT Jodhpur";
    case domain?.includes("iitgn"):
      return "IIT Gandhinagar";
    case domain?.includes("iitrpr"):
      return "IIT Ropar";
    case domain?.includes("iitbbs"):
      return "IIT Bhubaneswar";
    case domain?.includes("iitp"):
      return "IIT Patna";
    case domain?.includes("iitmandi"):
      return "IIT Mandi";
    case domain?.includes("iitism"):
      return "IIT Dhanbad";
    case domain?.includes("iittp"):
      return "IIT Tirupati";
    case domain?.includes("iitpkd"):
      return "IIT Palakkad";
    case domain?.includes("iitbhilai"):
      return "IIT Bhilai";
    case domain?.includes("iitgoa"):
      return "IIT Goa";
    case domain?.includes("iitjammu"):
      return "IIT Jammu";
    default:
      return null; // If no match found
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: '809328833359-t6inuf1bllcbrhvnro3a03f0pd0kovqu.apps.googleusercontent.com' as string,
      clientSecret: process.env.AUTH_SECRET as string,
    }),
    // Add more providers as needed
  ],
  callbacks: {
    async signIn({ user }: any) {
      // Validate the user's email
      if (user.email) {
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
              image: user?.image,
              // Assuming user.name is available
              // Add any other user fields as necessary
            },
          });
          const instituteName = getInstituteNameFromEmail(user.email);
          if (instituteName) {
            await prisma.user.update({
              where: { email: user.email },
              data: {
                points: { increment: 50 },
                InstituteName: instituteName,
                InstiId: true
              },
            });
          }
        }
        return true; // Allow sign-in
      }
      return false; // Reject sign-in
    },
    callbacks: { async redirect({ url, baseUrl }: any) { return baseUrl }, },
  },
  // Add any additional NextAuth configuration here
};

export function getBadgeFromPoints(points: number) {
  if (points <= 300) { return "Beginner"; }
  if (points <= 500) { return "Intermediate"; }
  if (points <= 600) { return "Contributor"; }
  if (points >= 800) { return "OG Builder"; }
}