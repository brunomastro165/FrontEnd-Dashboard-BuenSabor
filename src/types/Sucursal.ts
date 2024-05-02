import { ICategoria } from "./Categoria";

export interface ISucursal {
  id: number;
  nombre: string;
  horarioApertura: string;
  horarioCierre: string;
  domicilio: string;
  categorias: ICategoria[];
  promociones: string;
}
