import { Dispatch, SetStateAction } from "react";

export interface IForm {
  data: { [key: string]: string };
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
