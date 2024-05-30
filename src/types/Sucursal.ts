import { ICategoria } from "./Categoria";
import { IDomicilio } from "./Domicilio/Domicilio";
import { IImagen } from "./Imagen";
import { IPromos } from "./Promos";

export interface ISucursal {
  id: number;
  eliimnado: boolean;
  esCasaMatriz: boolean;
  nombre: string;
  horarioApertura: string;
  horarioCierre: string;
  domicilio: IDomicilio;
  categorias: ICategoria[];
  promociones: IPromos[];
  imagenes: IImagen[];
  // empresa: IEmpresa;
}
