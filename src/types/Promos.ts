import { IArticuloManufacturado } from "./ArticuloManufacturado"
import { IImagen } from "./Imagen"

export interface IPromos {
    id: number,
    denominacion: string,
    fechaDesde: string,
    fechaHasta: string,
    horaDesde: string,
    horaHasta: string,
    descripcionDescuento: string,
    precioPromocional: number,
    tipoPromocion: string,
    articulos: IArticuloManufacturado[],
    imagenes: IImagen[]
}

