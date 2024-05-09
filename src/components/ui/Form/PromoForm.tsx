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
import { IArticuloManufacturado } from '../../../types/ArticuloManufacturado';
import { IImagen } from '../../../types/Imagen';

interface IForm {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

type FormState = {
    [key: string]: any; //Para poder leer el FormState desde useForm
    id: number,
    denominacion: string,
    fechaDesde: string,
    fechaHasta: string,
    horaDesde: string,
    horaHasta: string,
    descripcionDescuento: string,
    precioPromocional: number,
    tipoPromocion: string,
    articulosManufacturados: IArticuloManufacturado[] | null,
    imagen: IImagen | null
};

class GenericBackend extends BackendClient<T> { } //Métodos genéricos 

const PromoForm: FC<IForm> = ({ open, setOpen }) => {

    const backend = new GenericBackend(); //Objeto de BackendClient

    const [loaded, setLoaded] = useState<boolean>(false);


    //const [selectedSucursales, setSelectedSucursales] = useState<ISucursal[] | undefined>([]);

    const { handleChange, values, resetForm, handleSelect, handleChoose, handleFileDrop } = useForm<FormState>({
        id: 0,
        denominacion: '',
        fechaDesde: '',
        fechaHasta: '',
        horaDesde: '',
        horaHasta: '',
        descripcionDescuento: '',
        precioPromocional: 0,
        tipoPromocion: '',
        articulosManufacturados: null,
        imagen: null,
    })

    const handleSubmit = () => {
        console.log("A")
        console.log(values);
        resetForm();
    }


    //Manejo del input UNIDAD MEDIDA

    const [articulosManufacturados, setArticulosManufacturados] = useState<IArticuloManufacturado[]>([]);

    const [articuloSeleccionado, setArticuloSeleccionado] = useState<IArticuloManufacturado | undefined>();

    const [articulosSeleccionados, setArticulosSeleccionados] = useState<IArticuloManufacturado[] | undefined>([]);

    const getArticulos = async () => {
        const res: IArticuloManufacturado[] = await backend.getAll("https://backend-jsonserver-1.onrender.com/articulosManufacturados");
        setArticulosManufacturados(res);
        setLoaded(true);
    }

    useEffect(() => {
        getArticulos();
    }, [loaded])


    const articulosInput = () => {
        return (
            <>
                <div className='font-Roboto text-xl'>Agrega articulos a la promoción: </div>
                {articulosManufacturados.map((articulo, index) => (
                    <div key={index}>
                        <input
                            multiple
                            type="checkbox"
                            id={`sucursales${index}`}
                            name='sucursales'
                            value={articulo.denominacion}
                            onChange={(e) => handleSelect(e, articulosManufacturados, articulosSeleccionados, setArticulosSeleccionados, 'denominacion', 'articulosManufacturados')}
                        //onClick={() => setSelected(unidad.denominacion)}
                        //className={`peer ${selected === unidad.denominacion ? 'p-12' : ''}`}
                        //checked={medidaSeleccionada?.denominacion === unidad.denominacion}
                        />
                        <label htmlFor={`sucursales${index}`} className="ml-2">
                            {articulo.denominacion}
                        </label>
                    </div>
                ))}
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

            <h2 className='text-3xl font-Roboto'>Agrega tu promoción</h2>
            {/*Mapeo los objetos que traigo al formulario, dependiendo de cada objeto, genero un input distinto */}

            <div className='w-full'>
                <div className="relative z-0 w-full mb-5 group">
                    {genericInput('denominacion', "text", values.denominacion, handleChange)}
                    {genericInput('fechaDesde', 'date', values.fechaDesde, handleChange)}
                    {genericInput('fechaHasta', 'date', values.fechaHasta, handleChange)}
                    {genericInput('horaDesde', 'time', values.horaDesde, handleChange)}
                    {genericInput('horaHasta', 'time', values.horaHasta, handleChange)}
                    {genericInput('descripcionDescuento', 'text', values.descripcionDescuento, handleChange)}
                    {genericInput('precioPromocional', 'number', values.precioPromocional, handleChange)}
                    {genericInput('tipoPromocion', 'text', values.tipoPromocion, handleChange)}
                    {articulosInput()}
                    <DragDrop onDrop={handleFileDrop} />
                </div>
            </div>

            <button className='bg-red-600 text-white px-4 py-2 rounded-md active:scale-95 transition-all'
                onClick={handleSubmit}>Enviar</button>
        </div>
    )
}

export default PromoForm