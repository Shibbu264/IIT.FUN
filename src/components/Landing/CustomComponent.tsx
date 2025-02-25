export default function CustomComponent() {
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