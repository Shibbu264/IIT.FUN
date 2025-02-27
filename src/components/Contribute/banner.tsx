"use client"
import React, { useState } from 'react'
import styles from './banner.module.css';
import { cn } from '@/lib/utils';

const Banner = () => {
  return (
    <>
  <div className={cn(styles.bannerContainer, 'max-md:!hidden !mt-[8%]')}>
    <div className={styles.firstBanner}>
      Bug bounties, meme bounties, tech bounties - free money
    </div>
      </div>
      {/* <div className=" relative md:hidden max-md:!block max-md: mt-16 max-md:w-[90%]">
     <img 
     className='absolute top-2 z-10'
      src="/Group 8.jpeg"
     />
     <img 
     className=' z-0'
     src="/Group 9.jpeg"
     />
</div> */}
    </>
  );
};

export default Banner;