import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './userSlice';


const searchUserSlice = createSlice({
    name: 'searchUser',
    initialState: {
        user: null as User | null,
        nfts:null as any[]|null
    },
    reducers: {
        setSearchUser(state, action: PayloadAction<any>) {
            state.user = action.payload;
        },
        clearSearchUser(state) {
            state.user = null;
        },
        setSearchUserNFT(state,action){
            state.nfts=action.payload
        }
    },
});

// Export actions
export const { setSearchUser,clearSearchUser,setSearchUserNFT } = searchUserSlice.actions;

// Export reducer
export default searchUserSlice.reducer;
