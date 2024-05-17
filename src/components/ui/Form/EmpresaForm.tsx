import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useForm } from '../../../hooks/useForm'
import { ISucursal } from '../../../types/Sucursal'
import { genericInput } from './Inputs/GenericInput';
import { BackendClient } from '../../../services/BackendClient';
import { IEmpresa } from '../../../types/Empresa';
import { IEmpresaShort } from '../../../types/ShortDtos/EmpresaShort';
import { useAppDispatch } from '../../../hooks/redux';
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';

interface IForm {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: IEmpresaShort;
  method: string
}

type FormState = {
  [key: string]: any;
  id: number;
  nombre: string;
  razonSocial: string;
  cuil: number;
  //sucursales: ISucursal[] | null;
};

class GenericBackend extends BackendClient<IEmpresaShort> { } //Métodos genéricos 

const EmpresaForm: FC<IForm> = ({ open, setOpen, data, method }) => {

  const backend = new GenericBackend(); //Objeto de BackendClient

  const dispatch = useAppDispatch();

  const { handleChange, values, resetForm } = useForm<FormState>(data);

  const postEmpresa = async (data: IEmpresaShort) => {
    if (method === 'POST') {
      try {
        //const res: IEmpresaShort = await backend.post("http://localhost:8081/empresa/short", data);
        const res: IEmpresaShort = await backend.post("http://localhost:8081/empresa", data);
        setTimeout(() => {
          dispatch(setGlobalUpdated(true))
        }, 500);

        console.log("QUE")
      } catch (error) {
        console.error(error)
      }
    }
    else if (method === 'PUT') {
      try {
        //const res: IEmpresaShort = await backend.put(`http://localhost:8081/empresa/${data.id}/short`, data);
        const res: IEmpresaShort = await backend.put(`http://localhost:8081/empresa/${data.id}`, data);
        dispatch(setGlobalUpdated(true))
      } catch (error) {
        console.error(error)
      }
    }
  }

  console.log(values)

  const handleSubmit = () => {
    //@ts-ignore 
    postEmpresa(values)
    dispatch(setGlobalUpdated(true));
    resetForm();
    setOpen(false)
  }

  // const sucursalesInput = () => {
  //   return (
  //     <>
  //       <div className='font-Roboto text-xl'>Sucursales disponibles: </div>
  //       {sucursales.map((sucursal, index) => (
  //         <div key={index}>
  //           <input
  //             multiple
  //             type="checkbox"
  //             id={`sucursales${index}`}
  //             name='sucursales'
  //             value={sucursal.nombre}
  //             onChange={(e) => handleSelect(e, sucursales, selectedSucursales, setSelectedSucursales, 'nombre', 'sucursales')}
  //           />
  //           <label htmlFor={`sucursales${index}`} className="ml-2">
  //             {sucursal.nombre}
  //           </label>
  //         </div>
  //       ))}
  //     </>
  //   )
  // }

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
          <div className='flex w-full md:space-x-4'>
            {genericInput('nombre', "text", values.nombre, handleChange)} {/* Nombre */}
            {genericInput('razonSocial', 'text', values.razonSocial, handleChange)} {/* Razón Social */}
          </div>
          {genericInput('cuil', 'number', values.cuil, handleChange)} {/* Cuil */}
          {/* {sucursalesInput()} No va a hacer falta*/}

        </div>

      </div>

      <button className='bg-red-600 text-white px-4 py-2 rounded-md active:scale-95 transition-all'
        onClick={handleSubmit}>Enviar</button>
    </div>
  )
}

export default EmpresaForm