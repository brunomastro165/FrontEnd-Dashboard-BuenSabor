import { ChangeEvent, useState } from "react";
import { ISucursal } from "../types/Sucursal";

interface FormValues {
  [key: string]: string | number;
}

export const useForm = <T extends FormValues>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [`${name}`]: value });
    console.log(values);
  };

  //PARA SELECCIONES DE IMAGENES
  const handleFileDrop = (files) => {
    setValues((prevValues) => ({ ...prevValues, imagenes: files }));
    console.log("hola");
  };

  //PARA SELECCIONES MÚLTIPLES DE OBJETOS
  const handleSelect = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    items: T[],
    selectedItems: T[],
    setSelectedItems: (items: T[]) => void,
    filterParam: string,
    formValue: string
  ) => {
    const selectedItemName = e.target.value;
    const selectedItem = items.find(
      (item) => item[filterParam] === selectedItemName
    );

    if (selectedItem && selectedItems?.includes(selectedItem)) {
      // Si el elemento ya está seleccionado, lo quitamos del arreglo
      setSelectedItems((prevItems) => {
        const newItems = prevItems
          ? prevItems.filter((item) => item[filterParam] !== selectedItemName)
          : [];
        setValues((prevState) => ({
          ...prevState,
          [formValue]: newItems,
        }));
        return newItems;
      });
    } else {
      // Si el elemento no está seleccionado, lo agregamos al arreglo
      setSelectedItems((prevItems) => {
        const newItems = [...prevItems, selectedItem];
        setValues((prevState) => ({
          ...prevState,
          [formValue]: newItems,
        }));
        return newItems;
      });
    }
  };

  //PARA SELECCIONES SIMPLES DE OBJETOS
  const handleChoose = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    items: T[],
    setSelectedItem: (item: T | null) => void,
    filterParam: string,
    formValue: string
  ) => {
    const selectedItemName = e.target.value;
    const selectedItem = items.find(
      (item) => item[filterParam] === selectedItemName
    );

    // Establece el elemento seleccionado directamente
    setSelectedItem(selectedItem || null);

    setValues((prevState) => ({
      ...prevState,
      [formValue]: selectedItem || "",
    }));
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    values,
    handleChange,
    resetForm,
    setValues,
    handleSelect,
    handleChoose,
    handleFileDrop,
  };
};
