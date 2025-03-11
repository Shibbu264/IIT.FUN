import { BellIcon } from 'lucide-react';
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "../Ui/Popover";

export default function Notification() {
    return (

        <Popover>
            <PopoverTrigger className='relative'>
                <BellIcon className="cursor-pointer hover:scale-105" width={32} height={32} />
            </PopoverTrigger>
            <PopoverContent className='bg-black border-gray-400 border min-h-16 min-w-32 md:p-6 max-md:p-4'>
                <span className='text-lg'>No new Notifications !</span>
            </PopoverContent>
        </Popover>
    )
}
