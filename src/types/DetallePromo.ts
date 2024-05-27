import { IArticuloManufacturado } from "./ArticuloManufacturado";

export interface IDetallePromo {
  id: number;
  cantidad: number;
  articulo: IArticuloManufacturado;
}
