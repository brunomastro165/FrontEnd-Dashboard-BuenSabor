import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useForm } from '../../../hooks/useForm'
import { ISucursal } from '../../../types/Sucursal'
import { genericInput } from './Inputs/GenericInput';
import { BackendClient } from '../../../services/BackendClient';
import { IEmpresa } from '../../../types/Empresa';

interface IForm {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

type FormState = {
  [key: string]: any;
  id: number;
  nombre: string;
  razonSocial: string;
  cuil: number;
  sucursales: ISucursal[] | null;
};

class GenericBackend extends BackendClient<T> { } //Métodos genéricos 

const EmpresaForm: FC<IForm> = ({ open, setOpen }) => {

  const backend = new GenericBackend(); //Objeto de BackendClient

  const [sucursales, setSucursales] = useState<ISucursal[]>([]);

  const [sucursalSeleccionada, setSucursalSeleccionada] = useState<ISucursal | undefined>();

  const [loaded, setLoaded] = useState<boolean>(false);

  const getSucursales = async () => {
    const res: ISucursal[] = await backend.getAll("http://localhost:8080/sucursales");
    setSucursales(res);
    setLoaded(true);
  }

  const postEmpresa = async (data) => {
    try {
      const res: IEmpresa = await backend.post("http://localhost:8080/empresas", data);
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getSucursales();
  }, [loaded])

  const [selectedSucursales, setSelectedSucursales] = useState<ISucursal[] | undefined>([]);

  const { handleChange, values, resetForm, setValues, handleSelect } = useForm<FormState>({
    id: 0,
    nombre: '',
    razonSocial: '',
    cuil: 0,
    sucursales: null
  })

  const handleSubmit = () => {
    postEmpresa(values)
    resetForm();
    setOpen(false)
  }

  const sucursalesInput = () => {
    return (
      <>
        <div className='font-Roboto text-xl'>Sucursales disponibles: </div>
        {sucursales.map((sucursal, index) => (
          <div key={index}>
            <input
              multiple
              type="checkbox"
              id={`sucursales${index}`}
              name='sucursales'
              value={sucursal.nombre}
              onChange={(e) => handleSelect(e, sucursales, selectedSucursales, setSelectedSucursales, 'nombre', 'sucursales')}
            //onClick={() => setSelected(unidad.denominacion)}
            //className={`peer ${selected === unidad.denominacion ? 'p-12' : ''}`}
            //checked={medidaSeleccionada?.denominacion === unidad.denominacion}
            />
            <label htmlFor={`sucursales${index}`} className="ml-2">
              {sucursal.nombre}
            </label>
          </div>
        ))}
      </>
    )
  }

  console.log(values);

  return (
    <div className='w-full flex flex-col items-center justify-center space-y-4 p-10 '
      onSubmit={handleSubmit}
    >
      <div className='w-full flex justify-end '>
        <h1 className='flex text-end justify-end bg-red-600 btn btn-error rounded-full text-white text-xl cursor-pointer w-min'
          onClick={() => { setOpen(false), resetForm() }}>X</h1>
      </div>

      <h2 className='text-3xl font-Roboto'>Agrega tu empresa</h2>
      {/*Mapeo los objetos que traigo al formulario, dependiendo de cada objeto, genero un input distinto */}

      <div className='w-full'>

        <div className="relative z-0 w-full mb-5 group">
          {genericInput('nombre', "text", values.nombre, handleChange)} {/* Nombre */}
          {genericInput('razonSocial', 'text', values.razonSocial, handleChange)} {/* Razón Social */}
          {genericInput('cuil', 'number', values.cuil, handleChange)} {/* Cuil */}
          {sucursalesInput()}

        </div>

      </div>

      <button className='bg-red-600 text-white px-4 py-2 rounded-md active:scale-95 transition-all'
        onClick={handleSubmit}>Enviar</button>
    </div>
  )
}

export default EmpresaForm