"use client"

import { Inria_Sans } from 'next/font/google';
import Image from 'next/image';
const inriaSans = Inria_Sans({ subsets: ['latin'], weight: ['700'] });
import { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

export default function Landing() {
    const messages = [
        { text: "When I was at IIT, we solved equations. Now IIT.fun solves economies.", color: "bg-[#151515] text-white", arrow: "after:border-black" },
        { text: "I gave free electricity, but these IIT.fun kids print “tax free” money.", color: "bg-lime-400 text-black", arrow: "after:border-lime-400" },
        { text: "I said work 100 hours a week, IIT.fun said make 100x overnight and Goa.", color: "bg-[#151515] text-white", arrow: "after:border-black" },
        { text: "My retirement plan? stay in India to farm airdrops and mint shitcoins.", color: "bg-lime-400 text-black", arrow: "after:border-lime-400" },
    ];

    return (
        <div className={`flex flex-col justify-center items-center mt-8 max-w-auto ${inriaSans.className} text-primaryGray`}>
            
            {/* Text Section */}
            <div className="flex flex-col mx-4 leading-[0.8] tracking-[-0.05em]  
                text-[1.5rem] sm:text-[1.8rem] md:text-[2.15rem] lg:text-[2.55rem] xl:text-[2.55rem] 2xl:text-[2.55rem]">
                    <div className="grid grid-cols-3 gap-0 -my-[3px]">
                        <div className="whitespace-nowrap min-w-0 text-center">JEE TOPPED</div>
                        <div className="whitespace-nowrap min-w-0 text-center">IIT FUN'D</div>
                        <div className="whitespace-nowrap min-w-0 text-center">DEGENGOD COMPLEXGEN</div>
                    </div>
                {Array.from({ length: 20 }, (_, i) => (
                    <div key={i} className="grid grid-cols-3 gap-0 -my-[3px]">
                        <div className="whitespace-nowrap min-w-0 text-center">JEE TOPPED</div>
                        <div className="whitespace-nowrap min-w-0 text-center">IIT FUN'D</div>
                        <div className="whitespace-nowrap min-w-0 text-center">JEE TOPPED</div>
                    </div>
                ))}
            </div>

            {/* Speech Bubbles */}
            <div className="flex flex-wrap gap-4 justify-center mt-24">
                {messages.map((msg, i) => (
                    <div key={i} className={`
                        relative p-4 max-w-xs text-sm ${msg.color} 
                    `}>
                        {msg.text}
                    </div>
                ))}
            </div>

            {/* Image Section */}
            <div className="w-[80%] mt-6">
                <Image
                    src="/people.png" 
                    alt="img"
                    layout="responsive"
                    width={100}
                    height={50}
                />
            </div>

            <PartnersDiv/>
            
            <CustomComponent/>
        
            <CustomWindowStack/>
            <div className="bg-bgBlack w-[55%] flex flex-col items-center py-10">
            <PromoSection
                heading="Join the Community"
                text="Inter IIT got you Medals?? We got you $$, If Meme-wars was an inter IIT event, Come on, we heard you."
                image="/phone.png"
                link="https://t.me/iit_fun"
            />   
            <PromoSection
                heading="Join the Leaderboard"
                text="We will track your engagement and add your scores in our Drop out meter, Let’s see which IIT mints the most $IIT and breaks the drop-o-meter."
                image="/second.png"
                link="https://yourlink.com"
            />   
            <PromoSection
                heading="Who are We??"
                text="We are just like you crazy IITians who don’t wanna go by rules, RULES ARE OUTDATED!!"
                image=""
                link="https://yourlink.com"
            />  
            </div> 

            <CustomWindow 
                topContent="Gallery" 
                bottomContent={
                    <div className="h-full w-full flex">
                        <img src="/groupMeme.png" alt="Citrea" className="h-full w-full" />
                    </div>
                } 
                className='mb-20 mt-20' 
            />

         
        </div>
    );
}

function PartnersDiv() {
    return (
        <div className="flex flex-col items-center justify-center bg-black mb-32">
            <p className="text-gray-400 text-[1.6rem] mb-6">partnered with</p>
            <div className="flex flex-wrap justify-center gap-8 px-4">
                <img src="/citrae.png" alt="Citrea" className="h-10 w-auto" />
                <img src="/nh.png" alt="Nakamoto Hub" className="h-10 w-auto" />
                <img src="/zo.png" alt="ZKSync" className="h-10 w-auto" />
                <img src="/nodops.png" alt="NodOps" className="h-10 w-auto" />
                <img src="/aptos.png" alt="Aptos" className="h-10 w-auto" />
            </div>
        </div>
    );
}

function CustomComponent() {
    return (
        <div className="flex mb-20 h-[35rem] text-white w-[50%]">
            {/* Left Sidebar */}
            <div className="w-1/5 bg-[#333333] p-4 flex flex-col items-center">
                <img src="/sponge.gif" alt="Meme" className="w-full h-auto mb-2" />
                <p className="text-m text-center">F*CK 9-5, Let me follow my heart</p>
                <button className="mt-auto border border-white text-white px-4 py-2"> $IIT coming soon </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-[#4c4c4c] flex flex-col relative">
                <p className="text-lg absolute left-[10%] top-[16.67%] ">Still waiting your OA’s to get cleared? TT</p>
                
            </div>


        </div>
    );
}

interface CustomWindowProps {
    topContent: React.ReactNode;
    bottomContent: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

function CustomWindow({ topContent, bottomContent, className, style }: CustomWindowProps) {
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) return null;

    return (
        <div className={`w-[47%] h- border border-lime-400 ${className}` } style={style}>
            {/* Top Section */}
            <div className="bg-lime-400 text-black p-2 text-center font-bold relative">
                {topContent}
                <button 
                    className="absolute right-2 top-1 w-6 h-6 flex items-center justify-center border border-black rounded-sm"
                    onClick={() => setIsOpen(false)}
                >
                    <X size={16} />
                </button>
            </div>

            {/* Bottom Section */}
            <div className="bg-[#1e1e1e] h-full text-white p-8 flex flex-col items-center justify-center">
                {bottomContent}
            </div>
        </div>
    );
}

// function CustomWindowStack() {
//     const windows = Array.from({ length: 4 });

//     return (
//         <div className="flex justify-center items-center w-full relative">
//             {windows.map((_, i) => (
//                 <CustomWindow
//                     key={i}
//                     topContent="Contribute and mint some $IIT" 
//                     bottomContent={<div className="bg-[#1e1e1e] h-[20rem] text-white p-8 flex flex-col items-center justify-center">
//                         <img src="/rainMoney.gif" alt="Animation" className="w-[80%] h-[80%] mb-4" />
//                         <p className="text-2xl font-bold text-center">$IIT LAUNCHING SOON</p>
//                     </div>} 
//                     className={`absolute top-[${i * 10}px] left-[${i * 10}px] z-[${10 + i}]`}
//                 />
//             ))}
//         </div>
//     );
// }

function CustomWindowStack() {
    const windows = Array.from({ length: 4 });

    return (
        
    <div className="flex justify-center items-center w-full relative">
        {windows.map((_, i) => (
            <CustomWindow
                key={i}
                topContent="Contribute and mint some $IIT" 
                bottomContent={
                    <div className="bg-[#1e1e1e] h-[20rem] text-white p-8 flex flex-col items-center justify-center">
                        <img src="/rainMoney.gif" alt="Animation" className="w-[80%] h-[80%] mb-4" />
                        <p className="text-2xl font-bold text-center">$IIT LAUNCHING SOON</p>
                    </div>
                } 
                className="absolute"
                style={{ 
                    top: `calc(50% + ${i * 10}px)`, 
                    left: `calc(50% + ${i * 10}px)`, 
                    transform: "translate(-40%, -115%)", 
                    zIndex: 10 + i 
                }}  // Pass style here
            />
        ))}
    </div>

    );
}

function PromoSection({
    heading,
    text,
    image,
    link,
}: {
    heading: string;
    text: string;
    image: string;
    link: string;
}) {
    return (
        <div className="bg-primaryGreen text-black p-10 flex items-center justify-between border-2 border-black rounded-lg w-[90%] my-4">
            {/* Left Content */}
            <div className="max-w-md">
                <h1 className="text-4xl font-bold">{heading}</h1>
                <p className="mt-4 text-lg">{text}</p>
                <Link href={link} target="_blank">
                    <button className="mt-6 bg-black text-white px-6 py-3 text-lg font-semibold rounded-md">
                        Explore Now
                    </button>
                </Link>
            </div>

            {/* Right Image */}
            <div className="relative">
                <img src={image} alt="Promo Image" className="max-w-xs drop-shadow-lg" />
            </div>
        </div>
    );
}