"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Ui/Tabs";
import axiosInstance from "@/lib/axiosInstances/iitFunInstance";
import Loader from "@/components/Ui/Loader";
import BountyComponent from "../BountyComponent";
import { useAppSelector } from "@/lib/store/store";


export default function AllBountiesTab() {
    const { user } = useAppSelector(state => state.user)
    const { data, isLoading, isError } = useQuery({
        queryKey: ["bounties"],
        queryFn: () => axiosInstance.post("/api/get-all-bounties", { id: user?.id }),
    });
    return (
        isLoading ?
            <Loader /> :
            <div className="space-y-4">
                {data?.data?.bounties.length === 0 ? (
                    <p className="text-gray-400">No bounties available</p>
                ) : (
                    data?.data?.bounties.map((job: any, index: number) => (
                        <BountyComponent key={index} job={job} />
                    ))
                )}
            </div>
    )
}
