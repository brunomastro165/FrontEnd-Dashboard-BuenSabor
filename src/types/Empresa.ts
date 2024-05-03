import { ISucursal } from "./Sucursal";

export interface IEmpresa {
  id: string;
  nombre: string;
  razonSocial: string;
  cuil: number;
  sucursales: ISucursal[];
}
