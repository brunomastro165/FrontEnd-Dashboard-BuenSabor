import { IUsuario } from "./Usuario";

export interface IRol {
  id: number;
  denominacion: string;
  usuarios: IUsuario[];
}
