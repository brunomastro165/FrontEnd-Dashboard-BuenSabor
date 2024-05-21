import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  selected: string;
}

const initialState: InitialState = {
  selected: "",
};

const GlobalCategory = createSlice({
  name: "GlobalCategory",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.selected = action.payload;
    },
  },
});

export const { setCategory } = GlobalCategory.actions;

export default GlobalCategory;
