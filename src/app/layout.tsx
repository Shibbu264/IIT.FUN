import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import store from "@/lib/store/store";
import { SessionProvider } from "next-auth/react";
import GlobalDialogWrapper from "@/components/GlobalDialogWrapper/GlobalDialogWrapper";
import Navbar from "@/components/Ui/navbar";
import { Toaster } from "@/components/Ui/Sonner";
import { Button } from "@/components/Ui/Button";
import { Inria_Sans } from 'next/font/google';
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import GlobalProvider from "@/components/Providers/GlobalProvider";


const inriaSans = Inria_Sans({ subsets: ['latin'], weight: ['700'] });


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative antialiased`}
      >
        <GlobalProvider>
            {children}
            <Toaster />
        </GlobalProvider>
      </body>
    </html >
  );
}
