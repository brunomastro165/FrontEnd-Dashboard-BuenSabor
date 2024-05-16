import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  data: any;
}

const initialState: InitialState = {
  data: "",
};

const GlobalInitialValues = createSlice({
  name: "GlobalInitialValues",
  initialState,
  reducers: {
    setGlobalInitialValues: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const { setGlobalInitialValues } = GlobalInitialValues.actions;

export default GlobalInitialValues;
