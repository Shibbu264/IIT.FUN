import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { openDialog } from '@/lib/store/slices/dialogSlice';
import { Button } from './Button';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from './Avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './Dropdown';
import { toast } from 'sonner';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAppSelector } from '@/lib/store/store';
import { setUser } from '@/lib/store/slices/userSlice';
import NFTButton from '../NFT/NFTButton';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const router = usePathname();
    const dispatch = useDispatch();
    const session = useSession();
    const { publicKey, select, disconnect, connected, wallets, wallet } = useWallet();
    const { user } = useAppSelector(state => state.user)


    useEffect(() => {
        setActiveSection(router)
    }, [router])


    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleSectionClick = (section: string) => {
        setActiveSection(section);
        setIsOpen(false);
    };



    return (
        <>
            <nav className="fixed top-0 w-screen  bg-secondaryBlack z-40">
                <div className="flex lg:mt-10 md:mt-8 mb-2 md:max-w-[90%] mx-auto justify-between items-center h-16 max-md:px-4 md:px-6">
                    {/* Logo with minimal padding and guaranteed visibility */}
                    <div className="min-w-[80px]">
                        <Link href="/">
                            <div className="text-white text-lg sm:text-2xl font-bold whitespace-nowrap">
                                IIT.FUN
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8 bg-primaryBlack justify-center px-7 py-2.5 rounded-[10px]">
                        <Link href="/about"
                            className={`px-3 py-2 rounded-md ${activeSection === '/about' ? 'bg-secondaryBlack text-white' : 'text-white hover:bg-secondaryBlack'}`}
                            onClick={() => handleSectionClick('/about')}>
                            About
                        </Link>
                        <Link href="/community"
                            className={`px-3 py-2 rounded-md ${activeSection === '/community' ? 'bg-secondaryBlack text-white' : 'text-white hover:bg-secondaryBlack'}`}
                            onClick={() => handleSectionClick('/community')}>
                            Community
                        </Link>
                        <Link href="/leaderboard"
                            className={`px-3 py-2 rounded-md ${activeSection === '/leaderboard' ? 'bg-secondaryBlack text-white' : 'text-white hover:bg-secondaryBlack'}`}
                            onClick={() => handleSectionClick('/leaderboard')}>
                            Leaderboard
                        </Link>
                        <Link href="/contribute"
                            className={`px-3 py-2 rounded-md ${activeSection === '/contribute' ? 'bg-secondaryBlack text-white' : 'text-white hover:bg-secondaryBlack'}`}
                            onClick={() => handleSectionClick('/contribute')}>
                            Start Contributing
                        </Link>
                    </div>
                    <div className='flex md:gap-7 max-md:gap-4'>
                        {session?.status == "authenticated" && (
                            <>

                                {connected ? (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className='relative'>
                                            <p className='text-primaryGreen md:text-sm max-md:text-[10px] absolute max-md:-top-2 -top-4 -right-4'>Mint!</p>
                                            <Avatar>

                                                <AvatarImage src={wallet?.adapter?.icon} alt="@shadcn" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className='bg-black md:p-6 max-md:p-4'>
                                            <DropdownMenuLabel className='max-md:text-lg text-xl'>My Wallets</DropdownMenuLabel>
                                            <DropdownMenuItem className='!cursor-pointer rounded-xl flex max-md:flex-col gap-3 md:items-center'
                                            >
                                                <span className='max-md:max-w-36 whitespace-normal overflow-x-auto'>{user?.wallet}</span>
                                                <Button onClick={() => disconnect().finally(() => {
                                                    dispatch(setUser({ ...user, wallet: null }))
                                                })} variant="destructive"> Disconnect </Button></DropdownMenuItem>
                                            <DropdownMenuSeparator className='bg-gray-700 ml-2 mb-2 w-[90%]' />
                                            <DropdownMenuItem>
                                                <NFTButton/>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                ) : (
                                    <button className='text-secondaryGreen' onClick={() => dispatch(openDialog({
                                        type: 'wallet'
                                    }))}>Connect Wallet</button>
                                )}
                            </>
                        )}
                        {session?.status == "authenticated" && session?.data?.user ?
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar className='border-secondaryGreen border-2'>
                                        <AvatarImage src={session?.data?.user?.image ?? "/sponge.jpeg"} alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='bg-black pb-2'>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className='!cursor-pointer hover:bg-gray-800' onClick={() => signOut().then(() => {
                                        window.location.reload();
                                        toast("Signed out successfully !")
                                    })}>
                                        Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu> :
                            <Button variant="outline" onClick={() => dispatch(openDialog(
                                {
                                    type: "login"
                                }
                            ))} >
                                Enter arena
                            </Button>}
                        <button onClick={toggleMenu} className="bg-gray-800 flex md:hidden text-white w-8 h-8 p-1 rounded">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                    {/* Hamburger - minimal right padding */}
                </div>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="fixed inset-0 w-full h-full min-h-screen z-[70] bg-primaryBlack flex items-center justify-center overflow-hidden">
                    <div className="flex flex-col items-center space-y-8">
                        <Link href="/about"
                            className={`px-3 py-2 rounded-md ${activeSection === '/about' 
                                ? 'bg-secondaryBlack text-white' 
                                : 'text-white hover:bg-secondaryBlack active:bg-secondaryBlack transition-colors'} text-2xl`}
                            onClick={() => handleSectionClick('/about')}>
                            About
                        </Link>
                        <Link href="/community"
                            className={`px-3 py-2 rounded-md ${activeSection === '/community' 
                                ? 'bg-secondaryBlack text-white' 
                                : 'text-white hover:bg-secondaryBlack active:bg-secondaryBlack transition-colors'} text-2xl`}
                            onClick={() => handleSectionClick('/community')}>
                            Community
                        </Link>
                        <Link href="/leaderboard"
                            className={`px-3 py-2 rounded-md ${activeSection === '/leaderboard' 
                                ? 'bg-secondaryBlack text-white' 
                                : 'text-white hover:bg-secondaryBlack active:bg-secondaryBlack transition-colors'} text-2xl`}
                            onClick={() => handleSectionClick('/leaderboard')}>
                            Leaderboard
                        </Link>
                        <Link href="/contribute"
                            className={`px-3 py-2 rounded-md ${activeSection === '/contribute' 
                                ? 'bg-secondaryBlack text-white' 
                                : 'text-white hover:bg-secondaryBlack active:bg-secondaryBlack transition-colors'} text-2xl`}
                            onClick={() => handleSectionClick('/contribute')}>
                            Start Contributing
                        </Link>
                        <button onClick={toggleMenu} className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg">
                            Close
                        </button>
                    </div>
                </div>

            )}
        </>
    );
}