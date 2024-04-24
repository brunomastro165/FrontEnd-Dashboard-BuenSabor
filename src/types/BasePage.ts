import { IItem } from "./Table/TableItem";

export interface IBasePage {
  data: IItem[];
  title: string;
  loading: boolean;
  row1: string;
  row2: string;
  row3: string;
  row4: string;
  row5: string;
  endpoint: string,
}
