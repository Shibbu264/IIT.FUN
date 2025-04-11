import { configureStore } from '@reduxjs/toolkit';
import dialogReducer from './slices/dialogSlice'; // Import the dialog slice reducer
import userSlice from "./slices/userSlice"
import searchSlice from "./slices/searchSlice"
import { TypedUseSelectorHook, useSelector } from 'react-redux';
const store = configureStore({
  reducer: {
    dialog: dialogReducer,
    user:userSlice ,
    searchUser:searchSlice/// Add the dialog reducer to the store
  },
});
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector; 
export default store; // Export the configured store
