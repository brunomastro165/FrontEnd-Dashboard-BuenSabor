import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  search: string;
}

const initialState: InitialState = {
  search: "",
};

const GlobalSearch = createSlice({
  name: "GlboalSearch",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = GlobalSearch.actions;

export default GlobalSearch;
