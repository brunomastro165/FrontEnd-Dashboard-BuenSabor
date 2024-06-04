import { IArticuloManufacturado } from "./ArticuloManufacturado";
import { IDetallePromo } from "./DetallePromo";
import { IImagen } from "./Imagen";

export interface IPromos {
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
  sucursales: [];
}
