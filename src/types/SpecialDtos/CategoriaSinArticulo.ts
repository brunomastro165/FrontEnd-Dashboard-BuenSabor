export interface ICategoriaSinArticulo {
  id: number;
  denominacion: string;
  subCategorias: ICategoriaSinArticulo[];
  eliminado: boolean;
  esInsumo: boolean;
  esPadre: boolean;
}

