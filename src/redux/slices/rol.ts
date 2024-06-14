import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  rol: string;
}

const initialState: InitialState = {
    rol: "",
};

const GlobalRol = createSlice({
  name: "GlobalRol",
  initialState,
  reducers: {
    setRol: (state, action: PayloadAction<string>) => {
      state.rol = action.payload;
    },
  },
});

export const { setRol } = GlobalRol.actions;

export default GlobalRol;
