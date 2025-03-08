import { getServerSession } from "next-auth";
import Landing from "@/components/Landing/Landing";
import Dashboard from "@/components/Dashboard/Dashboard";
import { authOptions } from "./api/auth/[...nextauth]/route";



export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      {/* {!session ? (
        <Landing />
      ) : ( */}
        <Dashboard />
      {/* )} */}
    </>
  );
}
