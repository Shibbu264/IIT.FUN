import { useState } from "react";
import { X } from "lucide-react";
import { CustomWindowProps } from "@/lib/Interfaces/Landing.interface";

export default function CustomWindow({ topContent, bottomContent, className, style }: CustomWindowProps) {
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