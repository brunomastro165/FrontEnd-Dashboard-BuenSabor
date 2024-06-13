import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  idPaginador: number;
}

const initialState: InitialState = {
  idPaginador: 1,
};

const GlobalIdPaginador = createSlice({
  name: "GlobalIdPaginador",
  initialState,
  reducers: {
    setIdPaginador: (state, action: PayloadAction<number>) => {
      state.idPaginador = action.payload;
    },
  },
});

export const { setIdPaginador } = GlobalIdPaginador.actions;

export default GlobalIdPaginador;
