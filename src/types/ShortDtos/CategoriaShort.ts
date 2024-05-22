export interface ICategoriaShort {
  id: number;
  denominacion: string;
  idSucursal: number;
  eliminado: boolean;
  esInsumo: boolean;
  // subCategorias: ICategoria[];
}
