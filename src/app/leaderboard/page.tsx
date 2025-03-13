import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Ui/Tabs"
import { InstituteLeaderboard } from "@/components/Leaderboard/insti-leader"
import { UserLeaderboard } from "@/components/Leaderboard/user-leader"
import { TopRankers } from "@/components/Leaderboard/top-ranker"

export default function Leaderboard() {

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-10 text-center">Leaderboard</h1>

        <Tabs defaultValue="institute" className="w-full max-w-xl mx-auto ">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user" className="data-[state=active]:bg-[#c1ff00] data-[state=active]:text-black mx-auto">
              User
            </TabsTrigger>
            <TabsTrigger value="institute" className="data-[state=active]:bg-[#c1ff00] data-[state=active]:text-black mx-auto">
              Institute
            </TabsTrigger>
          </TabsList>

          <TabsContent value="user" className="mt-8">
            <TopRankers type="user" />
            <UserLeaderboard />
          </TabsContent>

          <TabsContent value="institute" className="mt-8">
            <TopRankers type="institute" />
            <InstituteLeaderboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


