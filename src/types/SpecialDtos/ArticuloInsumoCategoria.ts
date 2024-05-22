import { ICategoria } from "../Categoria";
import { IUnidadMedida } from "../UnidadMedida";

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
  categoria: ICategoria;
}
