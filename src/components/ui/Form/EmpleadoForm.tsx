import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useForm } from '../../../hooks/useForm'
import { ISucursal } from '../../../types/Sucursal'
import { booleanInput, genericInput } from './Inputs/GenericInput';
import { BackendClient } from '../../../services/BackendClient';
import { IEmpresa } from '../../../types/Empresa';
import { IUnidadMedida } from '../../../types/UnidadMedida';
import DragDrop from './Inputs/FileInput';
import { IArticuloInsumo } from '../../../types/ArticuloInsumo';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';
import UnidadMedidaForm from './UnidadMedidaForm';
import UnidadMedidaInput from './Inputs/UnidadMedidaInput';
import * as Yup from 'yup'
import CategoriaInput from './Inputs/CategoriaInput';
import { subirImagenes } from './Inputs/ImageFunction';
import ImageInput from './Inputs/ImageInput';
import { validationInsumo } from './Validaciones/AInsumoValidacion';
import { errorMessage, successMessage } from '../../toasts/ToastAlerts';
import { useAuth0 } from '@auth0/auth0-react';
import { IDomicilio } from '../../../types/Domicilio/Domicilio';
import { IEmpleado } from '../../../types/Empleado';
import ImageInputIndividual from './Inputs/ImagenInputIndividual';
import SucursalIndividualInput from './Inputs/SucursalIndividualInput';
import { useParams } from 'react-router-dom';


interface IForm {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    method: string,
}

type FormState = {
    [key: string]: any; //Para poder leer el FormState desde useForm
    id: number,
    nombre: string,
    apellido: string,
    email: string,
    telefono: number,
    domicilio: IDomicilio;
    tipoEmpleado: string,
    idSucursal: number,
    usuario: IUsuarioEmpleadoCreate
};

//@ts-ignore
class GenericBackend extends BackendClient<T> { } //Métodos genéricos 

type FileWithPreview = File & { preview: string };

