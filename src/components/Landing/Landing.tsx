import { Inria_Sans } from 'next/font/google';
import Image from 'next/image';
const inriaSans = Inria_Sans({ subsets: ['latin'], weight: ['700'] });

export default function Landing() {
    const messages = [
        { text: "When I was at IIT, we solved equations. Now IIT.fun solves economies.", color: "bg-black text-white", arrow: "after:border-black" },
        { text: "I gave free electricity, but these IIT.fun kids print “tax free” money.", color: "bg-lime-400 text-black", arrow: "after:border-lime-400" },
        { text: "I said work 100 hours a week, IIT.fun said make 100x overnight and Goa.", color: "bg-black text-white", arrow: "after:border-black" },
        { text: "My retirement plan? stay in India to farm airdrops and mint shitcoins.", color: "bg-lime-400 text-black", arrow: "after:border-lime-400" },
    ];

    return (
        <div className={`flex flex-col justify-center items-center mt-8 max-w-auto ${inriaSans.className} text-primaryGray`}>
            
            {/* Text Section */}
            <div className="flex flex-col mx-4 leading-[0.8] tracking-[-0.05em]  
                text-[1.5rem] sm:text-[1.8rem] md:text-[2.15rem] lg:text-[2.55rem] xl:text-[2.55rem] 2xl:text-[2.55rem]">
                {Array.from({ length: 20 }, (_, i) => (
                    <div key={i} className="grid grid-cols-3 gap-0 -my-[3px]">
                        <div className="whitespace-nowrap min-w-0">JEE TOPPED</div>
                        <div className="whitespace-nowrap min-w-0">IIT FUN'D</div>
                        <div className="whitespace-nowrap min-w-0">DEGENGOD COMPLEXGEN</div>
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

        </div>
    );
}