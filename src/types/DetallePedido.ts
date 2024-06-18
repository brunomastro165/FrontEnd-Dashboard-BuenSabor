import { IArticuloInsumo } from "./ArticuloInsumo";
import { IArticuloManufacturado } from "./ArticuloManufacturado";
import { IPromos } from "./Promos";

export interface IDetallePedido {
  id: number;
  cantidad: number;
  articuloManufacturado: IArticuloManufacturado | undefined;
  articuloInsumo: IArticuloInsumo | undefined;
  promocion: IPromos | undefined;
  subTotal: number;
}
