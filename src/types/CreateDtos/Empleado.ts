import { IDomicilio } from "../Domicilio/Domicilio";

export interface IEmpleadoCreate {
  id: number;
  eliminado: false;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  usuario: IUsuarioEmpleadoCreate;
  domicilio: IDomicilio;
  tipoEmpleado: string;
  idSucursal: number;
}
