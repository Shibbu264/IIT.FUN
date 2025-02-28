import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/Ui/Sonner";
import { Inria_Sans } from 'next/font/google';
import GlobalProvider from "@/components/Providers/GlobalProvider";
import Head from "next/head";
import { Analytics } from '@vercel/analytics/next';


const inriaSans = Inria_Sans({ subsets: ['latin'], weight: ['700'],variable: "--font-inria-sans", });


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: `IIT.fun - The Talent Layer of IITians in Web 3`,
  description:
    'Got an idea? Send a proposal and get a grant. Have a skill? Start contributing to projects and earn rewards.',
  openGraph: {
    type: 'website',
    url: 'https://iit.fun',
    title: `Join the revolution`,
    description: 'Shaping tomorrow’s innovators, one bounty at a time.',
    siteName: `IIT.FUN`,
    images: [
      {
        url: '/iit.jpeg',
        width: 1200,
        height: 630,
        alt: `Join the fun`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `IIT.fun - The Talent Layer of IITians in Web 3`,
    description: 'Shaping tomorrow’s innovators, one class at a time.',
    images: ['/iit.jpeg'],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inria+Sans:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <meta property="og:title" content="IIT.fun - The Talent Layer of IITians in Web 3" />
        <meta property="og:description" content="Got an idea? Send a proposal and get a grant. Have a skill? Start contributing to projects and earn rewards." />
        <meta property="og:image" content="/giphy 63.jpeg" />
        <meta property="og:url" content="https://iit.fun" />
        <meta property="og:type" content="website" />
      </Head>
      <body
        className={`${inriaSans.variable} relative antialiased`}
      >
        <GlobalProvider>
            {children}
            <Toaster />
        </GlobalProvider>
        <Analytics/>
      </body>
    </html >
  );
}
