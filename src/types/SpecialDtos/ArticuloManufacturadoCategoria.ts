import { IArticuloManufacturadoDetalle } from "../ArticuloManufacturadoDetalle";
import { ICategoria } from "../Categoria";
import { IUnidadMedida } from "../UnidadMedida";

export interface IArticuloManufacturadoCategoria {
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
  categoria: ICategoria;
}
