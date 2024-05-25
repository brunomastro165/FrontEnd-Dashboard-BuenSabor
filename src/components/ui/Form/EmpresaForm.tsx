import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useForm } from '../../../hooks/useForm'
import { ISucursal } from '../../../types/Sucursal'
import { genericInput } from './Inputs/GenericInput';
import { BackendClient } from '../../../services/BackendClient';
import { IEmpresa } from '../../../types/Empresa';
import { IEmpresaShort } from '../../../types/ShortDtos/EmpresaShort';
import { useAppDispatch } from '../../../hooks/redux';
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';
import * as Yup from 'yup'
import Swal from 'sweetalert2'

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

  //Esquema de validación con YUP

  const [errors, setErrors] = useState<any>({});

  const mostrarAlerta = () => {
    Swal.fire('Se agregó correctamente la empresa', `${values.nombre}`, 'success');
  }

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .required('El nombre es requerido'),
    razonSocial: Yup.string()
      .required('La razón social es requerida'),
    cuil: Yup.number()
      .required('El CUIL es requerido')
      .positive('El CUIL debe ser un número positivo')
      .integer('El CUIL debe ser un número entero')
      .test('len', 'El CUIL debe tener exactamente 11 dígitos', val => {
        if (val) {
          return val.toString().length === 11
        }
        return false;
      }),
  });

  const postEmpresa = async (data: IEmpresaShort) => {
    if (method === 'POST') {
      try {
        //const res: IEmpresaShort = await backend.post("http://localhost:8081/empresa/short", data);
        const res: IEmpresaShort = await backend.post(`${import.meta.env.VITE_LOCAL}empresa`, data);

        dispatch(setGlobalUpdated(true))
        mostrarAlerta()


      } catch (error) {
        console.error(error)
      }
    }
    else if (method === 'PUT') {
      try {
        //const res: IEmpresaShort = await backend.put(`http://localhost:8081/empresa/${data.id}/short`, data);
        const res: IEmpresaShort = await backend.put(`${import.meta.env.VITE_LOCAL}empresa/${data.id}`, data);
        dispatch(setGlobalUpdated(true))
      } catch (error) {
        console.error(error)
      }
    }
  }

  console.log(values)

  const handleSubmit = async () => {
    try {

      await validationSchema.validate(values, { abortEarly: false });
      //@ts-ignore
      postEmpresa(values);
      dispatch(setGlobalUpdated(true));
      resetForm();
      setOpen(false);
      setErrors({}); // limpia los errores

    } catch (error) {

      if (error instanceof Yup.ValidationError) {
        let err = {};
        error.inner.forEach((validationError) => {
          if (validationError.path) {
            //@ts-ignore
            err[validationError.path] = validationError.message;
          }
        });
        setErrors(err);
      } else {
        console.error(error);
      }

    }
  };

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
            <div className='w-full'>
              {genericInput('nombre', "text", values.nombre, handleChange)} {/* Nombre */}
              <p className='text-red-600 font-Roboto'>{errors?.nombre}</p>
            </div>

            <div className='w-full'>
              {genericInput('razonSocial', 'text', values.razonSocial, handleChange)} {/* Razón Social */}
              <p className='text-red-600 font-Roboto'>{errors?.razonSocial}</p>
            </div>
          </div>

          {genericInput('cuil', 'number', values.cuil, handleChange)} {/* Cuil */}
          <p className='text-red-600 font-Roboto'>{errors?.cuil}</p>
        </div>
      </div>

      <button className='bg-red-600 text-white px-4 py-2 rounded-md active:scale-95 transition-all'
        onClick={handleSubmit}>Enviar</button>
    </div>
  )
}

export default EmpresaForm