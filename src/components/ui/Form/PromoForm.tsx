import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useForm } from '../../../hooks/useForm'
import { ISucursal } from '../../../types/Sucursal'
import { genericInput } from './Inputs/GenericInput';
import { BackendClient, BackendMethods } from '../../../services/BackendClient';
import { IEmpresa } from '../../../types/Empresa';
import { IUnidadMedida } from '../../../types/UnidadMedida';
import DragDrop from './Inputs/FileInput';
import { IArticuloInsumo } from '../../../types/ArticuloInsumo';
import { IImagen } from '../../../types/Imagen';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IPromos } from '../../../types/Promos';
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';
import ImageInput from './Inputs/ImageInput';
import { IDetallePromo } from '../../../types/DetallePromo';
import DetalleInput from './Inputs/DetalleInput';
import DetalleGenerico from './Inputs/DetalleGenerico';
import { ISucursalShort } from '../../../types/ShortDtos/SucursalShort';
import { useParams } from 'react-router-dom';
import SucursalesInput from './Inputs/SucursalesInput';
import { validationPromo } from './Validaciones/PromoValidacion';
import * as Yup from 'yup'
import { errorGenerico, errorMessage, successMessage } from '../../toasts/ToastAlerts';
import { useAuth0 } from '@auth0/auth0-react';

interface IForm {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    method: string,
}

type FormState = {
    [key: string]: any; //Para poder leer el FormState desde useForm
    id: number,
    denominacion: string,
    fechaDesde: string,
    fechaHasta: string,
    horaDesde: null,
    horaHasta: null,
    descripcionDescuento: string,
    precioPromocional: number,
    tipoPromocion: string,
    detalles: IDetallePromo[] | null,
    imagenes: IImagen[]
};


type FileWithPreview = File & { preview: string };

