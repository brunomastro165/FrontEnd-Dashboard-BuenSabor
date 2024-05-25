import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  mostrar: boolean;
}

const initialState: InitialState = {
    mostrar: true,
};

const MostrarCategoriaSelector = createSlice({
  name: "MostrarCategoriaSelector",
  initialState,
  reducers: {
    setCategoriaSelector: (state, action: PayloadAction<boolean>) => {
      state.mostrar = action.payload;
    },
  },
});

export const { setCategoriaSelector } = MostrarCategoriaSelector.actions;

export default MostrarCategoriaSelector;
