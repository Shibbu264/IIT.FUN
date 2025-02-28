"use client"
import React, { useState } from 'react'
import Banner from '@/components/Community/banner'
import Getgallery from '@/components/Community/gallery'
import PromoSection from '@/components/Ui/PromoSection'
import PartnersDiv from '@/components/Ui/PartnersDiv'
import Achievement from '@/components/Community/achievement'


export default function page() {
    
    return (
        <div className='flex flex-col w-full mx-auto items-center justify-center gap-28 max-md:gap-3'> 
        <Banner/>
        <Getgallery/>
        <PromoSection className='md:w-[68.5%] max-md:!w-4/5 !m-11 md:!m-11 lg:!m-11 !gap-16 max-md:!gap-3' headingClassName='w-[30%]' heading="Join the Community" text="Inter IIT got you Medals?? We got you $$, If Meme-wars was an inter IIT event Come on, we heard you." image={"/phone.jpeg"} link="https://t.me/iit_fun" imageClassName='col-span-3 mr-auto max-md:!col-span-4' />
        <Achievement/>
        <PartnersDiv/>
        </div>
    )
}