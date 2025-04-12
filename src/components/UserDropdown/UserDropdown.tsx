import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../Ui/Dropdown";
import { Avatar, AvatarFallback, AvatarImage } from '../Ui/Avatar';
import { signOut, useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { LogOutIcon, User2Icon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAppSelector } from '@/lib/store/store';
import Link from 'next/link';
export default function UserDropdown() {
    const session = useSession();
    const isMobile = useIsMobile();
    const { user } = useAppSelector(state => state.user)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className='border-secondaryGreen max-md:w-8 max-md:h-8 hover:scale-105 border-2'>
                    <AvatarImage className='' src={session?.data?.user?.image ?? "/sponge.jpeg"} alt="@shadcn" />
                    <AvatarFallback>{session?.data?.user?.name?.slice(0, 2)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={16} align={isMobile ? "end" : "center"} className='bg-black p-2'>
                <DropdownMenuLabel className='text-primaryGreen'>{user?.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <Link href={"/profile/me"}><DropdownMenuItem className='!cursor-pointer flex gap-2 px-3 hover:bg-gray' >
                <User2Icon />
                    <span>My Profile</span>
                </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className='!cursor-pointer flex gap-2 p-3 hover:bg-gray' onClick={() => signOut().then(() => {
                    window.location.reload();
                    toast("Signed out successfully !")
                })}>                    <LogOutIcon color='red' />  
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
