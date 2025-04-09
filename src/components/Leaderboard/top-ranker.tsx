import { UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "../Ui/skeleton";
import { Audio } from "react-loader-spinner";
type TopRankerProps = {
  position: number;
  name: string;
  isWinner?: boolean;
};

type TopRankersProps = {
  type: "user" | "institute";
};

type UserData = {
  rank: string;
  username: string;
  institute: string;
  points: number;
};

type InstituteData = {
  rank: string;
  name: string;
  contributors: string;
  points: number;
};

function TopRanker({ position, name, isWinner = false }: TopRankerProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-[#c1ff00] font-bold mb-2">
        {position}
        {position === 2 && <span className="ml-1">▲</span>}
        {position === 3 && <span className="ml-1">▼</span>}
      </div>
      <div
        className={`relative rounded-full bg-[#c1ff00] p-1 ${
          isWinner ? "w-20 h-20" : "w-16 h-16"
        }`}
      >
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
  );
}

export function TopRankers({ type }: TopRankersProps) {
  const [topRankers, setTopRankers] = useState<
    { position: number; name: string; isWinner?: boolean }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const endpoint =
          type === "user" ? "/api/get-user-leader" : "/api/get-insti-leader";
        const response = await fetch(endpoint, { method: "POST" });

        if (!response.ok) {
          throw new Error(`Failed to fetch ${type} leaderboard data`);
        }

        const data = await response.json();

        if (type === "user") {
          const users = data.userData as UserData[];
          // Get top 3 users
          const top3Users = users.slice(0, 3).map((user, index) => ({
            position: index + 1,
            name: user.username,
            isWinner: index === 0, // First position is the winner
          }));
          setTopRankers(top3Users);
        } else {
          const institutes = data.instituteData as InstituteData[];
          // Get top 3 institutes
          const top3Institutes = institutes
            .slice(0, 3)
            .map((institute, index) => ({
              position: index + 1,
              name: institute.name,
              isWinner: index === 0, // First position is the winner
            }));
          setTopRankers(top3Institutes);
        }
      } catch (err) {
        console.error(`Error fetching ${type} leaderboard:`, err);
        setError(`Failed to load ${type} leaderboard data`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  if (loading) {
    return (
      <div className="flex justify-center text-center my-8">
        <Audio height="50" width="50" color={"gray"} ariaLabel="loading" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  if (topRankers.length === 0) {
    return <div className="text-center py-8">No rankers found</div>;
  }

  // Create display order (2-1-3) from sorted rankers
  const secondPlace = topRankers.find((r) => r.position === 2);
  const firstPlace = topRankers.find((r) => r.position === 1);
  const thirdPlace = topRankers.find((r) => r.position === 3);

  const displayOrder = [secondPlace, firstPlace, thirdPlace].filter(Boolean); // Remove any undefined values

  return (
    <div className="mb-12">
      <div className="flex justify-center items-end gap-8 mb-8">
        {displayOrder.map((ranker) => (
          <TopRanker
            key={ranker?.position}
            position={ranker?.position || 0}
            name={ranker?.name || ""}
            isWinner={ranker?.isWinner}
          />
        ))}
      </div>
      <div className="flex justify-center items-end">
        <div className="flex items-end">
          <div className="w-20 h-16 bg-zinc-900 flex items-center justify-center text-3xl font-bold">
            2
          </div>
          <div className="w-24 h-24 bg-zinc-900 flex items-center justify-center text-5xl font-bold">
            1
          </div>
          <div className="w-20 h-12 bg-zinc-900 flex items-center justify-center text-3xl font-bold">
            3
          </div>
        </div>
      </div>
    </div>
  );
}
