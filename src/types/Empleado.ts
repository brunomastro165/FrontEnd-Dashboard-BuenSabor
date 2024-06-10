import { IDomicilio } from "./Domicilio/Domicilio";
import { ISucursalShort } from "./ShortDtos/SucursalShort";

export interface IEmpleado {
  id: number;
  eliminado: false;
  nombre: string;
  apellido: string;
  email: string;
  domicilio: IDomicilio;
  rol: string;
  sucursal: ISucursalShort;
}
