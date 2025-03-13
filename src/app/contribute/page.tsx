"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Ui/Tabs";
import axiosInstance from "@/lib/axiosInstances/iitFunInstance";
import Loader from "@/components/Ui/Loader";
import AllBountiesTab from "@/components/Contribute/Tabs/AllBountiesTab";
import UserBountiesTab from "@/components/Contribute/Tabs/UserBountiesTab";



export default function Page() {




  return (
    <div className="flex flex-col h-full px-4">
      <Tabs className="h-full flex flex-col gap-6" defaultValue="active">
        <TabsList className="flex gap-4 w-fit">
          <TabsTrigger className="" value="active">Active</TabsTrigger>
          <TabsTrigger value="registered">Registered</TabsTrigger>
        </TabsList>

        <TabsContent className="flex h-full flex-col" value="active">
          <AllBountiesTab />
        </TabsContent>
        <TabsContent className="flex h-full flex-col" value="registered">
          <UserBountiesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
