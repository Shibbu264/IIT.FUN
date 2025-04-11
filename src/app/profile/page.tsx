import { Metadata } from 'next';
import { redirect } from 'next/navigation'
import React from 'react'

export const generateMetadata = (): Metadata => {
  return {
    title: "Your Profile - IIT.fun",
    description: "View and edit your profile on IIT.fun.",
    openGraph: {
      type: "profile",
      url: "https://iit.fun/profile",
      title: "Your Profile - IIT.fun",
      description: "View your profile and badge",
      siteName: "IIT.FUN",
      images: [
        {
          url: "/profile-meta.jpeg",
          width: 1200,
          height: 630,
          alt: "Your Profile",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Your Profile - IIT.fun",
      description: "View and edit your profile on IIT.fun.",
      images: ["/profile-meta.jpeg"],
    },
  };
};

export default function page() {

  return (
   redirect("/profile/me")
  )
}
