"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Ui/Tabs";
import axiosInstance from "@/lib/axiosInstances/iitFunInstance";
import Loader from "@/components/Ui/Loader";
import BountyComponent from "../BountyComponent";
import { useAppSelector } from "@/lib/store/store";

export default function AllBountiesTab() {
    const { user } = useAppSelector(state => state.user);
    const [bountiesData, setBountiesData] = useState([]);
    const [groups, setGroups] = useState([]);
    
    const getAllBountiesQuery = useQuery({
        queryKey: ["bounties"],
        enabled:!!user?.id,
        queryFn: () => axiosInstance.post("/api/get-all-bounties", { id: user?.id }),
    });

    useEffect(() => {
        if (getAllBountiesQuery.data) {
            setGroups(getAllBountiesQuery.data?.data?.groups || []);
            setBountiesData(getAllBountiesQuery.data?.data?.bounties || []);
        }
    }, [getAllBountiesQuery.data]);

    return (
        getAllBountiesQuery.isLoading ? (
            <Loader />
        ) : (
            <Tabs className="flex flex-col gap-6 h-full md:min-h-[80vh] min-h-[75vh]" defaultValue={groups[0] || "all"}>
                <TabsList className="flex h-11 max-md:h-10 px-6 justify-start gap-3 w-full overflow-x-auto">
                    <TabsTrigger value="all">All</TabsTrigger>
                    {groups.map((group: string) => (
                        <TabsTrigger className="md:!text-[16px] text-sm" key={group} value={group}>{group}</TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent className="flex flex-1 px-2 flex-col gap-4" value="all">
                    {bountiesData.length === 0 ? (
                        <p className="text-gray-400 text-lg text-center mt-6">No bounties available</p>
                    ) : (
                        bountiesData.map((job: any, index: number) => (
                            <BountyComponent key={index} job={job} />
                        ))
                    )}
                </TabsContent>

                {groups.map((group: string) => (
                    <TabsContent key={group} className="flex flex-1 px-2 flex-col gap-4" value={group}>
                        {bountiesData.filter((job: any) => job.group === group).length === 0 ? (
                            <p className="text-gray-400 text-lg text-center mt-6">No bounties in this group</p>
                        ) : (
                            bountiesData
                                .filter((job: any) => job.group === group)
                                .map((job: any, index: number) => (
                                    <BountyComponent key={index} job={job} />
                                ))
                        )}
                    </TabsContent>
                ))}
            </Tabs>
        )
    );
}
