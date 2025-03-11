"use client"
import { Button } from '@/components/Ui/Button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAppSelector } from '@/lib/store/store';
import { TwitterIcon } from 'lucide-react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function UserProfile() {
    const { id } = useParams();
    const [self, setSelf] = useState(false);
    const user = useAppSelector(state => state.user.user)
    const isMobile=useIsMobile()

    useEffect(() => {
        if (id == "me") { setSelf(true); }
        else {
            setSelf(false);
        }
    }, [id]);
    return (
        <div className='w-full px-2 flex justify-between'>
            <div className='flex flex-col gap-4'>
                <h1 className='md:text-2xl text-xl'>{user?.username}</h1>
                <p className='md:text-xl text-lg text-secondaryGray'>{user?.instituteName ? user?.instituteName : (self ? <> IIT Dholakpur,<span className='text-primaryGreen cursor-pointer'> Verify Institute mail to change it !</span> </> : null)}</p>
                {self && <Button size={isMobile?"default":"lg"} className='mt-6 max-md:mt-2'>
                    <TwitterIcon width={32} height={32} className='min-w-8 h-8' />
                    <span className='md:!text-2xl text-lg'> Tweet your progress</span>
                </Button>}
            </div>
            <div className='flex flex-col gap-4'>
                <p className='md:text-xl text-lg text-primaryGreen'>Contributor</p>
                <p className='md:text-2xl text-xl'>{user?.points} points</p>
            </div>
        </div>
    )
}
