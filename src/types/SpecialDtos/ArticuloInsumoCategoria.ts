import { ICategoria } from "../Categoria";
import { IUnidadMedida } from "../UnidadMedida";
import { ICategoriaSinArticulo } from "./CategoriaSinArticulo";

export interface IArticuloInsumoCategoria {
  id: number;
  denominacion: string;
  precioVenta: number;
  imagenes: [];
  unidadMedida: IUnidadMedida;
  precioCompra: number;
  stockActual: number;
  stockMaximo: number;
  stockMinimo: number;
  esParaElaborar: boolean;
  eliminado: boolean;
  categoria: ICategoriaSinArticulo;
}
