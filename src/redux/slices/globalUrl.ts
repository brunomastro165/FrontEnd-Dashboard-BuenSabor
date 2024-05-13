import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  url: string;
}

const initialState: InitialState = {
  url: "",
};

const GlobalUrl = createSlice({
  name: "GlobalUrl",
  initialState,
  reducers: {
    setGlobalUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
  },
});

export const { setGlobalUrl } = GlobalUrl.actions;

export default GlobalUrl;
