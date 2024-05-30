import { IDomicilio } from "../Domicilio/Domicilio";
import { IImagen } from "../Imagen";

export interface ISucursalShort {
  id: number;
  eliminado: boolean;
  nombre: string;
  horarioApertura: string;
  horarioCierre: string;
  esCasaMatriz: boolean;
  idEmpresa: number;
  domicilio: IDomicilio;
  imagenes: IImagen[];
}
