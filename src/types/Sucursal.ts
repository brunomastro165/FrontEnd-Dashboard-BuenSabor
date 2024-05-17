import { ICategoria } from "./Categoria";
import { IDomicilio } from "./Domicilio/Domicilio";
import { IPromos } from "./Promos";

export interface ISucursal {
  id: number;
  nombre: string;
  horarioApertura: string;
  horarioCierre: string;
  domicilio: IDomicilio;
  categorias: ICategoria[];
  promociones: IPromos[];
  imagen: string;
  // empresa: IEmpresa;
}
