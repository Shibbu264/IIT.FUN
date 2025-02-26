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

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const router = usePathname();
    const dispatch = useDispatch();
    const session = useSession();
    const { publicKey, select, disconnect, connected, wallets } = useWallet();
    const [walletAddress, setWalletAddress] = useState(session?.data?.user?.wallet || "");


    useEffect(() => {
        setActiveSection(router)
    }, [router])

    useEffect(() => {
        if (publicKey && publicKey.toString() !== walletAddress) {
            updateWallet(publicKey.toString());
        }
    }, [publicKey]);

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

    const updateWallet = async (wallet: any) => {
        if (!session?.data?.user?.email) return;
        const response = await fetch("/api/save-wallet", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: session.data?.user.email, wallet }),
        });
        const data = await response.json();
        if (data.success) setWalletAddress(wallet);
    };

    return (
        <>
            <nav className="fixed top-0 w-full bg-secondaryBlack z-40">
                <div className="max-w-7xl ml-10">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo with minimal padding and guaranteed visibility */}
                        <div className="min-w-[80px] px-2">
                            <Link href="/">
                            <div className="text-white text-sm sm:text-xl font-bold whitespace-nowrap">
                                IIT.FUN
                            </div>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center justify-center flex-1">
                            <Link href="/about"
                                className={`px-3 py-2 rounded-md ${activeSection === '/about' ? 'bg-white text-black' : 'text-white hover:bg-secondaryBlack'}`}
                                onClick={() => handleSectionClick('/about')}>
                                About
                            </Link>
                            <Link href="/community"
                                className={`px-3 py-2 rounded-md ${activeSection === '/community' ? 'bg-white text-black' : 'text-white hover:bg-secondaryBlack'}`}
                                onClick={() => handleSectionClick('/community')}>
                                Community
                            </Link>
                            <Link href="/leaderboard"
                                className={`px-3 py-2 rounded-md ${activeSection === '/leaderboard' ? 'bg-white text-black' : 'text-white hover:bg-secondaryBlack'}`}
                                onClick={() => handleSectionClick('/leaderboard')}>
                                Leaderboard
                            </Link>
                            <Link href="/contribute"
                                className={`px-3 py-2 rounded-md ${activeSection === '/contribute' ? 'bg-white text-black' : 'text-white hover:bg-secondaryBlack'}`}
                                onClick={() => handleSectionClick('/contribute')}>
                                Start Contributing
                            </Link>
                        </div>
                        <div className='flex md:gap-5 max-md:gap-3'>
                            {session?.status == "authenticated" && (
                                <>
                                    {walletAddress && <p>Wallet: {walletAddress}</p>}
                                    {connected ? (
                                        <button className='text-red-500' onClick={disconnect}>Disconnect Wallet</button>
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
                                        <Avatar>
                                            <AvatarImage src={session?.data?.user?.image ?? "/sponge.gif"} alt="@shadcn" />
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
                        </div>
                        {/* Hamburger - minimal right padding */}
                        <div className="px-2 md:hidden">
                            <button onClick={toggleMenu} className="text-white p-1">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 w-full h-full min-h-screen z-50 bg-black flex items-center justify-center overflow-hidden">
                    <div className="flex flex-col items-center space-y-8">
                        <Link href="/about"
                            className={`px-3 py-2 rounded-md ${activeSection === 'about' ? 'bg-white text-black' : 'text-white'} text-2xl`}
                            onClick={() => handleSectionClick('about')}>
                            About
                        </Link>
                        <Link href="/community"
                            className={`px-3 py-2 rounded-md ${activeSection === 'community' ? 'bg-white text-black' : 'text-white'} text-2xl`}
                            onClick={() => handleSectionClick('community')}>
                            Community
                        </Link>
                        <Link href="/leaderboard"
                            className={`px-3 py-2 rounded-md ${activeSection === 'leaderboard' ? 'bg-white text-black' : 'text-white'} text-2xl`}
                            onClick={() => handleSectionClick('leaderboard')}>
                            Leaderboard
                        </Link>
                        <Link href="/contribute"
                            className={`px-3 py-2 rounded-md ${activeSection === 'contribute' ? 'bg-white text-black' : 'text-white'} text-2xl`}
                            onClick={() => handleSectionClick('contribute')}>
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