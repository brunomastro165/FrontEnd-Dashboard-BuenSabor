import { IDomicilio } from "../Domicilio/Domicilio";

export interface ISucursalShort {
  id: number;
  eliminado: boolean;
  nombre: string;
  horarioApertura: string;
  horarioCierre: string;
  casaMatriz: boolean;
  idEmpresa: number;
  domicilio: IDomicilio | undefined;
}
