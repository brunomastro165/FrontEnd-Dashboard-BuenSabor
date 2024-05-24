import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  borrado: boolean;
}

const initialState: InitialState = {
  borrado: false,
};

const GlobalBorrados = createSlice({
  name: "GlobalBorrados",
  initialState,
  reducers: {
    setBorrado: (state, action: PayloadAction<boolean>) => {
      state.borrado = action.payload;
    },
  },
});

export const { setBorrado } = GlobalBorrados.actions;

export default GlobalBorrados;
