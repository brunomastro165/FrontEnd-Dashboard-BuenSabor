import { IArticuloInsumo } from "./ArticuloInsumo";

export interface ICategoria {
  id: number;
  denominacion: string;
  articulos: IArticuloInsumo[];
  subCategorias: ICategoria[];
}
