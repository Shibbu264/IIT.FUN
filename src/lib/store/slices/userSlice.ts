import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    name: string;
    email: string;
    image: string;
    wallet: any;
    socialAccounts?: SocialAccount[];
    instiId: boolean;
    discord: boolean;
    twitter: boolean
}

interface SocialAccount {
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
    },
});

// Export actions
export const { setUser, clearUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
