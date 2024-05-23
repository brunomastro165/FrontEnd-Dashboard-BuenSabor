import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  esInsumo: boolean;
}

const initialState: InitialState = {
  esInsumo: true,
};

const GlobalEsInsumo = createSlice({
  name: "GlobalEsInsumo",
  initialState,
  reducers: {
    setEsInsumo: (state, action: PayloadAction<boolean>) => {
      state.esInsumo = action.payload;
    },
  },
});

export const { setEsInsumo } = GlobalEsInsumo.actions;

export default GlobalEsInsumo;
