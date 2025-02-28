"use client"
import { Provider } from "react-redux";
import store from "@/lib/store/store";
import { SessionProvider } from "next-auth/react";
import GlobalDialogWrapper from "@/components/GlobalDialogWrapper/GlobalDialogWrapper";
import Navbar from "@/components/Ui/navbar";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { CoinbaseWalletAdapter, PhantomWalletAdapter, SolflareWalletAdapter, TorusWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import AuthGuardProvider from "./AuthGuard";
import { useMemo } from "react";
import { UmiProvider } from "../NFTUtils/UmiProvider";



const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const network = clusterApiUrl("devnet");
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
            <SessionProvider>
                <ConnectionProvider endpoint={network}>
                    <WalletProvider wallets={wallets} autoConnect>
                        <WalletModalProvider>
                            <UmiProvider endpoint={endpoint}>
                                <GlobalDialogWrapper>
                                    <div className="flex  flex-col items-center w-full justify-center">
                                        <Navbar />
                                        <div className="mb-16" />
                                        <AuthGuardProvider>
                                            {children}
                                        </AuthGuardProvider>
                                    </div>
                                </GlobalDialogWrapper>
                            </UmiProvider>
                        </WalletModalProvider>
                    </WalletProvider>
                </ConnectionProvider>
            </SessionProvider>
        </Provider>
    );
};

export default GlobalProvider;