import { protectedRoutes } from "@/lib/protectedRoutes";
import { openDialog } from "@/lib/store/slices/dialogSlice";
import { setUser } from "@/lib/store/slices/userSlice";
import { useAppSelector } from "@/lib/store/store";
import { useWallet } from "@solana/wallet-adapter-react";
import { BellIcon, PanelLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSidebar } from "../Ui/sidebar";
import UserDropdown from "../UserDropdown/UserDropdown";
import Notification from "../Notification/Notification";
import { SocialAccount } from "@prisma/client";
import axiosInstance from "@/lib/axiosInstances/iitFunInstance";
import NFT from "../NFT/NFT";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "../Ui/Avatar";

const AuthGuardProvider = ({ children }: { children: any }) => {
    const { data: session, status } = useSession();
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { user } = useAppSelector(state => state.user);
    const { wallet } = useWallet();
    const { toggleSidebar } = useSidebar()
    const isMobile = useIsMobile()

    function updateToken(provider: "discord" | "twitter") {
        if (!user?.[provider]) return;
        if (!user?.socialAccounts) return;
        const accountIndex = user?.socialAccounts.findIndex((acc: any) => acc.provider === provider);
        if (accountIndex === -1) return;

        const account = user?.socialAccounts[accountIndex];

        if (account?.expiresAt && new Date(account.expiresAt).getTime() < Date.now()) {
            axiosInstance("/api/refresh-token-" + provider, {
                params: {
                    refreshToken: account?.refreshToken
                },
                headers: { "X-Custom-Error": "none" }
            })
                .then(res => res.data)
                .then((data: { accessToken: string; expiresAt: string }) => {
                    if (data?.accessToken && data?.expiresAt) {
                        const updatedSocialAccounts: any = [...(user.socialAccounts ?? [])];
                        updatedSocialAccounts[accountIndex] = {
                            ...account,
                            accessToken: data.accessToken,
                            expiresAt: new Date(data.expiresAt),
                            username: account.username ?? null,
                            profileUrl: account.profileUrl ?? null, // Ensure it's always string | null
                            refreshToken: account.refreshToken ?? null, // Ensure it's always string | null
                        };

                        // Dispatch user update
                        dispatch(setUser({ ...user, socialAccounts: updatedSocialAccounts }));
                    }
                })
                .catch(error => console.error(`Error refreshing ${provider} token:`, error));
        }
    }


    useEffect(() => {
        if (!user && status === "loading") return;
        if (status === "unauthenticated") {
            if (protectedRoutes.includes(pathname)) {
                dispatch(openDialog({
                    type: "login", data: {
                        closable: false,
                        route: pathname
                    }
                }));
            }
            wallet?.adapter.disconnect();
            return;
        }

        if (status == "authenticated") {
            if (!user) {
                fetch('/api/me', {
                    method: 'POST', // Use 'POST' if you want to send data in the body
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: session?.user?.email }), // Include the email in the request body
                })
                    .then(response => response.json())
                    .then(data => {
                        dispatch(setUser(data))
                    })
                    .catch(error => {
                        console.error('Error:', error); // Handle any errors
                    });
            }
        }
        if (user) {
            if (user.discord) {
                updateToken("discord")
            }
            if (user.twitter) {
                updateToken("twitter")
            }
            if (!(user?.username)) {
                dispatch(openDialog(
                    {
                        type: "addUsername",
                        data: {
                            closable: false
                        }
                    }
                ))
            }
        }
    }, [session, status, dispatch, pathname, user]);

    if (status === "unauthenticated" && protectedRoutes.includes(pathname)) {
        return null;
    }


    return <div className="w-full min-h-[100vh] min-h-[100dvh]">
        {status == "authenticated" && <div className="w-[90%] max-md:w-full max-md:bg-primaryBlack z-40 sticky top-0  flex items-center justify-start p-4 md:py-6 h-16 md:h-24">
            <PanelLeft onClick={toggleSidebar} className='border-secondaryGreen max-md:w-9 max-md:h-9  md:hidden border-2' />
            <div className="flex bg-primaryBlack py-2  px-6 rounded-md ml-auto md:gap-8 gap-4 items-center">
                <Notification />
                <NFT />
                {!isMobile && <UserDropdown />}
            </div>
        </div>}
        {children}
    </div>;
};

export default AuthGuardProvider;
