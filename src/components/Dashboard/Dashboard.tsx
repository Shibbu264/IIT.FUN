"use client"
import { useAppSelector } from '@/lib/store/store';
import React from 'react'
import { Button } from '../Ui/Button';




export default function Dashboard() {
    const { user } = useAppSelector(state => state.user)
    function connectDiscord() {
        const state = encodeURIComponent(JSON.stringify({ email: user?.email }));
        const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI as string);
        const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;

        const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=identify&state=${state}`;

        // Redirect user to Discord for authorization
        window.location.href = discordAuthUrl;
    }

    function connectTwitter() {
        const state = encodeURIComponent(JSON.stringify({ email: user?.email })); // Replace user?.email with actual user email
        const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_TWITTER_REDIRECT_URI as string);
        const clientId = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID;
        const scope = encodeURIComponent("tweet.read users.read offline.access");


        const twitterAuthUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}&code_challenge=challenge&code_challenge_method=plain`;

        // Redirect user to Twitter for authorization
        window.location.href = twitterAuthUrl;
    }


    return (
        <div className='flex flex-col items-center mt-8 w-full gap-6'>
            <h1>Dashboard</h1>
            <Button onClick={connectDiscord}>Connect Discord</Button>
            {user?.discord ? <>Discord is connected</> : <>Discord is not connected</>}

            <Button onClick={connectTwitter}>Connect Twitter</Button>
            {user?.twitter ? <>twitter is connected</> : <>twitter is not connected</>}
        </div>
    )
}
