import React, { ReactNode, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Dialog,
  DialogTitle
} from "@/components/Ui/Dialog"
import { closeDialog, toggleDialog } from "@/lib/store/slices/dialogSlice"
import Login from './Modals/Login';
import WalletModal from './Modals/WalletModal';
import NFTModal from './Modals/NFTModal';
import { usePathname } from 'next/navigation';

export default function GlobalDialogWrapper({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const { isOpen, type, data } = useSelector((state: any) => state.dialog);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen && pathname != data?.pathname) {
      console.log('here2')
      dispatch(closeDialog())
    }
  }, [pathname])



  const renderComponentFromType = () => {
    switch (type) {
      case 'login':
        return <Login {...data} />;
      case 'wallet':
        return <WalletModal {...data} />;
      case 'nftModal':
        return <NFTModal {...data} />     // Replace with your actual component
      default:
        return null; // Or a default component
    }
  };

  return (
    <>
      {children}
      <Dialog open={isOpen} onOpenChange={() => dispatch(toggleDialog())}>
        <DialogTitle></DialogTitle>
        {isOpen && renderComponentFromType()}
      </Dialog>
    </>
  )
}
