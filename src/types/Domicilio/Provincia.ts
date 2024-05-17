import { IPais } from "./Pais";

export interface IProvincia {
    id: number;
    nombre: string,
    pais: IPais,
    eliminado: boolean,
}