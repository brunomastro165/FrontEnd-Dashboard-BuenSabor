import { IProvincia } from "./Provincia";

export interface ILocalidad {
    id: number,
    nombre: string,
    eliminado: boolean,
    provincia: IProvincia,
}