const EmpleadoForm: FC<IForm> = ({ open, setOpen, method }) => {

    const { getAccessTokenSilently } = useAuth0()

    const [subiendo, setSubiendo] = useState<boolean>(false);

    const backend = new GenericBackend(); //Objeto de BackendClient

    const [loaded, setLoaded] = useState<boolean>(false);

    const [errors, setErrors] = useState<any>({});


    const { idEmpresa } = useParams();

    //REDUX 

    const initialValues = useAppSelector((state) => state.GlobalInitialValues.data);

    const dispatch = useAppDispatch();


    //USE FORM

    const { handleChange, values, resetForm, handleChoose, handleFileDrop, setValues } = useForm<FormState>(initialValues)


    const succes = () => {
        dispatch(setGlobalUpdated(true))
        setSubiendo(false)
        setOpen(false);
        resetForm();
        dispatch(setGlobalUpdated(true));
        successMessage();
    }

    console.log(values)

    const postEmpleado = async (data: FormState) => {

        if (method === 'POST') {
            try {
                setSubiendo(true);
                if (file) {
                    console.log("FRONT")
                    console.log(data)
                    const res: IEmpleado = await backend.postConImagenIndividual(`${import.meta.env.VITE_LOCAL}empleado/save`, data, file, getAccessTokenSilently);
                    console.log("BACK")
                    console.log(res)
                    succes()
                }
                else {
                    throw new Error
                }
            } catch (error) {
                setSubiendo(false)
                errorMessage()
                console.error(error)
            }
        }
        else if (method === 'PUT') {
            try {
                setSubiendo(true);
                if (file) {
                    const res: IEmpleado = await backend.postConImagenIndividual(`${import.meta.env.VITE_LOCAL}empleado/save`, data, file, getAccessTokenSilently);
                    succes()
                }
                else {
                    throw new Error
                }
                //const res: IEmpresaShort = await backend.put(`http://localhost:8081/empresa/${data.id}/short`, data);
            } catch (error) {
                setSubiendo(false)
                errorMessage()
                console.error(error)
            }
        }
    }

    const handleSubmit = async () => {
        try {
            // await validationInsumo.validate(values, { abortEarly: false });
            await postEmpleado(values);
            setErrors({}); // limpia los errores
        } catch (error) {

            if (error instanceof Yup.ValidationError) {
                let err = {};
                error.inner.forEach((validationError) => {
                    if (validationError.path) {
                        const path = validationError.path.split('.');
                        if (path.length > 1) {
                            const [parent, child] = path;
                            //@ts-ignore
                            if (!err[parent]) {
                                //@ts-ignore
                                err[parent] = {};
                            }
                            //@ts-ignore
                            err[parent][child] = validationError.message;
                        } else {
                            //@ts-ignore
                            err[validationError.path] = validationError.message;
                        }
                    }
                });
                setErrors(err);
            } else {
                console.error(error);
            }
        }
    };

    //Manejo de las imagenes

    const [file, setFile] = useState<FileWithPreview | null>(null);


    const tipoEmpleadoInput = () => {
        return (
            <>
                <div className="flex flex-col justify-center items-start w-full h-min">
                    <div className="my-4 w-full ">
                        {/* <h1 className='font-Roboto text-xl first-letter:uppercase'>{name}</h1> */}
                        <label htmlFor={'tipoEmpleado'} className="font-Roboto text-xl first-letter:uppercase" >
                            <h1 className={`first-letter:uppercase transition-all duration-500 `}>Rol</h1>
                        </label>
                        <select name="tipoEmpleado" id="tipoEmpleado" onChange={handleChange} className='select select-bordered w-full'>
                            <option value=""></option>
                            <option value="ADMIN">Administrador</option>
                            <option value="COCINERO">Cocinero</option>
                            <option value="CAJERO">Cajero</option>
                            <option value="DELIVERY">Delivery</option>
                        </select>
                    </div>

                    <h1 className={`font-Roboto h-5 mb-4  flex text-start justify-start text-red-600 transition-all duration-500 ${errors?.tipoEmpleado || 'opacity-0'}`}>{errors?.tipoEmpleado}</h1>
                </div>
            </>
        )


    }

    return (
        <>
            <div className='w-full flex flex-col items-center justify-center space-y-4 p-10 '
                onSubmit={handleSubmit}
            >
                <div className='w-full flex justify-end '>
                    <h1 className='flex text-end justify-end bg-red-600 btn btn-error rounded-full text-white text-xl cursor-pointer w-min'
                        onClick={() => { setOpen(false), resetForm() }}>X</h1>
                </div>

                <h2 className='text-3xl font-Roboto'>Agrega tu insumo</h2>
                {/*Mapeo los objetos que traigo al formulario, dependiendo de cada objeto, genero un input distinto */}

                <div className={`w-full h-auto`}>
                    <div className="relative z-0 w-full mb-5 group">
                        <div className='w-full flex flex-row md:space-x-5'>
                            {genericInput('nombre', "text", values.nombre, handleChange, errors)}
                            {genericInput('apellido', 'text', values.apellido, handleChange, errors)}
                        </div>

                        <div className='flex justify-center w-full md:space-x-5'>
                            {genericInput('email', 'text', values.email, handleChange, errors)}
                            {genericInput('telefono', 'text', values.telefono, handleChange, errors)}
                        </div>

                        <div className='flex justify-center w-full md:space-x-5'>
                            {genericInput('usuario.userName', 'text', values.usuario.userName, handleChange, errors)}
                        </div>

                        <div className='w-full flex justify-center flex-col '>
                            <div className='flex flex-col'>
                                <ImageInputIndividual file={file as FileWithPreview} setFile={setFile as any} id={values.id} imagen={values.imagenes} />
                                <SucursalIndividualInput idEmpresa={idEmpresa} setValues={setValues} values={values} key={1} />
                                {tipoEmpleadoInput()}
                            </div>
                        </div>

                    </div>
                </div>

                <button className={`btn btn-wide btn-success text-white ${subiendo && 'btn-disabled animate-pulse'}`}
                    onClick={handleSubmit}>
                    {subiendo ? 'Subiendo...' : 'Enviar'}
                </button>
            </div>
        </>
    )
}

export default EmpleadoForm