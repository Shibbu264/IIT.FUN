import CustomWindow from "../Ui/CustomWindow";

export default function CustomWindowStack() {
    let windows = Array.from({ length: 4 }); // Default to 4 windows

    return (
       <>
    <div className="flex max-xl:hidden justify-center md:-top-36 md:-left-12 items-center md:w-full max-md:w-[80%] relative">
        {windows.map((_, i) => (
            <CustomWindow
                key={i}
                index={i}
                topContent="Contribute and mint some $IIT" 
                bottomContent={
                    <div className="bg-[#1e1e1e] text-white p-8 flex flex-col items-center justify-center">
                        <img src="/rainMoney.jpeg" alt="Animation" className="md:w-full md:h-full max-w-[160px] max-h-[112px] max-md:w-[60%] max-md:h-[60%] mb-4" />
                        <p className="text-5xl font-bold text-center">$IIT LAUNCHING SOON</p>
                    </div>
                } 
                className="md:absolute md:!w-[850px]"
                style={{ 
                    top: `calc(50% + ${i * 10}px)`, 
                    left: `calc(50% + ${i * 10}px)`, 
                    transform: "translate(-40%, -115%)", 
                    zIndex: 10 + i 
                }}  // Pass style here
            />
        ))}
    </div>
    <CustomWindow
                topContent="Contribute and mint some $IIT" 
                bottomContent={
                    <div className="bg-[#1e1e1e] max-md:w-[90%] text-white p-8 flex flex-col items-center justify-center">
                        <img src="/rainMoney.jpeg" alt="Animation" className="md:w-full md:h-full max-w-[160px] max-h-[112px] max-md:w-[60%] max-md:h-[60%] mb-4" />
                        <p className="text-5xl font-bold text-center">$IIT LAUNCHING SOON</p>
                    </div>
                } 
                className="xl:hidden"
            />
    </> 
    );
}