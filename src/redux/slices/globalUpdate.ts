import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  updated: boolean;
}

const initialState: InitialState = {
  updated: false,
};

const GlobalUpdated = createSlice({
  name: "GlobalUpdated",
  initialState,
  reducers: {
    setGlobalUpdated: (state, action: PayloadAction<boolean>) => {
      state.updated = action.payload;
    },
  },
});

export const { setGlobalUpdated } = GlobalUpdated.actions;

export default GlobalUpdated;
