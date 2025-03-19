"use client"
import { Provider } from "react-redux";
import store from "@/lib/store/store";
import GlobalDialogWrapper from "@/components/GlobalDialogWrapper/GlobalDialogWrapper";
import Navbar from "@/components/Ui/navbar";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { CoinbaseWalletAdapter, PhantomWalletAdapter, SolflareWalletAdapter, TorusWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import AuthGuardProvider from "./AuthGuard";
import { useMemo } from "react";
import { UmiProvider } from "../NFTUtils/UmiProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppSidebar } from "../Ui/AppSideBar";
import { useSession } from "next-auth/react";
import { SidebarProvider } from "../Ui/sidebar";




export const queryClient = new QueryClient();

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const network = clusterApiUrl("devnet");
    const session = useSession();
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new TorusWalletAdapter(),
            new CoinbaseWalletAdapter(),
        ],
        [network]
    );
    let endpoint = "https://api.devnet.solana.com";
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ConnectionProvider endpoint={network}>
                    <WalletProvider wallets={wallets} autoConnect>
                        <WalletModalProvider>
                            <UmiProvider endpoint={endpoint}>
                                <GlobalDialogWrapper>
                                    <SidebarProvider>
                                        {session?.status == "authenticated" &&
                                            <AppSidebar />}
                                        {session?.status == "unauthenticated" &&
                                            <Navbar />}
                                        <AuthGuardProvider>
                                            {children}
                                        </AuthGuardProvider>
                                    </SidebarProvider>
                                </GlobalDialogWrapper>
                            </UmiProvider>
                        </WalletModalProvider>
                    </WalletProvider>
                </ConnectionProvider>
            </QueryClientProvider>
        </Provider>
    );
};

export default GlobalProvider;