type UserData = {
    rank: string
    username: string
    institute: string
    points: number
  }
  
  const userData: UserData[] = [
    { rank: "#4", username: "username", institute: "institute name", points: 234 },
    { rank: "#4", username: "username", institute: "institute name", points: 234 },
    { rank: "#4", username: "username", institute: "institute name", points: 234 },
     
  ]
  
  export function UserLeaderboard() {
    return (
      <div className="w-full">
        <div className="grid grid-cols-4 text-xs text-gray-400 mb-2 px-4">
          <div>rank</div>
          <div>username</div>
          <div>institute name</div>
          <div className="text-right">points</div>
        </div>
  
        <div className="space-y-2">
          {userData.map((user, index) => (
            <div key={index} className="grid grid-cols-4 items-center bg-zinc-900 rounded-md p-4 text-sm">
              <div className="text-gray-300">{user.rank}</div>
              <div>{user.username}</div>
              <div className="text-gray-300">{user.institute}</div>
              <div className="text-right">{user.points}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  