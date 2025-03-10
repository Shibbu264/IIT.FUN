"use client"
import React from 'react'
import Image from 'next/image'
import posts from '@/components/Community/posts'
import styles from '@/components/Community/posts.module.css'
import { cn } from '@/lib/utils'
import PromoSection from '@/components/Ui/PromoSection'

export default function About() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <div className="w-[95%] mx-auto">
        <div className="text-4xl font-bold mb-8 mt-4 text-center text-primaryGreen">About Us</div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* First Row */}
          <div className="relative max-md:hidden h-40 sm:h-56 md:max-h-80 overflow-hidden  hover:scale-105 transition-transform">
            <Image 
            src="/nerd 1.jpeg" 
            alt="Image 1" 
            className="w-full h-full object-cover"
            height={300}
            width={300}
            />
          </div>
          <div className="relative h-40 sm:h-56 md:max-h-80 overflow-hidden  hover:scale-105 transition-transform flex items-center justify-center bg-secondaryBlack">
            <h2 className="font-bold text-center px-4">
                <span className="text-xl text-white">Founded in</span><br/>
                <span className="text-4xl text-primaryGreen">IIT</span>
            </h2>
          </div>
          <div className="relative max-md:hidden h-40 sm:h-56 md:max-h-80  overflow-hidden  hover:scale-105 transition-transform">
            <Image unoptimized src="/giphy31.jpeg" alt="Image 3"  className="object-cover"  height={300} width={300}/>
          </div>
          <div className="relative md:hidden h-40 sm:h-56 md:max-h-80 overflow-hidden hover:scale-105 transition-transform">
            <Image src="/giphy21.jpeg" alt="Image 8" className="w-full h-full object-cover"  height={300} width={300}/>
          </div>
          <div className="relative h-40 sm:h-56 md:max-h-80  overflow-hidden  hover:scale-105 transition-transform">
            <Image unoptimized src="/giphy61.jpeg" alt="Image 4"  className="object-cover" height={500} width={300} />
          </div>

          {/* Second Row */}
          <div className="relative max-md:hidden h-40 sm:h-56 md:max-h-80 overflow-hidden  hover:scale-105 transition-transform">
            <Image unoptimized src="/giphy51.jpeg" alt="Image 5"  className="object-cover"  height={300} width={300}/>
          </div>
          <div className="relative max-md:hidden h-40 sm:h-56 md:max-h-80 overflow-hidden  hover:scale-105 transition-transform">
            <Image unoptimized src="/giphy41.jpeg" alt="Image 6" className="object-cover"  height={300} width={300}/>
          </div>

          <div className="relative h-40 sm:h-56 md:max-h-80 overflow-hidden  hover:scale-105 transition-transform flex items-center justify-center bg-secondaryBlack">
            <h2 className="font-bold text-center px-4">
                <span className="text-xl text-primaryGreen">the brainy</span><br/>
                <span className="text-4xl text-primaryGreen">DEGENS</span>
            </h2>
          </div>
          
          <div className="relative max-md:hidden h-40 sm:h-56 md:max-h-80 overflow-hidden hover:scale-105 transition-transform">
            <Image src="/giphy21.jpeg" alt="Image 8" className="w-full h-full object-cover"  height={300} width={300}/>
          </div>
        </div>

        {/* What If Section */}
        <div className="w-full pb-16 pt-12">
          <h2 className="text-[40px] md:text-[90px] lg:text-[130px] font-light text-center bg-gradient-to-r bg-primaryGreen bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer">
            WHAT IS IIT.FUN?
          </h2>
        </div>

        <div className="flex justify-center">
  <div className="flex gap-6 max-md:flex-col-reverse  flex-1 bg-primaryBlack text-white p-4 mt-4 md:mt-0 max-w-[1200px] min-h-[160px] md:h-auto items-center mx-auto">
    {/* Image Container */}
    <div className={cn(styles.container1)}>
      <div className={cn(styles.skewedBox1)}>
        <Image 
          src="/giphy 7.jpeg" 
          alt="meme" 
          layout='fill'
          className={styles.image2}
        />
      </div>
    </div>

    {/* Text Content */}
    <div className="ml-6 md:ml-24 lg:ml-44 text-xl lg:text-[20px] md:text-[15px]">
      IIT.fun is the Talent Layer of IITians in Web 3<br/>
      Got an idea? Send a proposal and get a grant.<br/>
      Have a skill? Start contributing to projects and earn rewards.
    </div>
  </div>
</div>


        <div className="w-full pb-16 pt-12">
          <h2 className="text-[50px] md:text-[90px] lg:text-[150px] font-extrabold text-center bg-gradient-to-r bg-primaryGreen bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer transform scale-x-[-1] rotate-180">
            WHAT IS $IIT?
          </h2>
        </div>

        <div className="flex justify-center">
  <div className="flex flex-1 gap-6 max-md:flex-col-reverse bg-primaryBlack text-white p-4 mt-4 md:mt-0 max-w-[1200px] min-h-[160px] md:h-auto items-center mx-auto">
    
    {/* Text Content - Appears on the Left */}
    <div className="mr-6 md:mr-24 lg:mr-44 text-xl lg:text-[20px] md:text-[15px]">
    If you had an opportunity to invest in IITians building internet 20 years back you can calculate the returns you would get.<br/>
    You have the same opportunity now.   
     </div>

    {/* Image Container */}
    <div className={cn(styles.container1)}>
      <div className={cn(styles.skewedBox1)}>
        <Image 
          src="/giphy 8.jpeg" 
          alt="meme" 
          width={310} 
          height={162} 
          className={styles.image2}
        />
      </div>
    </div>

  </div>
</div>

        <div className="flex justify-center w-full">
          <PromoSection 
            className='w-[90%] lg:w-[69%] px-4 md:px-8 max-w-7xl mt-16' 
            headingClassName='w-[30%]' 
            heading="Join the Community" 
            text="Inter IIT got you Medals?? We got you $$, If Meme-wars was an inter IIT event Come on, we heard you." 
            image="/phone.jpeg" 
            link="https://www.iit.fun"
          />
        </div>

      </div>
    </div>
  )
}