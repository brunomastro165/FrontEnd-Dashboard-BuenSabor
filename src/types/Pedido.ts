import { IDetallePedido } from "./DetallePedido";
import { IDomicilio } from "./Domicilio/Domicilio";
import { ISucursal } from "./Sucursal";

export interface IPedido {
  id: number;
  eliminado: boolean;
  total: number;
  estado: string;
  tipoEnvio: string;
  formaPago: string;
  fechaPedido: Date;
  domicilio: IDomicilio;
  cliente: string;
  sucursal: ISucursal;
  empleado: string;
  factura: string;
  detallesPedido: IDetallePedido[];
  horaEstimadaFinalizacion: Date;
}
