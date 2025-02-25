import { useState } from "react";
import { X } from "lucide-react";
import { CustomWindowProps } from "@/lib/Interfaces/Landing.interface";

export default function CustomWindow({ topContent, bottomContent, className, style,index=0 }: CustomWindowProps) {
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen && index!=0) return null;

    return (
        <div className={`md:w-[47%] max-md:w-[90%] h-fit  border border-t-black border-lime-400 ${className}` } style={style}>
            {/* Top Section */}
            <div className="bg-lime-400 border-l-black border-l text-black p-2 text-center font-bold relative">
                {topContent}
                {index!=0 &&<button 
                    className="absolute right-2 top-1 w-6 h-6 flex items-center justify-center border border-black rounded-sm"
                    onClick={() => setIsOpen(false)}
                >
                     <X size={16} />
                </button>}
            </div>

            {/* Bottom Section */}
            <div className="bg-[#1e1e1e] h-fit text-white p-8 flex flex-col items-center justify-center">
                {bottomContent}
            </div>
        </div>
    );
}