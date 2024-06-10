import { IDomicilio } from "../Domicilio/Domicilio";

export interface IEmpleadoCreate {
  id: number;
  eliminado: false;
  nombre: string;
  apellido: string;
  email: string;
  domicilio: IDomicilio;
  rol: string;
  idSucursal: number;
}
