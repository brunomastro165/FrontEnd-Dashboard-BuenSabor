import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUnidadMedida } from "../../types/UnidadMedida";
import { fetchData } from "../../components/api/Fetch";

interface InitialState {
    UnidadesMedida: IUnidadMedida[];
}

// const unidades = async () => {
//     const res: IUnidadMedida[] = await fetchData('http://localhost:8081/UnidadMedida')
//     return res;
// }

const initialState: InitialState = {
    UnidadesMedida: [],
};

const UnidadesMedida = createSlice({
    name: "UnidadesMedida",
    initialState,
    reducers: {
        setUnidades: (state, action: PayloadAction<IUnidadMedida[]>) => {
            state.UnidadesMedida = action.payload;
        },
    },
});

export const { setUnidades } = UnidadesMedida.actions;

export default UnidadesMedida;
