import { DialogContent } from '@/components/Ui/Dialog';
import { useWallet } from '@solana/wallet-adapter-react';
import React from 'react'

export default function WalletModal() {
    const { publicKey, select, disconnect, connected, wallets } = useWallet();
  return (
    <DialogContent>
        
    </DialogContent>
  )
}
