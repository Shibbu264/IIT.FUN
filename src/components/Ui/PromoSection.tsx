import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function PromoSection({
    heading,
    text,
    image,
    link,
    className,
    headingClassName,
    imageClassName
}: {
    heading: string;
    text: string;
    image: string;
    link: string;
    className?: string;
    headingClassName?: string;
    imageClassName?: string;
}) {
    return (
        <div className={cn("bg-primaryGreen max-md:w-full grid grid-cols-10 text-black md:p-10 max-md:p-4  items-center justify-between border-2 border-black  w-[90%] my-4", className as string)}>
            {/* Left Content */}
            <div className="col-span-6">
                <h1 className={cn("text-[49.2px] max-md:text-2xl font-[700] leading-[62.97px]", headingClassName as string)}>{heading}</h1>
                <p className="mt-4 max-md:hidden text-lg">{text}</p>
                <Link href={link} target="_blank">
                    <button className="mt-6 bg-black text-[#CBFC02] md:px-6 md:py-3 max-md:p-4 md:text-sm max-md:text-sm font-semibold">
                        Explore Now
                    </button>
                </Link>
            </div>

            {/* Right Image */}
            <div className={cn("col-span-4 relative w-full aspect-square", imageClassName as string)}>
              <Image 
                src={image} 
                layout="fill" 
                alt="Promo Image" 
                className="drop-shadow-lg object-cover"
              />
            </div>
        </div>
    );
}