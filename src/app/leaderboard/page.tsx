export default function Leaderboard() {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <h2 className="
                text-4xl md:text-6xl lg:text-7xl 
                font-extrabold text-center 
                bg-gradient-to-r from-primaryGreen to-green-400 
                bg-clip-text text-transparent 
                hover:scale-105 transition-transform 
                cursor-pointer 
                origin-center
                animate-[mirror_2s_ease-in-out_infinite]
                [animation-name:mirror]
                [animation-duration:2s]
                [animation-timing-function:ease-in-out]
                [animation-iteration-count:infinite]
                [@keyframes_mirror{from,to{transform:scaleX(1)}50%{transform:scaleX(-1)}}]
            ">
                COMING SOON..
            </h2>
        </div>
    )
}