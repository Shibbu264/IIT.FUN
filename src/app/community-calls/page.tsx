"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Ui/Tabs";
import axiosInstance from "@/lib/axiosInstances/iitFunInstance";
import { useAppSelector } from "@/lib/store/store";
import Loader from "@/components/Ui/Loader";
import EventCard, { CardStatus } from "@/components/Community/event-card";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { openDialog } from "@/lib/store/slices/dialogSlice";


// Helper function to determine event status
const getCardStatus = (
  userPoints: number = 0,
  eventPoints: number = 0,
  eventDate: string,
  mode:string,
  ended:boolean
): CardStatus => {
  const today = new Date();
  const eventDateObj = new Date(eventDate);

  if (userPoints < eventPoints) return "locked"; // Not enough points
  if (mode!="online") return "limit-exceeded"; 
  if(ended)  return "ended"
  // Event has passed
  if (eventDateObj > today) return "not-approached"; // Future event

  return "default"; // Normal case
};

export default function Page() {
  const [type, setType] = useState<"upcoming" | "registered" | "attended">("upcoming");
  const user = useAppSelector((state) => state.user?.user);
  const dispatch = useDispatch()

  const fetchCommunityCalls = async () => {
    const params: any = { type, id: user?.id };
    if (type !== "upcoming" && user?.id) params.id = user?.id;
    const { data } = await axiosInstance.get("/api/get-community-calls", { params });
    return data.communityCalls;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["communityCalls", type, user?.id],
    queryFn: fetchCommunityCalls,
    enabled: !!type && (type === "upcoming" || !!user?.id),
  });

  return (
    <div className="flex flex-col max-h-[100%]">
      <Tabs
        className="max-md:mt-6 flex flex-col gap-6 h-full md:min-h-[88vh] min-h-[85vh]"
        defaultValue="upcoming"
        onValueChange={(val) => setType(val as "upcoming" | "registered" | "attended")}
      >
        <TabsList className="flex px-4 justify-start gap-3 w-full">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="registered">Registered</TabsTrigger>
          <TabsTrigger value="attended">Attended</TabsTrigger>
        </TabsList>

        {/* Single TabContent that dynamically updates based on `type` */}
        <TabsContent className="flex flex-1 px-2 flex-col" value={type}>
          {isError && <p className="text-red-500 mt-4">Error fetching community calls.</p>}
          {isLoading ? (
            <Loader />
          ) : data?.length == 0 ? (
            <p className="text-center mt-8">No such Community Calls.</p>
          ) : (
            data.map((call: any) => (
              <EventCard
               onJoin={()=>window.open(call?.meetLink,'_blank')}
                onRegister={() => dispatch(openDialog({
                  type: "communityCallRegistration",
                  data: { communityCall: call }
                }))}
                onRSVP={()=>dispatch(openDialog({
                  type:"rsvp",
                  data:{
                    id:call?.id
                  }
                }))}
                type={type}
                className="max-w-[60%]"
                key={call.id}
                title={call.title}
                description={call.description}
                date={format(new Date(call.date), 'd MMMM yyyy')}
                time={format(new Date(call.date), 'p') || "TBA"}
                imageUrl={call.image || "/placeholder.svg"}
                pointsNeeded={call.eligibilityPoints || 0}
                status={getCardStatus(user?.points || 0, call.eligibilityPoints || 0, call.date,call?.mode,call?.ended)}
              />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
