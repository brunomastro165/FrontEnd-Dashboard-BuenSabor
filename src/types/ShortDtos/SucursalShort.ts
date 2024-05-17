import { IDomicilio } from "../Domicilio/Domicilio";

export interface ISucursalShort {
  id: number;
  eliminado: boolean;
  nombre: string;
  horarioApertura: string;
  horarioCierre: string;
  esCasaMatriz: boolean;
  idEmpresa: number;
  domicilio: IDomicilio;
}
