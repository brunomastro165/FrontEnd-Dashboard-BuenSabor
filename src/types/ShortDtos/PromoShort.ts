import { IDetallePromo } from "../DetallePromo";
import { IImagen } from "../Imagen";

export interface IPromosShort {
  id: number;
  eliminado: boolean;
  denominacion: string;
  fechaDesde: string;
  fechaHasta: string;
  horaDesde: string;
  horaHasta: string;
  descripcionDescuento: string;
  precioPromocional: number;
  tipoPromocion: string;
  detalles: IDetallePromo[];
  imagenes: IImagen[];
}
