"use client"
import React, { useState } from 'react'
import styles from './banner.module.css';
import { cn } from '@/lib/utils';

const Banner = () => {
  return (
    <>
    <div className={cn(styles.bannerContainer, 'max-md:!hidden')}>
    <div className={styles.firstBanner}>
      Joining IIT.fun: 69% smarter * Joining IIT.fun: 69% smarter * Joining IIT.fun: 69% smarter * Joining IIT.fun: 69% smarter
    </div>
      <div className={styles.secondBanner}>
        WE ARE INCUBATED IN ZO HOUSE * WE ARE INCUBATED IN ZO HOUSE * WE ARE INCUBATED IN ZO HOUSE 
      </div>
      </div>
      <div className=" relative md:hidden max-md:!block">
     <img 
     className='absolute top-2 z-10'
      src="/Group 8.png"
     />
     <img 
     className='top-5 z-0'
     src="/Group 9.png"
     />
</div>
    </>
  );
};

export default Banner;