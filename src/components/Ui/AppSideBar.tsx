import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarTrigger,
} from "@/components/Ui/sidebar"
import { useAppSelector } from "@/lib/store/store";
import { useWallet } from "@solana/wallet-adapter-react";
import { signOut, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useIsMobile } from "@/hooks/use-mobile";
import { Trophy, Users, UserCircle, MoreHorizontal, Gift, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./Button";

export function AppSidebar() {
    const dispatch = useDispatch();
    const isMobile = useIsMobile();
    const pathname = usePathname();

    const navigation = [
        {
            name: "Contribute",
            href: "/contribute",
            icon: Gift,
        },
        {
            name: "Community Calls",
            href: "/community-calls",
            icon: Users,
        },
        {
            name: "Leaderboard",
            href: "/leaderboard",
            icon: Trophy,
        },
        {
            name: "Profile",
            href: "/profile/me",
            icon: UserCircle,
        },
    ];

    return (
        <Sidebar className="!h-full" defaultValue="open" collapsible={isMobile ? "offcanvas" : "icon"}>
            <SidebarHeader className="flex md:h-24 h-16 !flex-row items-center justify-between">
                <img src="/iitfun.jpeg" className="lg:w-36 w-24 group-data-[collapsible=icon]:hidden"/>
                <SidebarTrigger />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="gap-4">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex md:h-[60px] items-center gap-3 px-4 py-2 rounded-lg transition-colors ${pathname === item.href
                                ? "glass-bg"
                                : "hover:border-secondaryGreen hover:border"
                                }`}
                        >
                            <item.icon className="w-8 h-8 group-data-[collapsible=icon]:mx-auto min-w-8" />
                            <span className="group-data-[collapsible=icon]:hidden md:text-xl ">
                                {item.name}
                            </span>
                        </Link>
                    ))}
                    <div className={"!flex md:h-[60px] items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:border-secondaryGreen hover:border"
                    }
                        onClick={() => signOut().then(() => {
                            window.location.reload();
                            toast("Signed out successfully !")
                        })}>
                        <LogOutIcon color='red' />
                        <span className="group-data-[collapsible=icon]:hidden md:text-xl ">Logout</span>

                    </div>
                </SidebarGroup>
                {/* <SidebarFooter className="mt-auto cursor-pointer text-center flex md:h-[60px] items-center gap-3 px-4 py-2 rounded-lg transition-colors">
                    <Button size={isMobile?"sm":"default"}>Suggest Improvements ?</Button>
                </SidebarFooter> */}
            </SidebarContent>
        </Sidebar>
    )
}
