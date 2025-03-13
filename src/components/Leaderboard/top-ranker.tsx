import { UserRound } from "lucide-react"

type TopRankerProps = {
  position: number
  name: string
  isWinner?: boolean
}


type TopRankersProps = {
  type: "user" | "institute"
}

const topUsers = [
  { position: 2, name: "@playername" },
  { position: 1, name: "@droppedout", isWinner: true },
  { position: 3, name: "@playername" },
]

const topInstitutes = [
  { position: 2, name: "@iitbhu" },
  { position: 1, name: "@iitkanpur", isWinner: true },
  { position: 3, name: "@iitroorkee" },
]

function TopRanker({ position, name, isWinner = false }: TopRankerProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-[#c1ff00] font-bold mb-2">
        {position}
        {position === 2 && <span className="ml-1">▲</span>}
        {position === 3 && <span className="ml-1">▼</span>}
      </div>
      <div className={`relative rounded-full bg-[#c1ff00] p-1 ${isWinner ? "w-20 h-20" : "w-16 h-16"}`}>
      <div className="w-full h-full rounded-full bg-black p-0.5">

        <div className="w-full h-full rounded-full bg-[#c1ff00] flex items-center justify-center">
          <UserRound className="text-black" size={isWinner ? 40 : 32} />
        </div>
        </div>
        {isWinner && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-[#c1ff00] text-xl font-bold">
            $$$
          </div>
        )}
      </div>
      <div className="mt-2 text-sm text-gray-300">{name}</div>
    </div>
  )
}

export function TopRankers({ type }: TopRankersProps) {
  const rankers = type === "user" ? topUsers : topInstitutes

  return (
    <div className="mb-12">
      <div className="flex justify-center items-end gap-8 mb-8">
        {rankers.map((ranker) => (
          <TopRanker key={ranker.position} position={ranker.position} name={ranker.name} isWinner={ranker.isWinner} />
        ))}
      </div>

      <div className="flex justify-center items-end">
        <div className="flex items-end">
          <div className="w-20 h-16 bg-zinc-900 flex items-center justify-center text-3xl font-bold">2</div>
          <div className="w-24 h-24 bg-zinc-900 flex items-center justify-center text-5xl font-bold">1</div>
          <div className="w-20 h-12 bg-zinc-900 flex items-center justify-center text-3xl font-bold">3</div>
        </div>
      </div>
    </div>
  )
}

