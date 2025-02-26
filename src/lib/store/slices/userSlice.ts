import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    name: string;
    email: string;
    image: string;
    wallet: any; // Adjust type as necessary
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
        updateWallet(state,action){
         if(state.user?.wallet){
            state.user.wallet=action.payload
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
