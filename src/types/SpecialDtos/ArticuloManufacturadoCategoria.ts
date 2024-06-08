import { IArticuloManufacturadoDetalle } from "../ArticuloManufacturadoDetalle";
import { ICategoria } from "../Categoria";
import { IUnidadMedida } from "../UnidadMedida";
import { ICategoriaSinArticulo } from "./CategoriaSinArticulo";

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

  //CAMBIAR ESTO POR UN DTO CATEGORIA QUE NO TENGA ARTICULOS
  categoria: ICategoriaSinArticulo;
}
