"use client"
import React from 'react'
import Image from "next/image";
import CartoonOverlay from '@/components/Contribute/cartoonOverlay';
import Banner from '@/components/Contribute/banner';
import JobList from '@/components/Contribute/jobList';

export default function page() {
  return (
  <>
    <CartoonOverlay />
    {/* <Banner /> */}
    <JobList />
  </>
  );
}