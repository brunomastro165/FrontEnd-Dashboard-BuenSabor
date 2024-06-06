import { IArticuloInsumo } from "./ArticuloInsumo";
import { IArticuloManufacturado } from "./ArticuloManufacturado";

export interface IDetallePromo {
  id: number;
  cantidad: number;

  //TODO REVISAR QUE ESTO DEBERÍA ESTAR ESCRITO EN SINGULAR
  articulosManufacturados: IArticuloManufacturado | undefined;
  insumos: IArticuloInsumo | undefined;
}
