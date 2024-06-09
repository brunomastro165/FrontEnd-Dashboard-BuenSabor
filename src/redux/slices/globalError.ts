import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  error: boolean;
  text: string;
}

const initialState: InitialState = {
  error: false,
  text: '',
};

const GlobalError = createSlice({
  name: "GlobalError",
  initialState,
  reducers: {
    setGlobalError: (state, action: PayloadAction<{ error: boolean; text: string }>) => {
      state.error = action.payload.error;
      state.text = action.payload.text;
    },
  },
});

export const { setGlobalError } = GlobalError.actions;

export default GlobalError;