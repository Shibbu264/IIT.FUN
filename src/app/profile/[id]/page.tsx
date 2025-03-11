"use client"
import SocialPresence from '@/components/Profile/SocialPresence/SocialPresence';
import UserProfile from '@/components/Profile/UserProfile';
import { Button } from '@/components/Ui/Button';
import { useAppSelector } from '@/lib/store/store';
import { TwitterIcon } from 'lucide-react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {
    const { id } = useParams();
    const [self, setSelf] = useState(false);
    const user = useAppSelector(state => state.user.user)

    useEffect(() => {
        if (id == "me") { setSelf(true); }
        else {
            setSelf(false);
        }
    }, [id]);

    return (
        <div className='md:w-[80%] max-md:w-full md:gap-8 mx-auto gap-6 flex flex-col md:px-6 max-md:p-4'>
            <div className='w-full mx-auto aspect-[630/150] rounded-md bg-gray' />
            <UserProfile />
            <div className='w-full h-px md:mt-6 bg-primaryGray'/>
            <SocialPresence/>
            <div className='w-full h-px md:mt-6 bg-primaryGray'/>
        </div>
    )
}
