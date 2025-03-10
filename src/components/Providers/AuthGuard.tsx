import { protectedRoutes } from "@/lib/protectedRoutes";
import { openDialog } from "@/lib/store/slices/dialogSlice";
import { setUser } from "@/lib/store/slices/userSlice";
import { useAppSelector } from "@/lib/store/store";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AuthGuardProvider = ({ children }: { children: any }) => {
    const { data: session, status } = useSession();
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { user } = useAppSelector(state => state.user);
    const { wallet } = useWallet()

    function updateTokenDiscord(){
        
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
           if(user.discord){

           }
           if(user.twitter){

           }
        }
    }, [session, status, dispatch, pathname, user]);

    if (status === "unauthenticated" && protectedRoutes.includes(pathname)) {
        return null;
    }

    return <div className="w-full">{children}</div>;
};

export default AuthGuardProvider;
