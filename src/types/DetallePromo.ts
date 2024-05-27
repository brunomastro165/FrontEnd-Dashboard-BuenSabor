import { IArticuloInsumo } from "./ArticuloInsumo";
import { IArticuloManufacturado } from "./ArticuloManufacturado";

export interface IDetallePromo {
  id: number;
  cantidad: number;
  articulosManufacturados: IArticuloManufacturado | undefined;
  insumos: IArticuloInsumo | undefined;
}
