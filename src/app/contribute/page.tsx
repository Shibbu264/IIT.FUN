"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Ui/Tabs";
import axiosInstance from "@/lib/axiosInstances/iitFunInstance";
import Loader from "@/components/Ui/Loader";
import AllBountiesTab from "@/components/Contribute/Tabs/AllBountiesTab";
import UserBountiesTab from "@/components/Contribute/Tabs/UserBountiesTab";
import CompletedBountiesTab from "@/components/Contribute/Tabs/CompletedBountyTab";



export default function Page() {




  return (
    <div className="flex flex-col max-h-[100%]">
      <Tabs className="max-md:mt-6 flex flex-col gap-6 h-full md:min-h-[88vh] min-h-[85vh]" defaultValue="active">
        <TabsList className="flex px-4 justify-start  gap-3 w-full">
          <TabsTrigger className="" value="active">Active</TabsTrigger>
          <TabsTrigger value="registered">Registered</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent className="flex flex-1 px-2 flex-col" value="active">
          <AllBountiesTab />
        </TabsContent>
        <TabsContent className="flex flex-1 px-2 flex-col" value="registered">
          <UserBountiesTab />
        </TabsContent>
        <TabsContent className="flex flex-1 px-2 flex-col" value="completed">
          <CompletedBountiesTab/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
