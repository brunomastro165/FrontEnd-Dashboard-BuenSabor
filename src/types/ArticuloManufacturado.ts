import { IArticuloManufacturadoDetalle } from "./ArticuloManufacturadoDetalle";

export interface IArticuloManufacturado {
  id: number;
  denominacion: string;
  precioVenta: number;
  imagenes: [];
  unidadMedida: null;
  descripcion: string;
  tiempoEstimadoMinutos: number;
  preparacion: number;
  articuloManufacturadoDetalles: IArticuloManufacturadoDetalle[];
  stock: number;
}
