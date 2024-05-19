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

interface IForm {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    method: string,
}

type FormState = {
    [key: string]: any; //Para poder leer el FormState desde useForm
    id: number,
    denominacion: string,
    precioVenta: number,
    precioCompra: number,
    imagenes: [] //Falta tipar
    unidadMedida: IUnidadMedida;
    stockActual: number,
    stockMaximo: number,
    stockMinimo: number,
    esParaElaborar: boolean,
};

//@ts-ignore
class GenericBackend extends BackendClient<T> { } //Métodos genéricos 

const AInsumoForm: FC<IForm> = ({ open, setOpen, method }) => {

    const backend = new GenericBackend(); //Objeto de BackendClient

    const [loaded, setLoaded] = useState<boolean>(false);

    //REDUX 

    const initialValues = useAppSelector((state) => state.GlobalInitialValues.data);

    const dispatch = useAppDispatch();

    //USE FORM

    const { handleChange, values, resetForm, handleChoose, handleFileDrop } = useForm<FormState>(initialValues)

    const postArticulo = async (data: FormState) => {

        if (method === 'POST') {
            try {
                //TODO Cambiar el método para que coincida con el backend
                const res: IArticuloInsumo = await backend.post("http://localhost:8081/ArticuloInsumo", data);
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
                const res: IArticuloInsumo = await backend.put(`http://localhost:8081/ArticuloInsumo/${data.id}`, data);
                dispatch(setGlobalUpdated(true))
                setOpen(false);
            } catch (error) {
                console.error(error)
            }
        }
    }

    console.log(values);

    const handleSubmit = () => {
        console.log("A")
        console.log(values);
        postArticulo(values);
        resetForm();
    }

    //Manejo del input UNIDAD MEDIDA

    const [unidadSeleccionada, setUnidadSeleccionada] = useState<IUnidadMedida | undefined>();

    const [openUnidad, setOpenUnidad] = useState<boolean>(false);

    return (
        <div className='w-full flex flex-col items-center justify-center space-y-4 p-10 '
            onSubmit={handleSubmit}
        >
            <div className='w-full flex justify-end '>
                <h1 className='flex text-end justify-end bg-red-600 btn btn-error rounded-full text-white text-xl cursor-pointer w-min'
                    onClick={() => { setOpen(false), resetForm() }}>X</h1>
            </div>

            <h2 className='text-3xl font-Roboto'>Agrega tu articulo</h2>
            {/*Mapeo los objetos que traigo al formulario, dependiendo de cada objeto, genero un input distinto */}

            <div className={`w-full h-auto`}>
                <div className="relative z-0 w-full mb-5 group">
                    <div className='w-full flex'>
                        {genericInput('denominacion', "text", values.denominacion, handleChange)}
                        {genericInput('descripcion', 'text', values.descripcion, handleChange)}
                    </div>

                    <div className='flex justify-center w-full'>
                        {genericInput('precioVenta', 'number', values.precioVenta, handleChange)}
                        {genericInput('precioCompra', 'number', values.precioCompra, handleChange)}
                    </div>

                    <div className='flex justify-center w-full'>
                        {genericInput('stockActual', 'number', values.stockActual, handleChange)}
                        {genericInput('stockMaximo', 'number', values.stockMaximo, handleChange)}
                        {genericInput('stockMinimo', 'number', values.stockMinimo, handleChange)}
                    </div>


                    <div className='w-full flex flex-col justify-center '>
                        <div className='w-full'>
                            <UnidadMedidaInput loaded={loaded} openUnidad={openUnidad}
                                setLoaded={setLoaded} setOpenUnidad={setOpenUnidad} setUnidadSeleccionada={setUnidadSeleccionada}
                                handleChoose={handleChoose}
                                key={1} />
                        </div>
                    </div>
                    <div className='w-full flex justify-center flex-col '>
                        <DragDrop onDrop={handleFileDrop} />
                        {booleanInput('esParaElaborar', 'boolean', values.esParaElaborar, handleChange, 'Es para elaborar', 'No es para elaborar')}
                    </div>

                </div>
            </div>

            <button className='bg-red-600 text-white px-4 py-2 rounded-md active:scale-95 transition-all'
                onClick={handleSubmit}>Enviar</button>
        </div>
    )
}

export default AInsumoForm