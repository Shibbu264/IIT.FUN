type InstituteData = {
    rank: string
    name: string
    contributors: string
    points: number
  }
  
  const instituteData: InstituteData[] = [
    { rank: "#4", name: "institute name", contributors: "contributors number", points: 234 },
    { rank: "#4", name: "institute name", contributors: "contributors number", points: 234 },
    { rank: "#4", name: "institute name", contributors: "contributors number", points: 234 },
    { rank: "#4", name: "institute name", contributors: "contributors number", points: 234 },
    { rank: "#4", name: "institute name", contributors: "contributors number", points: 234 },
    { rank: "#4", name: "institute name", contributors: "contributors number", points: 234 },
    { rank: "#4", name: "institute name", contributors: "contributors number", points: 234 },
    { rank: "#4", name: "institute name", contributors: "contributors number", points: 234 },
  ]
  
  export function InstituteLeaderboard() {
    return (
      <div className="w-full">
        <div className="grid grid-cols-4 text-xs text-gray-400 mb-2 px-4">
          <div>rank</div>
          <div>institute name</div>
          <div>number of contributors</div>
          <div className="text-right">points</div>
        </div>
  
        <div className="space-y-2">
          {instituteData.map((institute, index) => (
            <div key={index} className="grid grid-cols-4 items-center bg-zinc-900 rounded-md p-4 text-sm">
              <div className="text-gray-300">{institute.rank}</div>
              <div>{institute.name}</div>
              <div className="text-gray-300">{institute.contributors}</div>
              <div className="text-right">{institute.points}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  