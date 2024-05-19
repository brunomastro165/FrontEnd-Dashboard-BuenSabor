import { IUnidadMedida } from "./UnidadMedida";

export interface IArticuloInsumo {
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
}
