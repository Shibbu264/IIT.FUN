"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/Ui/Button";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/Ui/Dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Ui/Select";
import { Input } from "@/components/Ui/input";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstances/iitFunInstance";
import { useAppSelector } from "@/lib/store/store";
import { iitNames } from "@/lib/utils"



export default function VerifyEmail() {
    const { user } = useAppSelector(state => state.user);
    const [closable, setClosable] = useState(true);
    const [selectedIIT, setSelectedIIT] = useState("");
    const [email, setEmail] = useState(user?.email??"");
    const [emailError, setEmailError] = useState("");
    const [resendTimer, setResendTimer] = useState(0);

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [resendTimer]);

    const validateEmail = (email: string) => {
        if (!email.includes("@iit") && !email.includes("@it")) {
            setEmailError("Email must contain '.iit' or '.it'");
            return false;
        }
        setEmailError("");
        return true;
    };

    const mutation = useMutation({
        mutationFn: async () => {
            return await axiosInstance.post("/api/verify-institution", { instituteName: selectedIIT, email,userId:user?.id});
        },
        onSuccess: () => {
            setClosable(false);
            setResendTimer(60); // Start the 60-second countdown
        }
    });

    return (
        <DialogContent closable={closable} className="max-w-md p-6 rounded-xl">
            {closable ? (
                <>
                    <DialogHeader className="text-center">
                        <DialogTitle className="md:!text-2xl font-bold">Verify Your Institute</DialogTitle>
                        <DialogDescription className="mt-2 !text-lg">
                            Select your IIT and verify your email.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="mt-4 space-y-4">
                        <Select onValueChange={setSelectedIIT}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your IIT" />
                            </SelectTrigger>
                            <SelectContent>
                                {iitNames.map((iit: any) => (
                                    <SelectItem key={iit} value={iit}>
                                        {iit}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <div>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    validateEmail(e.target.value);
                                }}
                                placeholder="Enter your email"
                            />
                            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                        </div>

                        <Button
                            className="w-full"
                            loading={mutation.isPending}
                            onClick={() => { if(validateEmail(email)){mutation.mutate()} }}
                            disabled={!selectedIIT || !email || !!emailError}
                        >
                            {"Verify Email"}
                        </Button>
                    </div>
                </>
            ) : (
                <div className="flex flex-col gap-4">
                    <p className="md:text-xl text-primaryGreen text-lg">Check Your Email and verify it !</p>
                    <p className="md:text-xl text-secondaryGray text-lg">(Might be in spam)</p>
                    <Button
                        className="w-full"
                        loading={mutation.isPending}
                        onClick={() => {
                            mutation.mutate()
                        }}
                        disabled={resendTimer > 0}
                    >
                        {resendTimer > 0 ? `Resend Email (${resendTimer}s)` : "Resend Email"}
                    </Button>
                </div>
            )}
        </DialogContent>
    );
}
