import CustomWindow from "../Ui/CustomWindow";

export default function CustomWindowStack() {
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