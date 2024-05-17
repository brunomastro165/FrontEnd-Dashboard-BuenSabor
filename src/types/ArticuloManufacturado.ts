import { IArticuloManufacturadoDetalle } from "./ArticuloManufacturadoDetalle";
import { IUnidadMedida } from "./UnidadMedida";

export interface IArticuloManufacturado {
  id: number;
  denominacion: string;
  precioVenta: number;
  imagenes: [];
  unidadMedida: IUnidadMedida;
  descripcion: string;
  tiempoEstimadoMinutos: number;
  preparacion: string;
  articuloManufacturadoDetalles: IArticuloManufacturadoDetalle[];
  stock: number;
  eliminado: boolean;
}
