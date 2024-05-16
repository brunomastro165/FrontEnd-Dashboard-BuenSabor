import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useForm } from '../../../hooks/useForm'
import { ISucursal } from '../../../types/Sucursal'
import { booleanInput, genericInput } from './Inputs/GenericInput';
import { BackendClient } from '../../../services/BackendClient';
import { IEmpresa } from '../../../types/Empresa';
import { IUnidadMedida } from '../../../types/UnidadMedida';
import DragDrop from './Inputs/FileInput';
import { IArticuloInsumo } from '../../../types/ArticuloInsumo';
import { useAppSelector } from '../../../hooks/redux';

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
    esParaElaborar: boolean,
};

//@ts-ignore
class GenericBackend extends BackendClient<T> { } //Métodos genéricos 

const AInsumoForm: FC<IForm> = ({ open, setOpen }) => {

    const backend = new GenericBackend(); //Objeto de BackendClient

    const [loaded, setLoaded] = useState<boolean>(false);

    //const [selectedSucursales, setSelectedSucursales] = useState<ISucursal[] | undefined>([]);

    const initialValues = useAppSelector((state) => state.GlobalInitialValues.data);

    const { handleChange, values, resetForm, handleChoose, handleFileDrop } = useForm<FormState>(initialValues)

    const handleSubmit = () => {
        console.log("A")
        console.log(values);
        resetForm();
    }

    //Manejo del input UNIDAD MEDIDA

    const [unidadesMedida, setUnidadesMedida] = useState<IUnidadMedida[]>([]);

    const [unidadSeleccionada, setUnidadSeleccionada] = useState<IUnidadMedida | undefined>();


    const getUnidades = async () => {
        const res: IUnidadMedida[] = await backend.getAll("https://backend-jsonserver-1.onrender.com/unidadesMedidas");
        setUnidadesMedida(res);
        setLoaded(true);
    }

    useEffect(() => {
        getUnidades();
    }, [loaded])


    const unidadInput = () => {
        return (
            <>
                <div className='font-Roboto text-xl'>Unidades de medida: </div>
                {unidadesMedida.map((unidad, index) => (
                    <div key={index}>
                        <input
                            type="radio"
                            id={`unidadMedida${index}`}
                            name='unidadMedida'
                            value={unidad.denominacion}

                            //@ts-ignore
                            onChange={(e) => handleChoose(e, unidadesMedida, setUnidadSeleccionada, 'denominacion', 'unidadMedida')}
                        //onClick={() => setSelected(unidad.denominacion)}
                        //className={`peer ${selected === unidad.denominacion ? 'p-12' : ''}`}
                        //checked={medidaSeleccionada?.denominacion === unidad.denominacion}
                        />
                        <label htmlFor={`unidadMedida${index}`} className="ml-2">
                            {unidad.denominacion}
                        </label>
                    </div>
                ))}
            </>
        )
    }

    //console.log(articulosInsumo)

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

            <div className='w-full'>

                <div className="relative z-0 w-full mb-5 group">
                    {genericInput('denominacion', "text", values.denominacion, handleChange)}
                    {genericInput('descripcion', 'text', values.descripcion, handleChange)}
                    {genericInput('precioVenta', 'number', values.precioVenta, handleChange)}
                    {genericInput('precioCompra', 'number', values.precioCompra, handleChange)}
                    {genericInput('stockActual', 'number', values.stockActual, handleChange)}
                    {genericInput('stockMaximo', 'number', values.stockMaximo, handleChange)}
                    {unidadInput()}
                    <DragDrop onDrop={handleFileDrop} />
                    {booleanInput('esParaElaborar', 'boolean', values.esParaElaborar, handleChange, 'Es para elaborar', 'No es para elaborar')}
                </div>

            </div>

            <button className='bg-red-600 text-white px-4 py-2 rounded-md active:scale-95 transition-all'
                onClick={handleSubmit}>Enviar</button>
        </div>
    )
}

export default AInsumoForm