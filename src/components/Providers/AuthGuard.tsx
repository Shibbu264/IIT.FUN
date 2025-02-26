import { protectedRoutes } from "@/lib/protectedRoutes";
import { openDialog } from "@/lib/store/slices/dialogSlice";
import { useAppSelector } from "@/lib/store/store";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AuthGuardProvider = ({ children }: { children: any }) => {
    const { data: session, status } = useSession();
    const dispatch = useDispatch();
    const pathname = usePathname();
    const user = useAppSelector(state => state.user);

    useEffect(() => {
        if (!user && status === "loading") return;
        if (status === "unauthenticated" && protectedRoutes.includes(pathname)) {
            dispatch(openDialog({ type: "login" }));
        }
    }, [session, status, dispatch, pathname, user]);

    if (status === "unauthenticated" && protectedRoutes.includes(pathname)) {
        return null;
    }

    return <>{children}</>;
};

export default AuthGuardProvider;