const PromoForm: FC<IForm> = ({ open, setOpen, method }) => {

    const { getAccessTokenSilently } = useAuth0()

    const [subiendo, setSubiendo] = useState<boolean>(false);

    const backend = new BackendMethods(); //Objeto de BackendClient

    const { idEmpresa, idSucursales } = useParams()

    const [loaded, setLoaded] = useState<boolean>(false);

    const initialValues = useAppSelector((state) => state.GlobalInitialValues.data)

    const dispatch = useAppDispatch()

    const [errors, setErrors] = useState<any>();

    //const [selectedSucursales, setSelectedSucursales] = useState<ISucursal[] | undefined>([]);

    const { handleChange, values, resetForm, handleSelect, handleChoose, handleFileDrop, setValues } = useForm<FormState>(initialValues)

    const succes = () => {
        dispatch(setGlobalUpdated(true))
        setSubiendo(false)
        setOpen(false);
        resetForm();
        successMessage();
    }

    const postPromo = async (data: FormState) => {
        if (method === 'POST') {
            try {
                //TODO Cambiar el método para que coincida con el backend
                setSubiendo(true)
                const res: IPromos = await backend.postConImagen(`${import.meta.env.VITE_LOCAL}promocion/save`, data, files, getAccessTokenSilently);
                succes();
            } catch (error) {
                setSubiendo(false)
                errorMessage()
                console.error(error)
            }
        }
        else if (method === 'PUT') {
            try {
                setSubiendo(true)
                const res: IPromos = await backend.putConImagen(`${import.meta.env.VITE_LOCAL}promocion/save/${values.id}`, data, files, getAccessTokenSilently);
                succes()
            } catch (error) {
                setSubiendo(false)
                errorMessage()
                console.error(error)
            }
        }
    }

    const handleSubmit = async () => {
        try {
            await validationPromo.validate(values, { abortEarly: false })
            if (files.length >= 1) {
                await postPromo(values);
                setErrors({}); // limpia los errores
            }
            else {
                errorGenerico('Necesita subir imágenes')
            }
        }
        catch (error) {
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
    }

    const tipoPromocionInput = () => {
        return (
            <>
                <div className="flex flex-col justify-center items-start w-full h-min">
                    <div className="my-4 w-full ">
                        {/* <h1 className='font-Roboto text-xl first-letter:uppercase'>{name}</h1> */}
                        <label htmlFor={'tipoPromocion'} className="font-Roboto text-xl first-letter:uppercase" >
                            <h1 className={`first-letter:uppercase transition-all duration-500 `}>{'Tipo de promoción'}</h1>
                        </label>
                        <select name="tipoPromocion" id="tipoPromocion" onChange={handleChange} className='select select-bordered w-full'>
                            <option value="HAPPY_HOUR">Happy hour</option>
                            <option value="PROMOCION">Promoción</option>
                        </select>
                    </div>

                    <h1 className={`font-Roboto h-5 mb-4  flex text-start justify-start text-red-600 transition-all duration-500 ${errors?.tipoPromocion || 'opacity-0'}`}>{errors?.tipoPromocion}</h1>
                </div>
            </>
        )
    }

    const [files, setFiles] = useState<FileWithPreview[]>([]);

    return (
        <div className='w-full flex flex-col items-center justify-center space-y-4 p-10 '
            onSubmit={handleSubmit}
        >
            <div className='w-full flex justify-end '>
                <h1 className='flex text-end justify-end bg-red-600 btn btn-error rounded-full text-white text-xl cursor-pointer w-min'
                    onClick={() => { setOpen(false), resetForm() }}>X</h1>
            </div>

            <h2 className='text-3xl font-Roboto'>Agrega tu promoción</h2>
            {/*Mapeo los objetos que traigo al formulario, dependiendo de cada objeto, genero un input distinto */}

            <div className='w-full'>
                <div className="relative z-0 w-full mb-5 group">
                    <div className='w-full flex flex-col md:flex-row space-x-0 md:space-x-4'>
                        {genericInput('denominacion', "text", values.denominacion, handleChange, errors)}
                        {/* {genericInput('tipoPromocion', 'text', values.tipoPromocion, handleChange)} */}
                    </div>

                    <div className='w-full flex flex-col md:flex-row space-x-0 md:space-x-4'>
                        {genericInput('fechaDesde', 'date', values.fechaDesde, handleChange, errors)}
                        {genericInput('fechaHasta', 'date', values.fechaHasta, handleChange, errors)}
                    </div>

                    <div className='w-full flex flex-col md:flex-row space-x-0 md:space-x-4'>
                        {genericInput('horaDesde', 'time', values.horaDesde, handleChange, errors)}
                        {genericInput('horaHasta', 'time', values.horaHasta, handleChange, errors)}
                    </div>

                    <div className='w-full flex flex-col md:flex-row space-x-0 md:space-x-4'>
                        {tipoPromocionInput()}
                        {genericInput('precioPromocional', 'number', values.precioPromocional, handleChange, errors)}
                    </div>

                    <div className='flex w-full flex-col'>
                        <SucursalesInput key={1} setValues={setValues} values={values} idEmpresa={idEmpresa} />
                        <h1 className={`font-Roboto h-5 mb-4  flex text-start justify-start text-red-600 transition-all duration-500 ${errors?.idSucursales || 'opacity-0'}`}>{errors?.idSucursales}</h1>
                    </div>

                    {/* TODO cambiar el idSucursales cuando tengamos una */}
                    <DetalleGenerico setValues={setValues} idSucursales={idSucursales} values={values} />
                    <h1 className={`font-Roboto h-5 mb-4  flex text-start justify-start text-red-600 transition-all duration-500 ${errors?.detalles || 'opacity-0'}`}>{errors?.detalles}</h1>

                    {/* {articulosInput()} */}
                    <ImageInput files={files} setFiles={setFiles} key={1} id={values.id} imagenes={values.imagenes} />
                </div>
            </div>

            <button className={`btn btn-wide btn-success text-white ${subiendo && 'btn-disabled animate-pulse'}`}
                onClick={handleSubmit}>
                {subiendo ? 'Subiendo...' : 'Enviar'}
            </button>
        </div>
    )
}

export default PromoForm