import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { openDialog } from '@/lib/store/slices/dialogSlice';
import { Button } from "./Button";
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from './Avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './Dropdown';
import { toast } from 'sonner';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAppSelector } from '@/lib/store/store';
import { setUser } from '@/lib/store/slices/userSlice';
import NFTButton from '../NFT/NFTButton';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';
import { AppSidebar } from './AppSideBar';
import { SidebarTrigger, useSidebar } from './sidebar';
import { PanelLeft } from 'lucide-react';

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
        session?.status == "authenticated" ?
            <>
                <AppSidebar />
            </> :
            <div>
                <nav className="fixed top-0 w-full md:h-24 h-16 bg-secondaryBlack z-[25]">
                    <div className="flex lg:mt-10 mt-6 md:max-w-[90%] mx-auto justify-between items-center h-8 max-lg:px-4 lg:px-6">
                        {/* Logo with minimal padding and guaranteed visibility */}
                        <div className="min-w-[80px]">
                            <Link href="/">
                                <div className="text-white text-lg sm:text-2xl font-bold whitespace-nowrap">
                                    IIT.FUN
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center ml-auto lg:gap-6 gap-4 bg-primaryBlack justify-center px-6 py-2.5 rounded-[10px]">
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
                        <div className='flex ml-auto gap-4'>
                            <Button onClick={() => dispatch(openDialog(
                                {
                                    type: "login"
                                }
                            ))} >
                                Enter arena
                            </Button>
                            <button onClick={toggleMenu} className="bg-gray-800 flex lg:hidden text-white w-8 h-8 p-1 rounded">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {/* Hamburger - minimal right padding */}
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
            </div>
    );
}