import { Button } from '@/components/Ui/Button';
import { DialogContent } from '@/components/Ui/Dialog';
import { closeDialog } from '@/lib/store/slices/dialogSlice';
import { setUser } from '@/lib/store/slices/userSlice';
import { useAppSelector } from '@/lib/store/store';
import { useWallet, Wallet } from '@solana/wallet-adapter-react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

export default function WalletModal() {
  const { publicKey, select, disconnect, connected, wallets } = useWallet();
  const session = useSession();
  const { user } = useAppSelector(state => state.user)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(-1)
  console.log(wallets)

  const [installedWallets, setInstalledWallets] = useState<Wallet[]>([]);

  useEffect(() => {
    const loadableWallets = wallets.filter(
      (wallet) => wallet.readyState === "Loadable" || wallet.readyState === "Installed"
    );
    setInstalledWallets(loadableWallets);
  }, [wallets]);

  useEffect(() => {
    if (user?.wallet) {
      const walletAddress = user.wallet;
      const walletToConnect = wallets.find(wallet => wallet.adapter.publicKey?.toString() === walletAddress);
      if (walletToConnect) {
        select(walletToConnect.adapter.name);
      }
    }
    console.log(publicKey)
    if (publicKey && (!user?.wallet || publicKey.toString() !== user?.wallet)) {
      console.log("here")
      updateWallet(publicKey.toString());
    }
  }, [publicKey, user?.wallet]);

  const updateWallet = async (wallet: any) => {
    const response = await fetch("/api/save-wallet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: session?.data?.user?.email, wallet }),
    });
    const data = await response.json();
    console.log(data)
    if (data.success) {
      dispatch(setUser({ ...user, wallet: wallet }))
      dispatch(closeDialog())
    };
    setLoading(-1)
  };

  return (
    <DialogContent className='flex flex-col gap-2'>
      <h2 className='font-bold text-xl'>Connect to a Wallet</h2>
      <div className='flex flex-col gap-3'>
        {installedWallets.map((wallet: Wallet, index) => (
          <div key={wallet.adapter.name}>
            <Button loading={loading == index} variant="outline" className='flex w-44 p-4 gap-2 items-center' onClick={() => { setLoading(index); select(wallet.adapter.name) }} >
              Connect to {wallet.adapter.name}
              <img className='w-8 h-8' src={wallet.adapter.icon} />
            </Button>
          </div>
        ))}
      </div>
    </DialogContent>
  )
}
