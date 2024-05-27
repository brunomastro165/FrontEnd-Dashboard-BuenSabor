export interface IDetallePromoCreate {
  id: number;
  cantidad: number;
  idArticulo: number | undefined;
  eliminado: boolean;
}
