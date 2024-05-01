import { IRol } from "./Rol";

export interface IUsuario {
  id: number;
  auth0Id: string;
  username: string;
  rol: string;
}
