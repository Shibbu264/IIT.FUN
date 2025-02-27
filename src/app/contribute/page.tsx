"use client"
import React from 'react'
import Image from "next/image";
import CartoonOverlay from '@/components/Contribute/cartoonOverlay';
import Banner from '@/components/Contribute/banner';
import JobList from '@/components/Contribute/jobList';
import NFTButton from '@/components/NFT/NFTButton';

export default function page() {
  return (
  <>
   <NFTButton/>
    <CartoonOverlay />
    {/* <Banner /> */}
    <JobList />
  </>
  );
}