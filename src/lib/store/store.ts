import { configureStore } from '@reduxjs/toolkit';
import dialogReducer from './slices/dialogSlice'; // Import the dialog slice reducer

const store = configureStore({
  reducer: {
    dialog: dialogReducer, // Add the dialog reducer to the store
  },
});

export default store; // Export the configured store
