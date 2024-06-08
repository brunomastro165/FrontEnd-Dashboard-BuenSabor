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
import { validationEmpresa } from './Validaciones/EmpresaValidacion';
import ImageInput from './Inputs/ImageInput';

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
  imagenes: any[];
  //sucursales: ISucursal[] | null;
};

type FileWithPreview = File & { preview: string };

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

  // const validationSchema = Yup.object().shape({
  //   nombre: Yup.string()
  //     .required('El nombre es requerido'),
  //   razonSocial: Yup.string()
  //     .required('La razón social es requerida'),
  //   cuil: Yup.number()
  //     .required('El CUIL es requerido')
  //     .positive('El CUIL debe ser un número positivo')
  //     .integer('El CUIL debe ser un número entero')
  //     .test('len', 'El CUIL debe tener exactamente 11 dígitos', val => {
  //       if (val) {
  //         return val.toString().length === 11
  //       }
  //       return false;
  //     }),
  // });

  const postEmpresa = async (data: IEmpresaShort) => {
    if (method === 'POST') {
      try {
        //const res: IEmpresaShort = await backend.post("http://localhost:8081/empresa/short", data);
        //const res: IEmpresaShort = await backend.post(`${import.meta.env.VITE_LOCAL}empresa`, data);
        const res: IEmpresaShort = await backend.postConImagen(`${import.meta.env.VITE_LOCAL}empresa/save`, data, files);
        dispatch(setGlobalUpdated(true))
        //mostrarAlerta()

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

      await validationEmpresa.validate(values, { abortEarly: false });
      //@ts-ignore
      await postEmpresa(values);
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

  const [files, setFiles] = useState<FileWithPreview[]>([]);

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

            {genericInput('nombre', "text", values.nombre, handleChange, errors)} {/* Nombre */}
            {genericInput('razonSocial', 'text', values.razonSocial, handleChange, errors)} {/* Razón Social */}

          </div>

          {genericInput('cuil', 'number', values.cuil, handleChange, errors)} {/* Cuil */}

          <div className='w-full flex flex-col justify-center '>
            <ImageInput files={files} setFiles={setFiles} id={values.id} imagenes={values.imagenes}/>
          </div>
        </div>
      </div>

      <button className='bg-red-600 text-white px-4 py-2 rounded-md active:scale-95 transition-all'
        onClick={handleSubmit}>Enviar</button>
    </div>
  )
}

export default EmpresaForm