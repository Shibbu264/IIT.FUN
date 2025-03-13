"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Ui/Tabs";
import axiosInstance from "@/lib/axiosInstances/iitFunInstance";
import Loader from "@/components/Ui/Loader";
import BountyComponent from "../BountyComponent";


export default function AllBountiesTab() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["bounties"],
        queryFn: () => axiosInstance.get("/api/get-all-bounties"),
    });
    return (
        isLoading ?
            <Loader /> :
            <div className="space-y-4">
                {data?.data?.bounties.length === 0 ? (
                    <p className="text-gray-400">No bounties available</p>
                ) : (
                    data?.data?.bounties.map((job: any) => (
                        <BountyComponent job={job} />
                    ))
                )}
            </div>
    )
}
