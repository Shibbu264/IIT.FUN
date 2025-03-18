"use-client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstances/iitFunInstance";
import Loader from "@/components/Ui/Loader";

export function InstituteLeaderboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["instituteLeaderboard"],
    queryFn: () => axiosInstance.post("/api/get-insti-leader"),
  });
  return (
    <div className="w-full">
      <div className="grid grid-cols-4 text-xs text-gray-400 mb-2 px-4">
        <div>rank</div>
        <div>institute name</div>
        <div>number of contributors</div>
        <div className="text-right">points</div>
      </div>
      {isLoading ? (
        <Loader/>
      ) : (
        <div className="space-y-2">
          {data?.data?.instituteData.map((institute: any, index: number) => (
            <div
              key={index}
              className="grid grid-cols-4 items-center bg-zinc-900 rounded-md p-4 text-sm"
            >
              <div className="text-gray-300">{institute.rank}</div>
              <div>{institute.name}</div>
              <div className="text-gray-300">{institute.contributors}</div>
              <div className="text-right">{institute.points}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
