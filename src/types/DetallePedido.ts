import { IArticuloInsumo } from "./ArticuloInsumo";
import { IArticuloManufacturado } from "./ArticuloManufacturado";

export interface IDetallePedido {
  id: number;
  cantidad: number;
  articuloManufacturado: IArticuloManufacturado | undefined;
  articuloInsumo: IArticuloInsumo | undefined;
}
