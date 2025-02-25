import { DialogContent } from '@/components/Ui/Dialog'
import { openDialog } from '@/lib/store/slices/dialogSlice'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import { useDispatch } from 'react-redux'

function getRandomQuote() {
    const quotes = [
        "Enter the matrix. Build the future.",
        "Smartest degens in the room.",
        "Web3 isn’t ready for what’s coming.",
        "Login? More like mint your fate.",
        "IITians don’t join. They lead.",
        "Tap in. Take over.",
        "This isn’t a website. It’s a portal.",
        "History gets written on-chain.",
        "The revolution doesn’t pause.",
        "You’re not late. You’re early.",
        "Brains, blocks, and zero brakes.",
        "From campus to consensus.",
        "Build. Break. Repeat.",
        "Reality is optional.",
        "IIT.fun — where the game flips.",
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function Login() {
    return (
        <DialogContent className='md:px-14 flex flex-col md:gap-7 max-md:gap-4 max-md:py-[72px]'>
            <div className='flex flex-col gap-2'>
                <p className='text-lg'>Sign up</p>
                <p className='text-sm text-[#C0C0C0]'>Welcome! Please enter your institute email.</p>
            </div>
            <div className='relative w-full aspect-video'>
                <Image layout="fill" alt='' src={"/login.gif"} />
            </div>
            <div onClick={() => signIn('google')} className='flex items-center justify-center bg-white text-black rounded-lg p-2 cursor-pointer'>
                <img src="/google-icon.svg" alt="Google Icon" className='w-5 h-5 mr-2' />
                <span className='font-semibold'>Continue with Google</span>
            </div>
            <p className='text-primaryGreen text-center'>{getRandomQuote()}</p>
        </DialogContent>
    )
}

export default Login