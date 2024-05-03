import { ICategoria } from "./Categoria";
import { IPromos } from "./Promos";

export interface ISucursal {
  id: number;
  nombre: string;
  horarioApertura: string;
  horarioCierre: string;
  domicilio: string;
  categorias: ICategoria[];
  promociones: IPromos[];
  imagen: string;
  // empresa: IEmpresa;
}
