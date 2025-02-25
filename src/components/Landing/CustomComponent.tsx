export default function CustomComponent() {
    return (
        <div className="flex mb-20 md:h-[35rem] max-md:h-[720px] text-white md:w-[85%]">
            {/* Left Sidebar */}
            <div className="w-1/5 bg-[#333333] p-4 flex flex-col items-center">
                <img src="/sponge.gif" alt="Meme" className="w-full h-auto mb-2" />
                <p className="text-m text-center">F*CK 9-5, Let me follow my heart</p>
                <button className="mt-auto border-2 border-[#333333] text-sm font-medium text-white px-4 py-2"> $IIT coming soon </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 max-md:mb-8 bg-[#4c4c4c] flex flex-col relative">
                <p className="max-md:text-md text-3xl absolute left-[6%] top-[8.67%] ">Still waiting your OA’s to get cleared? TT</p>
                
            </div>


        </div>
    );
}