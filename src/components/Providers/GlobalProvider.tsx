"use client"
import { Provider } from "react-redux";
import store from "@/lib/store/store";
import { SessionProvider } from "next-auth/react";
import GlobalDialogWrapper from "@/components/GlobalDialogWrapper/GlobalDialogWrapper";
import Navbar from "@/components/Ui/navbar";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import AuthGuardProvider from "./AuthGuard";




const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const wallets = [new PhantomWalletAdapter()];
    const network = clusterApiUrl("devnet");
    return (
        <Provider store={store}>
            <SessionProvider>
                <GlobalDialogWrapper>
                    <ConnectionProvider endpoint={network}>
                        <WalletProvider wallets={wallets} autoConnect>
                            <WalletModalProvider>
                                <div className="flex  flex-col items-center justify-center">
                                    <Navbar />
                                    <div className="mb-16" />
                                    <AuthGuardProvider>
                                        {children}
                                    </AuthGuardProvider>
                                </div>
                            </WalletModalProvider>
                        </WalletProvider>
                    </ConnectionProvider>
                </GlobalDialogWrapper>
            </SessionProvider>
        </Provider>
    );
};

export default GlobalProvider;