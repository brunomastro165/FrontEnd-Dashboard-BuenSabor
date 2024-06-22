import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
    modificarStock: boolean;
}

const initialState: InitialState = {
    modificarStock: true,
};

const ModificarStock = createSlice({
    name: "ModificarStock",
    initialState,
    reducers: {
        setModificarStock: (state, action: PayloadAction<boolean>) => {
            state.modificarStock = action.payload;
        },
    },
});

export const { setModificarStock } = ModificarStock.actions;

export default ModificarStock;
