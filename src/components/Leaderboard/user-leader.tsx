"use-client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstances/iitFunInstance";
import Loader from "@/components/Ui/Loader";

export function UserLeaderboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userLeaderboard"],
    queryFn: () => axiosInstance.post("/api/get-user-leader"),
  });
  return (
    <div className="w-full">
      <div className="grid grid-cols-4 text-xs text-gray-400 mb-2 px-4">
        <div>rank</div>
        <div>username</div>
        <div>institute name</div>
        <div className="text-right">points</div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="space-y-2">
          {data?.data?.userData.map((user: any, index: number) => (
            <div
              key={index}
              className="grid grid-cols-4 items-center bg-zinc-900 rounded-md p-4 text-sm"
            >
              <div className="text-gray-300">{user.rank}</div>
              <div>{user.username}</div>
              <div className="text-gray-300">{user.institute}</div>
              <div className="text-right">{user.points}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
