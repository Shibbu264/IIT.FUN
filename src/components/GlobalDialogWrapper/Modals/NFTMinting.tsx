import NFTButton from '@/components/NFT/NFTButton';
import { Button } from '@/components/Ui/Button';
import { DialogContent } from '@/components/Ui/Dialog';
import { setUser } from '@/lib/store/slices/userSlice';
import { useAppSelector } from '@/lib/store/store';
import { useWallet } from '@solana/wallet-adapter-react';
import React from 'react';
import { useDispatch } from 'react-redux';

export default function NFTMintingModal() {
    const dispatch = useDispatch();
    const { user } = useAppSelector(state => state.user);
    const { publicKey, select, disconnect, connected, wallet } = useWallet();
    return (
        <DialogContent className="md:w-md !w-screen bg-primaryBlack max-md:max-w-[90%] text-white p-6 rounded-xl">
            <div className='max-md:text-lg text-xl mb-6'>My Wallet</div>
            <div className='!cursor-pointer rounded-xl flex flex-col gap-3'
            >
                <span className='whitespace-normal  md:text-lg overflow-x-auto'>{user?.wallet}</span>
                <Button className='mr-auto' onClick={() => disconnect().finally(() => {
                    dispatch(setUser({ ...user, wallet: null }))
                })} variant="destructive"> Disconnect </Button></div>
            <div className='bg-gray-700 h-px ml-2 mb-2 w-[90%]' />
            <div>
                <NFTButton />
            </div>
        </DialogContent>
    );
}
