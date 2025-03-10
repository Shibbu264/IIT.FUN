import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarTrigger,
} from "@/components/Ui/sidebar"
import { useAppSelector } from "@/lib/store/store";
import { useWallet } from "@solana/wallet-adapter-react";
import { signOut, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { Button } from "./Button";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { setUser } from "@/lib/store/slices/userSlice";
import NFTButton from "../NFTbutton/NFTButton";
import { openDialog } from "@/lib/store/slices/dialogSlice";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./Dropdown";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

export function AppSidebar() {
    const dispatch = useDispatch();
    const session = useSession();
    const { publicKey, select, disconnect, connected, wallets, wallet } = useWallet();
    const { user } = useAppSelector(state => state.user)
    const isMobile=useIsMobile()
    return (
        <Sidebar defaultValue="open" collapsible={isMobile?"offcanvas":"icon"}>
            <SidebarHeader className="flex !flex-row items-center justify-between">
                <span className="text-xl group-data-[collapsible=icon]:hidden">IIT.FUN</span>
                <SidebarTrigger />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <div className='flex flex-col items-center md:gap-7 max-md:gap-4'>
                        {session?.status == "authenticated" && (
                            <>

                                {connected ? (
                                    <div className='flex gap-3 items-center'>
                                        <Button onClick={() => dispatch(openDialog({
                                            type: 'nftModal',
                                            data: {
                                                address: wallet?.adapter.publicKey?.toString()
                                            }
                                        }))} variant="outline">My NFTs</Button>
                                        <Popover>
                                            <PopoverTrigger className='relative'>
                                                <p className='text-primaryGreen md:text-sm max-md:text-[10px] absolute max-md:-top-2 -top-4 -right-4'>Mint!</p>
                                                <Avatar>

                                                    <AvatarImage src={wallet?.adapter?.icon} alt="@shadcn" />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                            </PopoverTrigger>
                                            <PopoverContent className='bg-black md:p-6 max-md:p-4'>
                                                <div className='max-md:text-lg text-xl'>My Wallets</div>
                                                <div className='!cursor-pointer rounded-xl flex max-md:flex-col gap-3 md:items-center'
                                                >
                                                    <span className='max-md:max-w-[90%] whitespace-normal overflow-x-auto'>{user?.wallet}</span>
                                                    <Button className='mr-auto' onClick={() => disconnect().finally(() => {
                                                        dispatch(setUser({ ...user, wallet: null }))
                                                    })} variant="destructive"> Disconnect </Button></div>
                                                <div className='bg-gray-700 h-px ml-2 mb-2 w-[90%]' />
                                                <div>
                                                    <NFTButton />
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                ) : (
                                    <button className='text-secondaryGreen' onClick={() => dispatch(openDialog({
                                        type: 'wallet'
                                    }))}>Connect Wallet</button>
                                )}
                            </>
                        )}
                    </div>
                </SidebarGroup>
                <SidebarGroup>
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
                    </DropdownMenu>
                </SidebarGroup>

            </SidebarContent>
        </Sidebar>
    )
}
