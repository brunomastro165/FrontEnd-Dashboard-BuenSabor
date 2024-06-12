import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IEmpleado } from "../../types/Empleado";

interface InitialState {
  empleado: IEmpleado;
}

const initialState: InitialState = {
  empleado: {
    apellido: "",
    domicilio: {
      calle: "",
      cp: 0,
      eliminado: false,
      id: 0,
      idLocalidad: 0,
      nombre: "",
      nroDpto: 0,
      numero: 0,
      piso: 0,
    },
    eliminado: false,
    email: "",
    id: 0,
    nombre: "",
    sucursal: {
      domicilio: {
        calle: "",
        cp: 0,
        eliminado: false,
        id: 0,
        idLocalidad: 0,
        nombre: "",
        nroDpto: 0,
        numero: 0,
        piso: 0,
      },
      eliminado: false,
      esCasaMatriz: false,
      horarioApertura: "",
      horarioCierre: "",
      id: 0,
      idEmpresa: 0,
      imagenes: [],
      nombre: "",
    },
    telefono: "",
    tipoEmpleado: "",
    usuario: { eliminado: false, id: 0, userName: "" },
  },
};

const GlobalEmpleado = createSlice({
  name: "GlobalEmpleado",
  initialState,
  reducers: {
    setGlobalEmpleado: (
      state,
      action: PayloadAction<{ empleado: IEmpleado }>
    ) => {
      state.empleado = action.payload.empleado;
    },
  },
});

export const { setGlobalEmpleado } = GlobalEmpleado.actions;

export default GlobalEmpleado;
