"use client"
import SocialPresence from '@/components/Profile/SocialPresence/SocialPresence';
import UserProfile from '@/components/Profile/UserProfile';
import { Button } from '@/components/Ui/Button';
import { checkUserJoinedChannel } from '@/lib/services/socialConnect';
import { openDialog } from '@/lib/store/slices/dialogSlice';
import { useAppSelector } from '@/lib/store/store';
import { TwitterIcon } from 'lucide-react';
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

export default function page() {
    const { id } = useParams();
    const [self, setSelf] = useState(false);
    const user = useAppSelector(state => state.user.user);
    const dispatch = useDispatch()
    const ref = useRef(false);


    useEffect(() => {
        if (id == "me" && user) {
            setSelf(true);
            if (!ref.current) {
                ref.current = true;
                checkSocialFollowing();
            }
        }
        else {
            setSelf(false);
        }
    }, [id, user?.socialAccounts]);


    const checkSocialFollowing = async () => {
        const promptLinks = [
            { title: "discord", connected: true },
            { title: "twitter", connected: false },
            { title: "telegram", connected: false }
        ];

        if(user?.discord){
        // const isMember = await checkUserJoinedChannel('1222164512497467473');
        //     promptLinks.push({title:"discord",connected:isMember});
        }

        // console.log(promptLinks)
        // if (promptLinks.length > 0) {
        //     dispatch(openDialog({ type: "showSocials", data: { prompts: promptLinks } }))
        // }
    };



    return (
        <div className='md:w-[80%] max-md:w-full md:gap-8 mx-auto gap-6 flex flex-col md:px-6 max-md:p-4'>
            <div className='w-full mx-auto aspect-[630/150] rounded-md bg-gray' />
            <UserProfile />
            <div className='w-full h-px md:mt-6 bg-primaryGray' />
            <SocialPresence />
            <div className='w-full h-px md:mt-6 bg-primaryGray' />
        </div>
    )
}
