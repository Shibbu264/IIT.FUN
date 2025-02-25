"use client"
import React, { useState } from 'react'
import Banner from '@/components/Community/banner'
import Getgallery from '@/components/Community/gallery'
import PromoSection from '@/components/Ui/PromoSection'
import PartnersDiv from '@/components/Ui/PartnersDiv'

export default function page() {
    
    return (
        <div className='flex flex-col w-full items-center justify-center gap-16'>
        <Banner/>
        <Getgallery/>
        <PromoSection className='w-[69%]' headingClassName='w-[30%]' heading="Join the Community" text="Inter IIT got you Medals?? We got you $$, If Meme-wars was an inter IIT event Come on, we heard you." image="/images/1.jpg" link="https://www.iit.fun" />
        <PartnersDiv/>
        </div>
    )
}