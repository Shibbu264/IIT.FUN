import React from 'react'
import { getRandomQuote } from '../GlobalDialogWrapper/Modals/Login'

export default function Loader({ variant = "default" }: { variant?: "default" | "full" }) {
    if (variant == "full") {
        return (
            <div className="flex flex-col gap-6 justify-center mx-auto my-auto items-center md:h-[calc(100%-96px)] h-[calc(100%-64px)]">
                <div className="animate-spin rounded-full md:h-24 md:w-24 h-16 w-16 border-b-2 border-primaryGreen"></div>
                <h1 className='md:text-2xl text-lg'>{getRandomQuote()}</h1>
            </div>
        )
    }
    return (
        <div className="flex justify-center mx-auto my-auto items-center md:h-[calc(100%-96px)] h-[calc(100%-64px)]">
            <div className="animate-spin rounded-full md:h-24 md:w-24 h-16 w-16 border-b-2 border-primaryGreen"></div>
        </div>
    )
}
