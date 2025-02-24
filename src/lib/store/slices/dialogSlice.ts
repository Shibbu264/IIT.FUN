import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for the state
interface DialogState {
  isOpen: boolean;
  type: string | null;
}

const dialogSlice = createSlice({
  name: 'dialog',
  initialState: {
    isOpen: false,
    type: null
  } as DialogState, // Specify the type for initialState
  reducers: {
    toggleDialog(state: DialogState) {
      state.isOpen = !state.isOpen;
    },
    openDialog(state: DialogState, action: PayloadAction<{ type: any }>) {
      state.isOpen = true;
      state.type = action.payload.type;
    },
    closeDialog(state: DialogState) {
      state.isOpen = false;
    },
  },
});

export const { toggleDialog, openDialog, closeDialog } = dialogSlice.actions;
export default dialogSlice.reducer; 