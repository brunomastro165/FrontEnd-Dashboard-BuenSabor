import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  logged: boolean;
}

const initialState: InitialState = {
  logged: false,
};

const GlobalLogged = createSlice({
  name: "GlobalLogged",
  initialState,
  reducers: {
    setLogged: (state, action: PayloadAction<boolean>) => {
      state.logged = action.payload;
    },
  },
});

export const { setLogged } = GlobalLogged.actions;

export default GlobalLogged;
