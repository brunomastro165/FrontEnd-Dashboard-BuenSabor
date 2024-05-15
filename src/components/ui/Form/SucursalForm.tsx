//@ts-nocheck
import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useForm } from '../../../hooks/useForm'
import { ISucursal } from '../../../types/Sucursal'
import { genericInput } from './Inputs/GenericInput';
import { booleanInput } from './Inputs/GenericInput';
import { BackendClient } from '../../../services/BackendClient';
import { IEmpresa } from '../../../types/Empresa';
import { ICategoria } from '../../../types/Categoria';
import { useParams } from 'react-router-dom';
import { ISucursalShort } from '../../../types/ShortDtos/SucursalShort';
import { useAppDispatch } from '../../../hooks/redux';
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';

interface IForm {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    data: ISucursalShort;
    method: string
}
// id: number;
// eliminado: boolean;
// nombre: string;
// horarioApertura: string;
// horarioCierre: string;
// casaMatriz: boolean;

type FormState = {
    [key: string]: any;
    id: number;
    eliminado: boolean;
    nombre: string;
    horarioApertura: string;
    horarioCierre: string;
    casaMatriz: boolean;
    idEmpresa: number;
};

//@ts-ignore
class GenericBackend extends BackendClient<T> { } //Métodos genéricos 

const SucursalForm: FC<IForm> = ({ open, setOpen, data, method }) => {

    const dispatch = useAppDispatch()

    const backend = new GenericBackend(); //Objeto de BackendClient

    console.log(data.idEmpresa)

    const postSucursal = async (data: ISucursalShort) => {
        if (method === 'POST') {
            try {
                //TODO CAMBIAR ENDPOINT
                //const res: IEmpresaShort = await backend.post("http://localhost:8081/empresa/short", data);
                const res: IEmpresaShort = await backend.post("http://localhost:8081/sucursal", data);
                dispatch(setGlobalUpdated(true))
            } catch (error) {
                console.error(error)
            }
        }
        else if (method === 'PUT') {
            try {
                //TODO CAMBIAR ENDPOINT
                const res: IEmpresaShort = await backend.put(`http://localhost:8081/sucursal/${data.id}`, data);
                dispatch(setGlobalUpdated(true))
            } catch (error) {
                console.error(error)
            }
        }
    }

    const { handleChange, values, resetForm, setValues, handleSelect } = useForm<FormState>(data)

    const handleSubmit = () => {
        postSucursal(values)
        resetForm();
        setOpen(false)
    }

    // const categoriasInput = () => {
    //     return (
    //         <>
    //             <div className='font-Roboto text-xl'>Categorias disponibles: </div>
    //             {categorias.map((categoria, index) => (
    //                 <div key={index}>
    //                     <input
    //                         multiple
    //                         type="checkbox"
    //                         id={`categoria${index}`}
    //                         name='categorias'
    //                         value={categoria.denominacion}
    //                         onChange={(e) => handleSelect(e, categorias, selectedCategorias, setSelecetedCategorias, 'denominacion', 'categorias')}
    //                     //onClick={() => setSelected(unidad.denominacion)}
    //                     //className={`peer ${selected === unidad.denominacion ? 'p-12' : ''}`}
    //                     //checked={medidaSeleccionada?.denominacion === unidad.denominacion}
    //                     />
    //                     <label htmlFor={`sucursales${index}`} className="ml-2">
    //                         {categoria.denominacion}
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

            <h2 className='text-3xl font-Roboto'>Agrega tu sucursal</h2>
            {/*Mapeo los objetos que traigo al formulario, dependiendo de cada objeto, genero un input distinto */}

            <div className='w-full'>

                <div className="relative z-0 w-full mb-5 group">
                    {genericInput('nombre', "text", values.nombre, handleChange)} {/* Nombre */}
                    {genericInput('horarioApertura', 'time', values.horarioApertura, handleChange)}
                    {genericInput('horarioCierre', 'time', values.horarioCierre, handleChange)}
                    {booleanInput('casaMatriz', 'boolean', values.casaMatriz, handleChange, 'Es casa matriz', 'No es casa matriz')}
                </div>

            </div>

            <button className='bg-red-600 text-white px-4 py-2 rounded-md active:scale-95 transition-all'
                onClick={handleSubmit}>Enviar</button>
        </div>
    )
}

export default SucursalForm