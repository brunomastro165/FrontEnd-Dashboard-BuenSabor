import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  idEmpresa: string | undefined;
}

const initialState: InitialState = {
  idEmpresa: "",
};

const GlobalIdEmpresa = createSlice({
  name: "GlobalIdEmpresa",
  initialState,
  reducers: {
    setIdEmpresa: (state, action: PayloadAction<string | undefined>) => {
      state.idEmpresa = action.payload;
    },
  },
});

export const { setIdEmpresa } = GlobalIdEmpresa.actions;

export default GlobalIdEmpresa;
