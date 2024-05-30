import { IImagen } from "../Imagen";
import { ISucursalShort } from "./SucursalShort";

export interface IEmpresaShort {
  id: number;
  nombre: string;
  razonSocial: string;
  cuil: number;
  eliminado: boolean;
  imagenes: IImagen[];
  sucursales: ISucursalShort[];
}
