"use client"
import React, { useState } from 'react'
import styles from './banner.module.css';
import { cn } from '@/lib/utils';

const Banner = () => {
  return (
    <>
  <div className={cn(styles.bannerContainer, 'max-md:!hidden md:mt-[6%] lg:mt-[6%]')}>
    <div className={styles.firstBanner}>
      Joining IIT.fun: 69% smarter * Joining IIT.fun: 69% smarter * Joining IIT.fun: 69% smarter * Joining IIT.fun: 69% smarter
      <span className='max-lg:hidden'> * Joining IIT.fun: 69% smarter</span>
      <span className='max-lg:hidden'> * Joining IIT.fun: 69% smarter</span>
    </div>
      <div className={styles.secondBanner}>
        WE ARE INCUBATED IN ZO HOUSE * WE ARE INCUBATED IN ZO HOUSE * WE ARE INCUBATED IN ZO HOUSE 
        <span className='max-lg:hidden'>* WE ARE INCUBATED IN ZO HOUSE</span>
        <span className='max-lg:hidden'>* WE ARE INCUBATED IN ZO HOUSE</span>
      </div>
      </div>
      <div className=" relative md:hidden max-md:!block max-md: max-md:w-[99%]">
     <img 
     className='absolute top-2 z-10'
      src="/Group 8.jpeg"
     />
     <img 
     className=' z-0'
     src="/Group 9.jpeg"
     />
</div>
    </>
  );
};

export default Banner;