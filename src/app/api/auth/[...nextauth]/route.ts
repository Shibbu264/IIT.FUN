import { authOptions, getInstituteNameFromEmail, validateEmail } from "@/lib/utils";
import NextAuth from "next-auth";


const handler = NextAuth(authOptions) as never;

export { handler as GET, handler as POST };
