export interface ICategoria {
  id: number;
  denominacion: string;
  articulos: Array<any>;
  subCategorias: ICategoria[];
}
