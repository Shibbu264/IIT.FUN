"use client";
import { Button } from "@/components/Ui/Button";
import { DialogContent } from "@/components/Ui/Dialog";
import axiosInstance from "@/lib/axiosInstances/iitFunInstance";
import React from "react";
import { useAppSelector } from "@/lib/store/store";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { closeDialog } from "@/lib/store/slices/dialogSlice";
import { Trophy, ExternalLink } from "lucide-react";



export default function BountyRegistration({ bounty }: { bounty: any }) {
    const user = useAppSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const registerMutation = useMutation({
        mutationFn: () =>
            axiosInstance.post("/api/register-bounty", {
                userId: user?.id,
                bountyId: bounty.id,
            }),
        onSuccess: () => {
            dispatch(closeDialog());
            window.open(bounty.Link, "_blank");
        },
        onError: (error: any) => {
            console.error("Error registering for bounty:", error);
        },
    });

    return (
        <DialogContent className="max-w-80 flex flex-col items-center">
            <Trophy className="h-24 w-24 text-yellow-500" />
            <h1 className="text-lg font-semibold text-center">
                Register for <span className="text-primaryGreen">{bounty.title}</span>?
            </h1>
            <p className="text-sm text-secondaryGray text-center px-4">
                You will be redirected to an external site where you must complete your
                registration.
            </p>
            <Button
                loading={registerMutation.isPending}
                className="w-full mt-4"
                size="lg"
                onClick={() => registerMutation.mutate()}
            >
                Register & Go <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
        </DialogContent>
    );
}
