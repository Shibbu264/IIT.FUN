import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
    id:number;
    name: string;
    email: string;
    image: string;
    wallet: any;
    socialAccounts?: SocialAccount[];
    InstiId: boolean;
    discord: boolean;
    twitter: boolean;
    telegram:boolean;
    username:string|null;
    InstituteName?:string|null;
    telegramId?:string;
    points:number;
    bounties:number;
    communityCalls:number;
}

export interface SocialAccount {
    id: number;
    provider: string;
    providerId: string;
    username?: string | null;
    profileUrl?: string | null;
    userId: number;
    createdAt: Date;
    accessToken: string;
    refreshToken?: string | null;
    expiresAt?: Date | null;
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null as User | null,
        nfts:[] as any[]
    },
    reducers: {
        setUser(state, action: PayloadAction<any>) {
            state.user = action.payload;
        },
        updateWallet(state, action) {
            if (state.user?.wallet) {
                state.user.wallet = action.payload
            }
        },
        clearUser(state) {
            state.user = null;
        },
        setNFT(state,action){
            state.nfts=action.payload
        }
    },
});

// Export actions
export const { setUser, clearUser,setNFT } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
