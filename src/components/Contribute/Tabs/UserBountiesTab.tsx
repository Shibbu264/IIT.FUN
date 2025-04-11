"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Ui/Tabs";
import axiosInstance from "@/lib/axiosInstances/iitFunInstance";
import Loader from "@/components/Ui/Loader";
import { useAppSelector } from "@/lib/store/store";


export default function UserBountiesTab() {
    const { user } = useAppSelector(state => state.user)
    const { data, isLoading, isError } = useQuery({
        enabled: !!user?.id,
        queryKey: ["bounties", user?.id],
        queryFn: () => axiosInstance.post("/api/get-user-bounties", { userId: user?.id }),
    });
    return (
        isLoading ?
            <Loader /> :
            <div className="space-y-4">
                {data?.data?.userBounties.length === 0 ? (
                    <p className="text-gray-400 text-lg text-center mt-6">No bounties available</p>
                ) : (
                    data?.data?.userBounties.map((job: any) => (
                        <a
                            href={job.bounty.Link}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={job.id}
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-900 text-white p-4 sm:p-6 md:p-8 border border-lime-500 hover:bg-gray-800 transition cursor-pointer"
                        >
                            {/* Left Section */}
                            <div className="flex items-center gap-4 mb-4 sm:mb-0">
                                <img
                                    src={job.bounty.image}
                                    alt={job.bounty.title}
                                    className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-700 flex-shrink-0"
                                />
                                <div>
                                    <h2 className="font-semibold text-sm sm:text-base">
                                        <span>{job.bounty.title}</span>
                                    </h2>
                                    <p className="text-xs sm:text-sm text-gray-400">
                                        {job.bounty.description}
                                    </p>
                                </div>
                            </div>

                            {/* Right Section */}
                            <div className="text-right flex items-center space-x-2">
                                <p className="font-semibold text-sm sm:text-base">
                                    {job.bounty.amount}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-400">
                                    {job.bounty.unit}
                                </p>
                            </div>
                        </a>
                    ))
                )}
            </div>
    )
}
