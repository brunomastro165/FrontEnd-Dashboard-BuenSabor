import { IArticuloInsumo } from "./ArticuloInsumo";

export interface IArticuloManufacturadoDetalle {
  id: number;
  cantidad: number;
  articuloInsumo: IArticuloInsumo | undefined;
}
