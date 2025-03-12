import React from "react";
import { useAppSelector } from "@/lib/store/store";
import { Twitter, Send, Github } from "lucide-react";
import SocialBox from "./SocialBox";
import { connectDiscord, connectTwitter } from "@/lib/services/socialConnect";
import { FaBuilding, FaDiscord } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { openDialog } from "@/lib/store/slices/dialogSlice";



export default function SocialPresence() {
  const user = useAppSelector(state => state.user.user); // Get user from Redux
  const dispatch = useDispatch()

  const getVariant = (provider: string) => {
    if (provider == "Institute Id") {
      if (user?.InstiId) {
        return "connected"
      }
      else {
        return "not-connected"
      }
    }
    if (!user) return "not-connected";
    if (provider == "Telegram") {
      if (user?.telegram) {
        return "connected";
      }
      else {
        return "not-connected"
      }
    }


    const providerKey = provider.toLowerCase(); // Convert title to lowercase key
    const account = user.socialAccounts?.find((acc: any) => acc.provider === providerKey);

    if (user.socialAccounts?.some(acc => acc.provider === providerKey)) {
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
      title: "Institute Id",
      description: "Verify your Institute Id to get 50 points",
      points: 50,
      buttonText: user?.InstiId ? "Verified" : "Verify",
      icon: <FaBuilding />,
      onClick: () => {
        dispatch(openDialog({
          type: "verifyEmail"
        }))
      }
    },
    {
      title: "Twitter",
      description: "Follow us on Twitter to stay updated with the latest news.",
      points: 50,
      buttonText: null,
      icon: <Twitter size={20} className="text-primaryWhite" />,
      onClick: () => connectTwitter(user)
    },
    {
      title: "Discord",
      description: "Join our Discord community and engage with other members.",
      points: 50,
      buttonText: null,
      icon: <FaDiscord size={20} className="text-primaryWhite" />,
      onClick: () => connectDiscord(user)
    },
    {
      title: "Telegram",
      description: "Join IIT.FUN channel and verify your membership .",
      points: 50,
      buttonText: user?.telegram ? "Joined Telegram" : "Join Telegram !",
      icon: <Send size={20} className="text-primaryWhite" />,
      onClick: () => dispatch(openDialog({ type: "joinTelegram" }))
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 md:gap-3">
      <h1 className="md:text-2xl text-lg lg:text-3xl">
      Social Presence
      </h1>
      <p className="md:text-lg text-primaryGreen">Link your profiles from established social media to earn points and airdrops.</p>
      </div>
    <div className="flex flex-wrap max-md:justify-center w-fit gap-4 md:gap-8">
      {socialPlatforms.map((platform, index) => (
        <SocialBox
          key={index}
          {...platform}
          variant={getVariant(platform.title)} // Dynamic variant
        />
      ))}
    </div>
    </div>
  );
}
