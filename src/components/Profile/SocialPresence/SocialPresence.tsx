import React from "react";
import { useAppSelector } from "@/lib/store/store";
import { Twitter, Send, Github } from "lucide-react";
import SocialBox from "./SocialBox";



export default function SocialPresence() {
  const user = useAppSelector(state => state.user.user); // Get user from Redux

  const getVariant = (provider: string) => {
    if (!user) return "not-connected";
    
    const providerKey = provider.toLowerCase(); // Convert title to lowercase key
    const account = user.SocialAccount?.find((acc: any) => acc.provider === providerKey);
    
    if (user.SocialAccount?.some(acc => acc.provider === providerKey)) {
      const currentTime = Date.now();
      if (account?.expiresAt && new Date(account.expiresAt).getTime() < currentTime) {
        return "active-not-connected";
      }
      return "connected";
    }
    
    return "not-connected";
  };
  const nonce = Math.random().toString(36).substr(2);

  const socialPlatforms = [
    {
      title: "Twitter",
      description: "Follow us on Twitter to stay updated with the latest news.",
      points: 50,
      buttonText: null,
      icon: <Twitter size={20} className="text-primaryWhite" />,
    },
    {
      title: "Discord",
      description: "Join our Discord community and engage with other members.",
      points: 50,
      buttonText: null,
      icon: <Github size={20} className="text-primaryWhite" />,
    },
    {
      title: "Telegram",
      description: "Connect your Telegram and verify your membership in our OG channel.",
      points: 50,
      buttonText: null,
      icon: <Send size={20} className="text-primaryWhite" />,
      onClick:()=>window.open("https://oauth.telegram.org/auth?bot_id=IIT_FUN_bot&scope=USER_INFO&public_key=MIIBCgKCAQEAyMEdY1aR+sCR3ZSJrtztKTKqigvO/vBfqACJLZtS7QMgCGXJ6XIR&nonce="+nonce)
    },
  ];

  return (
    <div className="flex flex-wrap w-fit gap-4 md:gap-8">
      {socialPlatforms.map((platform, index) => (
        <SocialBox 
          key={index} 
          {...platform} 
          variant={getVariant(platform.title)} // Dynamic variant
        />
      ))}
    </div>
  );
}
