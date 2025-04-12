import { useSession } from 'next-auth/react';
import React from 'react'
import { Button } from "../Ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "../Ui/Popover";
import { Avatar, AvatarFallback, AvatarImage } from "../Ui/Avatar";
import { setUser } from "@/lib/store/slices/userSlice";
import { openDialog } from "@/lib/store/slices/dialogSlice";
import { toast } from "sonner";
import { useAppSelector } from '@/lib/store/store';
import { useWallet } from '@solana/wallet-adapter-react';
import { useDispatch } from 'react-redux';

export default function NFT() {
    const session = useSession();
    const { publicKey, select, disconnect, connected, wallet } = useWallet();
    const { user } = useAppSelector(state => state.user)
    const dispatch = useDispatch()

    return (
        <div className='flex flex-col items-center md:gap-7 max-md:gap-4'>
            {session?.status == "authenticated" && (
                <>

                    {connected ? (
                        <div className='flex gap-3 items-center'>
                            <Button className='max-md:h-8' onClick={() => dispatch(openDialog({
                                type: 'nftModal',
                                data: {
                                    address: wallet?.adapter.publicKey?.toString()
                                }
                            }))} variant="outline">My NFTs</Button>
                            <div onClick={()=>dispatch(openDialog({
                                type:'mintingNFT'
                            }))} className='relative cursor-pointer'>
                                <p className='text-primaryGreen md:text-sm max-md:text-[10px] absolute max-md:-top-2 -top-4 -right-4'>Mint!</p>
                                <Avatar className='max-md:w-8 max-md:h-8'>

                                    <AvatarImage className='' src={wallet?.adapter?.icon} alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    ) : (
                        <button className='text-secondaryGreen' onClick={() => dispatch(openDialog({
                            type: 'wallet'
                        }))}>Connect Wallet</button>
                    )}
                </>
            )}
        </div>
    )
}
