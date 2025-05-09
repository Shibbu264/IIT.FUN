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
import AddUsername from './Modals/AddUsername';
import ShowSocials from './Modals/ShowSocials';
import VerifyEmail from './Modals/VerifyEmail';
import JoinTelegram from './Modals/JoinTelegram';
import BountyRegistration from './Modals/BountyRegistration';
import RSVPModal from './Modals/RSVPModal';
import CommunityCallRegistration from './Modals/CommunityCallRegistration';
import NFTMintingModal from './Modals/NFTMinting';
import CoinInfo from './Modals/CoinInfo';

export default function GlobalDialogWrapper({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const { isOpen, type, data } = useSelector((state: any) => state.dialog);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen && pathname != data?.pathname) {
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
        return <NFTModal {...data} />
      case 'addUsername':
        return <AddUsername {...data} />
      case 'showSocials':
        return <ShowSocials {...data} />
        case 'coinInfo':
          return <CoinInfo {...data} />  
      case 'verifyEmail':
        return <VerifyEmail {...data} />
      case 'joinTelegram':
        return <JoinTelegram {...data} />
      case 'bountyRegistration':
        return <BountyRegistration {...data} />
      case 'communityCallRegistration':
        return <CommunityCallRegistration {...data} />
      case 'rsvp':
        return <RSVPModal {...data} />
      case 'mintingNFT':
        return <NFTMintingModal {...data} />
      default:
        return null;
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
