import { IArticuloInsumo } from "./ArticuloInsumo";
import { IArticuloManufacturado } from "./ArticuloManufacturado";
import { ISucursalShort } from "./ShortDtos/SucursalShort";
import { ISucursal } from "./Sucursal";

export interface ICategoria {
  id: number;
  denominacion: string;
  articulos: IArticuloInsumo[];
  subCategorias: ICategoria[];
  eliminado: boolean;
  esInsumo: boolean;
  sucursales: ISucursalShort[];
  insumos: IArticuloInsumo[];
  articulosManufacturados: IArticuloManufacturado[];
  esPadre: boolean;
}
