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

const AuthGuardProvider = ({ children }: { children: any }) => {
    const { data: session, status } = useSession();
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { user } = useAppSelector(state => state.user);
    const { wallet } = useWallet()

    function updateTokenDiscord() {

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

            }
            if (user.twitter) {

            }
        }
    }, [session, status, dispatch, pathname, user]);

    if (status === "unauthenticated" && protectedRoutes.includes(pathname)) {
        return null;
    }
    const { toggleSidebar } = useSidebar()

    return <div className="w-full">
        {status == "authenticated" && <div className="w-[90%]  flex items-center justify-start p-4 md:py-6 h-16 md:h-24">
            <PanelLeft onClick={toggleSidebar} width={24} height={24} className="h-6 w-6 md:hidden" />
            <div className="flex ml-auto md:gap-8 gap-4 items-center">
            <Notification/>
            <UserDropdown/>
            </div>
        </div>}
        {children}
    </div>;
};

export default AuthGuardProvider;
