"use client"

import {
  PublicKey,
  publicKey,
  Umi,
} from "@metaplex-foundation/umi";
import { DigitalAssetWithToken, JsonMetadata } from "@metaplex-foundation/mpl-token-metadata";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useUmi } from "@/components/NFTUtils/useUmi";
import { fetchCandyMachine, safeFetchCandyGuard, CandyGuard, CandyMachine, AccountVersion } from "@metaplex-foundation/mpl-candy-machine"
import styles from "./Home.module.css";
import { guardChecker } from "@/components/NFTUtils/checkAllowed";
import { Center, Card, CardHeader, CardBody, StackDivider, Heading, Stack, Text, Skeleton, useDisclosure, Button, Modal, ModalBody, ModalCloseButton, ModalContent, Image, ModalHeader, ModalOverlay, Box, Divider, VStack, Flex } from '@chakra-ui/react';
import { ButtonList } from "@/components/NFT/mintButton";
import { GuardReturn } from "@/components/NFTUtils/checkerHelper";

import { useSolanaTime } from "@/components/NFTUtils/solanaTimeContext";
import { toast } from "sonner";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const useCandyMachine = (
  umi: Umi,
  candyMachineId: string,
  checkEligibility: boolean,
  setCheckEligibility: Dispatch<SetStateAction<boolean>>,
  firstRun: boolean,
  setfirstRun: Dispatch<SetStateAction<boolean>>
) => {
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();
  const [candyGuard, setCandyGuard] = useState<CandyGuard>();

  useEffect(() => {
    (async () => {
      if (checkEligibility) {
        if (!candyMachineId) {
          console.error("No candy machine in .env!");
          toast(
            "No candy machine in .env!",
            {
              description: "Add your candy machine address to the .env file!",
              duration: 999999,
            });
          return;
        }

        let candyMachine;
        try {
          candyMachine = await fetchCandyMachine(umi, publicKey(candyMachineId));
          //verify CM Version
          if (candyMachine.version != AccountVersion.V2) {
            toast(
              "Wrong candy machine account version!",
              {
                description: "Please use latest sugar to create your candy machine. Need Account Version 2!",
                duration: 999999,
              });
            return;
          }
        } catch (e) {
          console.error(e);
          toast(
            "The CM from .env is invalid",
            {
              description: "Are you using the correct environment?",
              duration: 999999,
            });
        }
        setCandyMachine(candyMachine);
        if (!candyMachine) {
          return;
        }
        let candyGuard;
        try {
          candyGuard = await safeFetchCandyGuard(umi, candyMachine.mintAuthority);
        } catch (e) {
          console.error(e);
          toast(
            "No Candy Guard found!",
            {
              description: "Do you have one assigned?",
              duration: 999999,
            });
        }
        if (!candyGuard) {
          return;
        }
        setCandyGuard(candyGuard);
        if (firstRun) {
          setfirstRun(false)
        }
      }
    })();
  }, [umi, checkEligibility]);

  return { candyMachine, candyGuard };
};

export default function NFTButton() {
  const umi = useUmi();
  const solanaTime = BigInt(9999999999)
  const { isOpen: isShowNftOpen, onOpen: onShowNftOpen, onClose: onShowNftClose } = useDisclosure();
  const { isOpen: isInitializerOpen, onOpen: onInitializerOpen, onClose: onInitializerClose } = useDisclosure();
  const [mintsCreated, setMintsCreated] = useState<{ mint: PublicKey, offChainMetadata: JsonMetadata | undefined }[] | undefined>();
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [ownedTokens, setOwnedTokens] = useState<DigitalAssetWithToken[]>();
  const [guards, setGuards] = useState<GuardReturn[]>([
    { label: "startDefault", allowed: false, maxAmount: 0 },
  ]);
  const [firstRun, setFirstRun] = useState(true);
  const [checkEligibility, setCheckEligibility] = useState<boolean>(true);

  if (!process.env.NEXT_PUBLIC_CANDY_MACHINE_ID) {
    console.error("No candy machine in .env!")
    toast(
      "No candy machine in .env!",
      {
        description: "Add your candy machine address to the .env file!",
        duration: 999999,
      });
  }
  const candyMachineId: PublicKey = useMemo(() => {
    if (process.env.NEXT_PUBLIC_CANDY_MACHINE_ID) {
      return publicKey(process.env.NEXT_PUBLIC_CANDY_MACHINE_ID);
    } else {
      console.error(`NO CANDY MACHINE IN .env FILE DEFINED!`);
      toast(
        "No candy machine in .env!",
        {
          description: "Add your candy machine address to the .env file!",
          duration: 999999,
        });
      return publicKey("11111111111111111111111111111111");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { candyMachine, candyGuard } = useCandyMachine(umi, candyMachineId, checkEligibility, setCheckEligibility, firstRun, setFirstRun);

  useEffect(() => {
    const checkEligibilityFunc = async () => {
      if (!candyMachine || !candyGuard || !checkEligibility || isShowNftOpen) {
        return;
      }
      setFirstRun(false);

      const { guardReturn, ownedTokens } = await guardChecker(
        umi, candyGuard, candyMachine, solanaTime
      );

      setOwnedTokens(ownedTokens);
      setGuards(guardReturn);
      setIsAllowed(false);

      let allowed = false;
      let notAllowedmsg;
      for (const guard of guardReturn) {
        if (guard.allowed) {
          allowed = true;
          break;
        }
        else{
          notAllowedmsg=guard?.reason
        }
      }
      if (!allowed) {
        toast(notAllowedmsg, {
          duration: 3000,
        });
      }
      setIsAllowed(allowed);
      setLoading(false);
    };

    checkEligibilityFunc();
    // On purpose: not check for candyMachine, candyGuard, solanaTime
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [umi, checkEligibility, firstRun]);

  return (
    <ButtonList
      guardList={guards}
      candyMachine={candyMachine}
      candyGuard={candyGuard}
      umi={umi}
      ownedTokens={ownedTokens}
      setGuardList={setGuards}
      mintsCreated={mintsCreated}
      setMintsCreated={setMintsCreated}
      onOpen={onShowNftOpen}
      setCheckEligibility={setCheckEligibility}
    />
  );
}
