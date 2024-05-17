import { ILocalidad } from "./Localidad"

export interface IDomicilio {
    id: number,
    nombre: string
    eliminado: boolean,
    calle: string,
    numero: number,
    cp: number,
    piso: number,
    nroDpto: number,
    idLocalidad: number,
}