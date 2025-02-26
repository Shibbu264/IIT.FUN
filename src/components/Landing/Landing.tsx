"use client"
import React, { useEffect, useRef } from 'react';
import { Inria_Sans } from 'next/font/google';
import Image from 'next/image';
const inriaSans = Inria_Sans({ subsets: ['latin'], weight: ['700'] });
import PromoSection from '../Ui/PromoSection';
import CustomWindow from '../Ui/CustomWindow';
import PartnersDiv from '../Ui/PartnersDiv';
import CustomWindowStack from './CustomWindowStack';
import CustomComponent from './CustomComponent';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Landing() {
    const messages = [
        { text: "When I was at IIT, we solved equations. Now IIT.fun solves economies.", color: "bg-[#151515] text-white", arrow: "after:border-black" },
        { text: "I gave free electricity, but these IIT.fun kids print “tax free” money.", color: "bg-lime-400 text-black", arrow: "after:border-lime-400" },
        { text: "I said work 100 hours a week, IIT.fun said make 100x overnight and Goa.", color: "bg-[#151515] text-white", arrow: "after:border-black" },
        { text: "My retirement plan? stay in India to farm airdrops and mint shitcoins.", color: "bg-lime-400 text-black", arrow: "after:border-lime-400" },
    ];

    return (
        <div className={`flex flex-col max-md:px-4 justify-center items-center mt-8 mx-auto text-primaryGray`}>
            {/* Text Section */}
            <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }} 
            className="flex mr-12 flex-col leading-[0.8] tracking-[-0.05em]  
                text-[1.5rem] max-sm:text-[0.95rem] sm:text-[1.4rem] md:text-[2.05rem] xl:text-[2.55rem] 2xl:text-[2.55rem]">
                <div className="grid grid-cols-3 gap-0 -my-[3px]">
                    <div className="whitespace-nowrap min-w-0 text-center">JEE TOPPED</div>
                    <div className="whitespace-nowrap min-w-0 text-center">IIT FUN'D</div>
                    <div className="whitespace-nowrap max-sm:text-[0.85rem] max-md:text-[1.3rem] max-lg:text-[1.95rem] max-xl:text-[2.45rem] text-[2.40rem] min-w-0 text-center">DEGENGOD COMPLEXGEN</div>
                </div>
                <div className="grid grid-cols-3 gap-0 -my-[3px]">
                    <div className="whitespace-nowrap min-w-0 text-center">JEE TOPPED</div>
                    <div className="whitespace-nowrap min-w-0 text-center">IIT FUN'D</div>
                    <div className="whitespace-nowrap max-sm:text-[0.85rem] max-md:text-[1.3rem] max-lg:text-[1.95rem] max-xl:text-[2.45rem] text-[2.40rem] min-w-0 text-center">DEGENGOD COMPLEXGEN</div>
                </div>
                {Array.from({ length: 20 }, (_, i) => (
                    <div key={i} className="grid grid-cols-3 gap-0 -my-[3px]">
                        <div className="whitespace-nowrap min-w-0 text-center">JEE TOPPED</div>
                        <div className="whitespace-nowrap min-w-0 text-center">IIT FUN'D</div>
                        <div className="whitespace-nowrap max-lg:ml-12 min-w-0 text-center">JEE TOPPED</div>
                    </div>
                ))}
            </motion.div>

            {/* Speech Bubbles */}
            <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }} 
            className="flex max-lg:hidden flex-wrap gap-4 justify-center md:mt-24 max-md:mt-6">
                {messages.map((msg, i) => (
                    <motion.div key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`relative p-4 max-w-[240px] text-sm ${msg.color}`}>
                        <div className={cn("absolute left-1 -bottom-3  w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px]",i%2==0?"border-t-[#151515]":"border-t-lime-400")}
                        />
                        {msg.text}
                    </motion.div>
                ))}
            </motion.div>

            {/* Image Section */}
            <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-[80%] max-lg:hidden mt-6">
                <Image
                    src="/people.png"
                    alt="img"
                    layout="responsive"
                    width={100}
                    height={50}
                />
            </motion.div>

            <div className='flex lg:hidden gap-4  flex-col items-center w-full h-full'>
                <div className='flex gap-6'>
                    <div className="flex  flex-wrap gap-4 justify-center md:mt-24 max-md:mt-6">
                        <div className={`
                        relative p-4 max-w-[240px] text-sm ${messages[0].color} 
                    `}>
                            <div className="absolute left-1 -bottom-3 
    w-0 h-0 
    border-l-[10px] border-l-transparent 
    border-r-[10px] border-r-transparent 
    border-t-[14px] border-t-[#151515]"
                            />
                            {messages[0].text}
                        </div>
                    </div>
                    <div className="flex  flex-wrap gap-4 justify-center md:mt-24 max-md:mt-6">
                        <div className={`
                        relative p-4 max-w-[240px] text-sm ${messages[1].color} 
                    `}>
                            <div className="absolute left-1 -bottom-3 
    w-0 h-0 
    border-l-[10px] border-l-transparent 
    border-r-[10px] border-r-transparent 
    border-t-[14px] border-t-lime-400"
                            />
                            {messages[1].text}
                        </div>
                    </div>
                </div>
                <img className='relative h-full w-[450px]' src={"/Group48.png"} />
                <div className='flex gap-6'>
                    <div className="flex flex-wrap gap-4 justify-center md:mt-24 max-md:mt-6">
                        <div className={`
                        relative p-4 max-w-[240px] text-sm ${messages[2].color} 
                    `}>
                            <div className="absolute left-1 -bottom-3 
    w-0 h-0 
    border-l-[10px] border-l-transparent 
    border-r-[10px] border-r-transparent 
    border-t-[14px] border-t-[#151515]"
                            />
                            {messages[2].text}
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center md:mt-24 max-md:mt-6">
                        <div className={`
                        relative p-4 max-w-[240px] text-sm ${messages[3].color} 
                    `}>
                            <div className="absolute left-1 -bottom-3 
    w-0 h-0 
    border-l-[10px] border-l-transparent 
    border-r-[10px] border-r-transparent 
    border-t-[14px] border-t-lime-400"
                            />
                            {messages[3].text}
                        </div>
                    </div>
                </div>
                <img className='relative h-full w-[450px]' src={"/Group47.png"} />
            </div>
            <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            >
            <PartnersDiv />
            </motion.div>

            <motion.div
            initial={{ opacity: 0, x: -75 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className='flex items-start max-xl:hidden w-[70%]'>
                <CustomComponent />
            </motion.div>

            <div>
                <CustomWindowStack />
            </div>
            <motion.div
              initial={{ opacity: 0.2, y: -70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, staggerChildren: 0.2 }}          
              className="bg-bgBlack md:w-[75%] max-md:w-[90%] flex flex-col items-center py-10">
            
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full flex justify-center"
              >
                <PromoSection
                  className='lg:min-h-[430px] min-h-[270px]'
                  heading="Join the Community"
                  text="Inter IIT got you Medals?? We got you $$, If Meme-wars was an inter IIT event, Come on, we heard you."
                  image="/phone.png"
                  link="https://t.me/iit_fun"
                />
              </motion.div>
            
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full flex justify-center"
              >
                <PromoSection
                  className='lg:min-h-[430px] min-h-[270px]'
                  heading="Join the Leaderboard"
                  text="We will track your engagement and add your scores in our Drop out meter, Let's see which IIT mints the most $IIT and breaks the drop-o-meter."
                  image="/second.png"
                  link="https://yourlink.com"
                />
              </motion.div>
            
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full flex justify-center"
              >
                <PromoSection
                  className='lg:min-h-[430px] min-h-[270px]'
                  heading="Who are We??"
                  text="We are just like you crazy IITians who don't wanna go by rules, RULES ARE OUTDATED!!"
                  image="/second.png"
                  link="https://yourlink.com"
                />
              </motion.div>
            </motion.div>


            <CustomWindow
                topContent="Gallery"
                bottomContent={
                    <div className="h-full w-full flex">
                        <img src="/groupMeme.png" alt="Citrea" className="h-full max-md:hidden w-full" />
                        <img src="/memePhone.png" alt="Citrea" className="h-full md:hidden w-full" />
                    </div>
                }
                className='mb-20 max-md:!w-[90%] md:!w-[75%] mt-20'
            />
        </div>
    );
}