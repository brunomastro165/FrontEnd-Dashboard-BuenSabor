import { IUnidadMedida } from "../UnidadMedida";

export interface IInsumoCreate {
  id: number;
  denominacion: string;
  precioVenta: number;
  unidadMedida: IUnidadMedida;
  precioCompra: number;
  stockActual: number;
  stockMaximo: number;
  stockMinimo: number;
  esParaElaborar: boolean;
  eliminado: boolean;
  idCategoria: number;
}
