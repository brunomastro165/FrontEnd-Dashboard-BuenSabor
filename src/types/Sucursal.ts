import { ICategoria } from "./Categoria";
import { IEmpresa } from "./Empresa";

export interface ISucursal {
  id: number;
  nombre: string;
  horarioApertura: string;
  horarioCierre: string;
  domicilio: string;
  categorias: ICategoria[];
  promociones: string;
 // empresa: IEmpresa;
}
