import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  selected: string;
  id: number;
}

const initialState: InitialState = {
  selected: "",
  id: 0,
};

const GlobalCategory = createSlice({
  name: "GlobalCategory",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<{ selected: string; id: number }>) => {
      state.selected = action.payload.selected;
      state.id = action.payload.id;
    },
    setSelected: (state, action: PayloadAction<string>) => {
      state.selected = action.payload;
    },
    setId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
  },
});

export const { setCategory, setSelected, setId } = GlobalCategory.actions;

export default GlobalCategory;