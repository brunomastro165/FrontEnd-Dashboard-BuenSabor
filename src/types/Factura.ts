export interface IFactura {
  id: number;
  eliminado: boolean;
  fechaFcturacion: Date;
  mpPaymentId: number;
  mpMerchantOrderId: number;
  mpPreferenceId: number;
  mpPaymentType: number;
  formaPago: string;
  totalVenta: number;
}
