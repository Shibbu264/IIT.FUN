"use client"
import NFTSection from '@/components/Profile/NFTSection';
import SocialPresence from '@/components/Profile/SocialPresence/SocialPresence';
import Statistics from '@/components/Profile/Statistics';
import UserProfile from '@/components/Profile/UserProfile';
import { Button } from '@/components/Ui/Button';
import Loader from '@/components/Ui/Loader';
import axiosInstance from '@/lib/axiosInstances/iitFunInstance';
import { checkUserJoinedChannel } from '@/lib/services/socialConnect';
import { openDialog } from '@/lib/store/slices/dialogSlice';
import { setSearchUser } from '@/lib/store/slices/searchSlice';
import { useAppSelector } from '@/lib/store/store';
import { useQuery } from '@tanstack/react-query';
import { LoaderCircle, TwitterIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

export default function ProfilePageClientWrapper() {
    const { id } = useParams();
    const [self, setSelf] = useState(false);
    const session = useSession();
    const selfUser = useAppSelector(state => state.user.user)
    const user = useAppSelector(state => state.searchUser.user);
    const dispatch = useDispatch();
    const ref = useRef(false);

    const getSearchUser = useQuery(
        {
            queryKey: ['profile', id],
            enabled: !!(session?.status === "authenticated" && selfUser),
            queryFn: async () => {
                if (id === "me") {
                    return selfUser;
                }
                else {
                    const response = await axiosInstance.post("/api/search-user", { username: id });
                    return response.data;
                }
            }
        }
    )

    useEffect(() => {
        if (getSearchUser.isFetched) {
            dispatch(setSearchUser(getSearchUser.data))
        }
        if (getSearchUser.isError) {
            toast.error("Unable to fetch info,reload page")
        }
    }, [getSearchUser.isFetching])

    useEffect(() => {
        if (id == "me") {
            setSelf(true);
            if (!ref.current && user) {
                ref.current = true;
                checkSocialFollowing();
            }
        }
        else {
            setSelf(false);
        }
    }, [id, user]);


    const checkSocialFollowing = async () => {
        const promptLinks = [
            { title: "twitter", connected: false },
            { title: "telegram", connected: user?.telegram }
        ];

        if (user?.discord) {
            const isMember = await checkUserJoinedChannel('1360365187869442258');
                promptLinks.push({title:"discord",connected:isMember});
        }

        if (promptLinks.length > 0) {
            dispatch(openDialog({ type: "showSocials", data: { prompts: promptLinks } }))
        }
    };



    return (
        getSearchUser?.isPending ?
            <Loader />
            :
            <div className='md:w-[80%] max-md:w-full md:gap-8 mx-auto gap-6 flex flex-col md:px-6 max-md:p-4'>
                <div className='w-full rounded-[8px] relative mx-auto aspect-[1420/460]  bg-gray'>
                <Image className='rounded-md' layout='fill' alt='' src={"/Frame 8.jpeg"}/>
                </div>
                <UserProfile />
                {self && <><div className='w-full h-px md:mt-6 bg-primaryGray' />
                    <SocialPresence />
                </>}
                <div className='w-full h-px md:mt-6 bg-primaryGray' />
                <Statistics />
                <div className='w-full h-px md:mt-6 bg-primaryGray' />
                <NFTSection />
            </div>
    )
}
