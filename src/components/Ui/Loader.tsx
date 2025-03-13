import React from 'react'

export default function Loader() {
    return (
        <div className="flex justify-center mx-auto my-auto items-center md:h-[calc(100%-96px)] h-[calc(100%-64px)]">
            <div className="animate-spin rounded-full md:h-24 md:w-24 h-16 w-16 border-b-2 border-primaryGreen"></div>
        </div>
    )
}
