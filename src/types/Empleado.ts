import { IDomicilio } from "./Domicilio/Domicilio";
import { ISucursalShort } from "./ShortDtos/SucursalShort";

export interface IEmpleado {
  id: number;
  eliminado: false;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  usuario: IUsuarioEmpleado;
  domicilio: IDomicilio;
  tipoEmpleado: string;
  sucursal: ISucursalShort;
}
