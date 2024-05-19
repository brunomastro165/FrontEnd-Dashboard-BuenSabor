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

interface IForm {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    method: string,
}

type FormState = {
    [key: string]: any; //Para poder leer el FormState desde useForm
    id: number,
    denominacion: string,
    eliminado: boolean
};

//@ts-ignore
class GenericBackend extends BackendClient<T> { } //Métodos genéricos 

const UnidadMedidaForm: FC<IForm> = ({ open, setOpen, method }) => {

    const backend = new GenericBackend(); //Objeto de BackendClient

    const [loaded, setLoaded] = useState<boolean>(false);

    //REDUX 

    const initialValues = useAppSelector((state) => state.GlobalInitialValues.data);

    const dispatch = useAppDispatch();

    //USE FORM

    const { handleChange, values, resetForm, handleChoose, handleFileDrop } = useForm<FormState>(initialValues)

    const postUnidad = async (data: FormState) => {

        if (method === 'POST') {
            try {
                //TODO Cambiar el método para que coincida con el backend
                const res: IUnidadMedida = await backend.post("http://localhost:8081/UnidadMedida", data);
                dispatch(setGlobalUpdated(true))
                setOpen(false);
                console.log(res)
            } catch (error) {
                console.error(error)
            }
        }
        else if (method === 'PUT') {
            try {
                //const res: IEmpresaShort = await backend.put(`http://localhost:8081/empresa/${data.id}/short`, data);
                const res: IUnidadMedida = await backend.put(`http://localhost:8081/UnidadMedida/${data.id}`, data);
                dispatch(setGlobalUpdated(true))
                setOpen(false);
            } catch (error) {
                console.error(error)
            }
        }
    }

    const handleSubmit = () => {
        console.log("A")
        console.log(values);
        postUnidad(values);
        resetForm();
    }

    return (
        <div className='w-full flex flex-col items-center justify-center space-y-4 p-10 '
            onSubmit={handleSubmit}
        >
            <div className='w-full flex justify-end '>
                <h1 className='flex text-end justify-end bg-red-600 btn btn-error rounded-full text-white text-xl cursor-pointer w-min'
                    onClick={() => { setOpen(false), resetForm() }}>X</h1>
            </div>

            {/*Mapeo los objetos que traigo al formulario, dependiendo de cada objeto, genero un input distinto */}

            <h1 className='font-Roboto text-xl'>Agrega una unidad de medida</h1>
            <div className='w-full'>

                <div className="relative z-0 w-full mb-5 group">
                    {genericInput('denominacion', "text", values.denominacion, handleChange)}
                </div>

            </div>

            <button className='bg-red-600 text-white px-4 py-2 rounded-md active:scale-95 transition-all'
                onClick={handleSubmit}>Enviar</button>
        </div>
    )
}

export default UnidadMedidaForm