import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useForm } from '../../../hooks/useForm'
import { ISucursal } from '../../../types/Sucursal'
import { booleanInput, genericInput } from './Inputs/GenericInput';
import { BackendClient } from '../../../services/BackendClient';
import { IEmpresa } from '../../../types/Empresa';
import { ICategoria } from '../../../types/Categoria';
import { IArticuloManufacturado } from '../../../types/ArticuloManufacturado';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { ICategoriaShort } from '../../../types/ShortDtos/CategoriaShort';
import { useParams } from 'react-router-dom';
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';
import SucursalesInput from './Inputs/SucursalesInput';
import * as Yup from 'yup'
import { validationCategoria } from './Validaciones/CategoriaValidacion';
import { useAuth0 } from '@auth0/auth0-react';
import { errorMessage, successMessage } from '../../toasts/ToastAlerts';

interface IForm {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    method: string,
}

type FormState = {
    [key: string]: any;
    id: number;
    denominacion: string;
    idSucursales: number[];
    esInsumo: boolean;
    esPadre: boolean;
    //articulosManufacturados: IArticuloManufacturado[] | null;
    //subCategorias: ICategoria[];
};

// export interface ICategoriaShort {
//     id: number;
//     denominacion: string;
//     idSucursales: number[];
//     esInsumo: boolean;
//     // subCategorias: ICategoria[];
// }

class GenericBackend extends BackendClient<FormState> { } //Métodos genéricos 

const CategoriaForm: FC<IForm> = ({ open, setOpen, method }) => {

    const { getAccessTokenSilently } = useAuth0()

    const [subiendo, setSubiendo] = useState<boolean>(false);

    const backend = new GenericBackend(); //Objeto de BackendClient

    //REDUX

    const initialValues = useAppSelector((state) => state.GlobalInitialValues.data);

    const unidades = useAppSelector((state) => state.UnidadesMedida.UnidadesMedida)

    const updated = useAppSelector((state) => state.GlobalUpdated.updated)

    const dispatch = useAppDispatch();

    //ROUTER DOM

    const { idSucursales, idEmpresa } = useParams();

    //Handler de errores

    const [errors, setErrors] = useState<any>({})

    const succes = () => {
        dispatch(setGlobalUpdated(true))
        setSubiendo(false)
        setOpen(false);
        resetForm();
        dispatch(setGlobalUpdated(true));
        successMessage();
    }


    const postCategoria = async (data: FormState) => {
        if (method === 'POST') {
            try {
                setSubiendo(true)
                const res: FormState = await backend.post(`${import.meta.env.VITE_LOCAL}categoria`, data, getAccessTokenSilently);
                succes()
            } catch (error) {
                setSubiendo(false)
                errorMessage()
                console.error(error)
            }
        }
        else if (method === 'PUT') {
            try {
                const res: FormState = await backend.post(`${import.meta.env.VITE_LOCAL}categoria/${data.id}`, data, getAccessTokenSilently);
                dispatch(setGlobalUpdated(true))
                setOpen(false);
            } catch (error) {
                console.error(error)
            }
        }
        else if (method === 'SUBPUT') {
            try {
                setSubiendo(true)
                const res: FormState = await backend.put(`${import.meta.env.VITE_LOCAL}categoria/addSubCategoria/${data.id}`, data, getAccessTokenSilently);
                succes()
            } catch (error) {
                setSubiendo(false)
                errorMessage()
                console.error(error)
            }
        }
    }

    //const [selectedSucursales, setSelectedSucursales] = useState<ISucursal[] | undefined>([]);

    const { handleChange, values, resetForm, setValues, handleSelect } = useForm<FormState>(initialValues)

    const handleSubmit = async () => {

        try {
            await validationCategoria.validate(values, { abortEarly: false })
            await postCategoria(values)
            dispatch(setGlobalUpdated(true));
            resetForm();
            setOpen(false);
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

    }

    console.log(values)


    // const articulosInput = () => {
    //     return (
    //         <>
    //             <div className='font-Roboto text-xl'>Productos disponibles para la promoción: </div>
    //             {articulosManufacturados.map((articulo, index) => (
    //                 <div key={index}>
    //                     <input
    //                         multiple
    //                         type="checkbox"
    //                         id={`articulos${index}`}
    //                         name='articulos'
    //                         value={articulo.denominacion}
    //                         onChange={(e) => handleSelect(e, articulosManufacturados, articulosMSeleccionados, setArticulosMSeleccionados, 'denominacion', 'articulosManufacturados')}
    //                     //onClick={() => setSelected(unidad.denominacion)}
    //                     //className={`peer ${selected === unidad.denominacion ? 'p-12' : ''}`}
    //                     //checked={medidaSeleccionada?.denominacion === unidad.denominacion}
    //                     />
    //                     <label htmlFor={`sucursales${index}`} className="ml-2">
    //                         {articulo.denominacion}
    //                     </label>
    //                 </div>
    //             ))}
    //         </>
    //     )
    // }

    console.log(values);

    return (
        <div className='w-full flex flex-col items-center justify-center space-y-4 p-10 '
            onSubmit={handleSubmit}
        >
            <div className='w-full flex justify-end '>
                <h1 className='flex text-end justify-end bg-red-600 btn btn-error rounded-full text-white text-xl cursor-pointer w-min'
                    onClick={() => { setOpen(false), resetForm() }}>X</h1>
            </div>

            <h2 className='text-3xl font-Roboto'>Agrega tu categoría</h2>
            {/*Mapeo los objetos que traigo al formulario, dependiendo de cada objeto, genero un input distinto */}

            <div className='w-full'>

                <div className="relative z-0 w-full mb-5 group space-y-4">
                    {genericInput('denominacion', "text", values.denominacion, handleChange, errors)} {/* Nombre */}
                    {method === 'POST' && booleanInput('esInsumo', 'boolean', values.esInsumo, handleChange, 'Es insumo', 'No es insumo', errors)}

                    <div className='w-full flex flex-col'>
                        {method === 'POST' && <SucursalesInput idEmpresa={idEmpresa} setValues={setValues} values={values} />}
                        <h1 className={`font-Roboto h-5 mb-4  flex text-start justify-start text-red-600 transition-all duration-500 ${errors?.idSucursales || 'opacity-0'}`}>{errors?.idSucursales}</h1>
                    </div>
                </div>


            </div>

            <button className={`btn btn-wide btn-success text-white ${subiendo && 'btn-disabled animate-pulse'}`}
                onClick={handleSubmit}>
                {subiendo ? 'Subiendo...' : 'Enviar'}
            </button>
        </div>
    )
}

export default CategoriaForm