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
import { useIsMobile } from "@/hooks/use-mobile";
import { Trophy, Users, UserCircle, MoreHorizontal, Gift } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
            href: "/community",
            icon: Users,
        },
        {
            name: "Leaderboard",
            href: "/leaderboard",
            icon: Trophy,
        },
        {
            name: "Profile",
            href: "/profile",
            icon: UserCircle,
        },
        {
            name: "More",
            href: "/more",
            icon: MoreHorizontal,
        },
    ];

    return (
        <Sidebar defaultValue="open" collapsible={isMobile ? "offcanvas" : "icon"}>
            <SidebarHeader className="flex md:h-24 h-16 !flex-row items-center justify-between">
                <span className="text-xl group-data-[collapsible=icon]:hidden">IIT.FUN</span>
                <SidebarTrigger />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="gap-4">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex md:h-[60px] items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                                pathname === item.href
                                ? "bg-primaryGreen text-primaryBlack"
                                : "hover:border-secondaryGreen hover:border"
                            }`}
                        >
                            <item.icon className="w-8 h-8 group-data-[collapsible=icon]:mx-auto min-w-8" />
                            <span className="group-data-[collapsible=icon]:hidden md:text-xl text-lg">
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
