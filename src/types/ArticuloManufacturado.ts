export interface IArticuloManufacturado {
  id: number;
  denominacion: string;
  precioVenta: number;
  imagenes: [];
  unidadMedida: null;
  descripcion: string;
  tiempoEstimadoMinutos: number;
  preparacion: number;
  articuloManufacturadoDetalles: [];
  stock: number;
}
