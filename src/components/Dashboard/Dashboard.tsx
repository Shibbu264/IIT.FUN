"use client"
import { useAppSelector } from '@/lib/store/store';
import React from 'react'
import { Button } from '../Ui/Button';

export default function Dashboard() {
    const { user } = useAppSelector(state => state.user)
    console.log(user?.email)
    function connectDiscord() {
        const state = encodeURIComponent(JSON.stringify({ email: user?.email }));
        const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI as string);
        const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;

        const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=identify&state=${state}`;

        // Redirect user to Discord for authorization
        window.location.href = discordAuthUrl;
    }

    return (
        <div className='mt-12 flex flex-col gap-6'>
            <h1>Dashboard</h1>
            <Button onClick={connectDiscord}>Connect Discord</Button>
            {user?.discord ? <>Discord is connected</> : <>Discord is not connected</>}
        </div>
    )
}
