"use client"
import { Button } from '@/components/Ui/Button';
import { useIsMobile } from '@/hooks/use-mobile';
import { openDialog } from '@/lib/store/slices/dialogSlice';
import { useAppSelector } from '@/lib/store/store';
import { getBadgeFromPoints } from '@/lib/utils';
import { PencilIcon, TwitterIcon } from 'lucide-react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

export default function UserProfile() {
    const { id } = useParams();
    const [self, setSelf] = useState(false);
    const user = useAppSelector(state => state.searchUser.user)
    const isMobile=useIsMobile();
    const dispatch=useDispatch();



    const shareToTwitter = async () => {
          const tweetText = encodeURIComponent(
            `I just earned the ${getBadgeFromPoints(user?.points??0)} badge with ${user?.bounties} contributions and ${user?.points} points! 🎉 Check it out here: https://iit.fun/profile/${user?.username} #IIT.FUN`
          );
    
          // Optional: Add image support via backend (see "Backend Integration" below)
          const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
          window.open(tweetUrl, "_blank");
      };

    useEffect(() => {
        if (id == "me") { setSelf(true); }
        else {
            setSelf(false);
        }
    }, [id]);
    return (
        <div className='w-full px-2 flex justify-between'>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-3'>
                <h1 className='md:text-2xl text-xl'>{user?.username}</h1>
                <PencilIcon className='hover:text-primaryGreen cursor-pointer hover:scale-105' onClick={()=>dispatch(openDialog({
                    type:"addUsername",
                    data:{
                        type:"edit",
                        username:user?.username
                    }
                }))}/>
                </div>
                <p className='md:text-xl text-lg text-secondaryGray'>{user?.InstituteName ? user?.InstituteName : (self ? <> IIT Dholakpur,<span className='text-primaryGreen cursor-pointer'> Verify Institute mail to change it !</span> </> : null)}</p>
                {self && <Button onClick={shareToTwitter} size={isMobile?"default":"lg"} className='mt-6 max-md:mt-2'>
                    <TwitterIcon width={32} height={32} className='min-w-8 h-8' />
                    <span className='md:!text-2xl !text-md'> Tweet your progress</span>
                </Button>}
            </div>
            <div className='flex flex-col gap-4'>
                <p className='md:text-xl text-lg text-primaryGreen'>Contributor</p>
                <p className='md:text-2xl text-xl'>{user?.points} points</p>
            </div>
        </div>
    )
}
