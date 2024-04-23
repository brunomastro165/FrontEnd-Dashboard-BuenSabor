import { IItem } from "./Table/TableItem";

export interface IBasePage {
  data: IItem[];
  title: string;
  loading: boolean;
}
