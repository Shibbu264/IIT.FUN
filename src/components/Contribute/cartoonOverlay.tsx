"use client"
import React from 'react'
import Image from "next/image";

export default function CartoonOverlay() {
  return (
    <div className="relative bg-black text-[#CBFC02] w-full mt-6 flex items-center justify-center">
      {/* Parent div */}
      <div className="w-full relative h-full flex flex-col items-center gap-20">
        {/* Upper two images */}
        <div className="flex justify-between w-[70%] pt-4 mt-4">
        <div className='relative  md:h-44 aspect-video'>
          <Image layout='fill' src="/Vector 29.jpeg" alt="Arrow"/>
        </div>
        <div className='relative  md:h-44 md:w-44'>
          <Image layout='fill' src="/Group 177013.jpeg" alt="Surprised Face" />
          </div>
        </div>

        {/* Lower three images */}
        <div className="flex justify-between items-start w-4/5">
        <div className='relative md:w-56 aspect-square'>
          <Image layout='fill' src="/Group 1000006154.jpeg" alt="Angry Face"  />
          </div>
          <div className='relative md:w-[227px] aspect-square'>
          <Image layout='fill' src="/Group 177025.jpeg" alt="Sunglasses" />
          </div>
          <div className='relative md:w-[227px] aspect-square'>
          <Image layout='fill' src="/Group 1000006158.jpeg" alt="Monkey Face" />
          </div>
        </div>
        <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 !text-center !text-8xl !w-full text-white font-[500] tracking-widest">
          Let&apos;s hunt some <br />
          bounties
      </div>
      </div>

      {/* Centered text */}
     
    </div>
  );
}