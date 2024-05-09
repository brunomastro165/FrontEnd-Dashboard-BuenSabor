//@ts-nocheck
import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useForm } from '../../../hooks/useForm'
import { ISucursal } from '../../../types/Sucursal'
import { genericInput } from './Inputs/GenericInput';
import { BackendClient } from '../../../services/BackendClient';
import { IEmpresa } from '../../../types/Empresa';
import { IUnidadMedida } from '../../../types/UnidadMedida';
import DragDrop from './Inputs/FileInput';
import { IArticuloInsumo } from '../../../types/ArticuloInsumo';

interface IForm {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

type FormState = {
    [key: string]: any; //Para poder leer el FormState desde useForm
    id: number,
    denominacion: string,
    precioVenta: number,
    imagenes: [] //Falta tipar
    unidadMedida: IUnidadMedida;
    descripcion: string,
    tiempoEstimadoEnMinutos: number,
    preparacion: string,
    articuloManufacturadoDetalles: [], //Falta tipar
    stock: number,
};

class GenericBackend extends BackendClient<T> { } //Métodos genéricos 

const AManufacturadoForm: FC<IForm> = ({ open, setOpen }) => {

    const backend = new GenericBackend(); //Objeto de BackendClient


    const [loaded, setLoaded] = useState<boolean>(false);

    //const [selectedSucursales, setSelectedSucursales] = useState<ISucursal[] | undefined>([]);

    const { handleChange, values, resetForm, handleSelect, handleChoose, handleFileDrop } = useForm<FormState>({
        id: 0,
        denominacion: '',
        descripcion: '',
        articuloManufacturadoDetalles: [], //Podría tiparse
        imagenes: [], //Podría tiparse
        precioVenta: 0,
        preparacion: '',
        tiempoEstimadoEnMinutos: 0,
        stock: 0,
        unidadMedida: {
            id: 0,
            denominacion: '',
        }
    })

    const handleSubmit = () => {
        console.log("A")
        console.log(values);
        resetForm();
    }


    //Manejo del input UNIDAD MEDIDA

    const [unidadesMedida, setUnidadesMedida] = useState<IUnidadMedida[]>([]);

    const [unidadSeleccionada, setUnidadSeleccionada] = useState<IUnidadMedida | undefined>();


    const getUnidades = async () => {
        const res: IUnidadMedida[] = await backend.getAll("http://localhost:8080/unidadesMedidas");
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
                            id={`sucursales${index}`}
                            name='sucursales'
                            value={unidad.denominacion}
                            onChange={(e) => handleChoose(e, unidadesMedida, setUnidadSeleccionada, 'denominacion', 'unidadMedida')}
                        //onClick={() => setSelected(unidad.denominacion)}
                        //className={`peer ${selected === unidad.denominacion ? 'p-12' : ''}`}
                        //checked={medidaSeleccionada?.denominacion === unidad.denominacion}
                        />
                        <label htmlFor={`sucursales${index}`} className="ml-2">
                            {unidad.denominacion}
                        </label>
                    </div>
                ))}
            </>
        )
    }

    //Manejo del input DETALLE

    const [articulosInsumo, setArticulosInsumo] = useState<IArticuloInsumo[]>([])

    const [articuloSeleccionado, setArticuloSeleccionado] = useState<IArticuloInsumo>();

    const getInsumos = async () => {
        const res: IArticuloInsumo[] = await backend.getAll("http://localhost:8080/articulosInsumos");
        setArticulosInsumo(res);
        //setLoaded(true);
    }

    useEffect(() => {
        getInsumos();
    }, [])

    console.log("este")
    //console.log(articulosInsumo)

    const [test, setTest] = useState<number[]>([]);


    const [array, setArray] = useState<[]>([]);


    //SUMAR LOS ELEMENTOS A UN ARRAY, USAR UN HANDLECHANGE MODIFICADO PARA QUE CUANDO SE 
    //SUMEN LOS ELEMENTOS SE LLAME A LA FUNCIÓN HANDLESELECT
    const aMDetalle = () => {

        const handleClick = () => {
            setArray(prevArray => [...prevArray, '']);
        };

        return (
            <>
                <div className='font-Roboto text-xl'>Articulos insumo: </div>
                <button className='btn' onClick={handleClick}>Agregar insumo</button>
                {array.map((cantidad, index) => (articulosInsumo
                    .filter((articulo) => articulo.esParaElaborar)
                    .map((articulo) => (
                        <div key={index}>
                            <input
                                multiple
                                type="radio"
                                id={`articuloInsumo${index}`}
                                name='articuloInsumo'
                                value={articulo.denominacion}
                                onChange={(e) => handleChoose(e, articulosInsumo, setArticuloSeleccionado, 'denominacion', 'articuloManufacturadoDetalles')}
                            //onClick={() => setSelected(unidad.denominacion)}
                            //className={`peer ${selected === unidad.denominacion ? 'p-12' : ''}`}
                            //checked={medidaSeleccionada?.denominacion === unidad.denominacion}
                            />
                            {articuloSeleccionado?.denominacion === articulo.denominacion[index] && <input type="number" />}

                            <label htmlFor={`articuloInsumo${index}`} className="ml-2">
                                {articulo.denominacion}
                            </label>
                        </div>
                    ))))

                }
            </>
        )
    }

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
                    {genericInput('preparacion', 'text', values.preparacion, handleChange)}
                    {genericInput('tiempoEstimadoEnMinutos', 'number', values.tiempoEstimadoEnMinutos, handleChange)}
                    {genericInput('stock', 'number', values.tiempoEstimadoEnMinutos, handleChange)}
                    {unidadInput()}
                    <DragDrop onDrop={handleFileDrop} />
                    {aMDetalle()}
                </div>
            </div>

            <button className='bg-red-600 text-white px-4 py-2 rounded-md active:scale-95 transition-all'
                onClick={handleSubmit}>Enviar</button>
        </div>
    )
}

export default AManufacturadoForm