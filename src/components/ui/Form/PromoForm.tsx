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
    imagen: []
};



const PromoForm: FC<IForm> = ({ open, setOpen, method }) => {

    const backend = new BackendMethods(); //Objeto de BackendClient

    const [loaded, setLoaded] = useState<boolean>(false);

    const initialValues = useAppSelector((state) => state.GlobalInitialValues.data)

    const dispatch = useAppDispatch()

    //const [selectedSucursales, setSelectedSucursales] = useState<ISucursal[] | undefined>([]);

    const { handleChange, values, resetForm, handleSelect, handleChoose, handleFileDrop } = useForm<FormState>(initialValues)

    const postPromo = async (data: FormState) => {
        if (method === 'POST') {
            try {
                //TODO Cambiar el método para que coincida con el backend
                const res: IPromos = await backend.postConImagen(`${import.meta.env.VITE_LOCAL}promocion/save`, data, files);
                console.log("response")
                console.log(res)
                // const subirImagen = await subirImagenes(res.id, values.imagenes)
                dispatch(setGlobalUpdated(true))
                setOpen(false);
            } catch (error) {
                console.error(error)
            }
        }
        else if (method === 'PUT') {
            try {
                console.log(data)
                //const res: IEmpresaShort = await backend.put(`http://localhost:8081/empresa/${data.id}/short`, data);
                const res: IPromos = await backend.put(`${import.meta.env.VITE_LOCAL}ArticuloManufacturado/${data.id}`, data) as IPromos;

                console.log(res)
                //  const subirImagen = await subirImagenes(res.id, values.imagenes)

                setOpen(false);

                dispatch(setGlobalUpdated(true))
            } catch (error) {
                console.log("put")
                console.error(error)
            }
        }
    }

    const handleSubmit = () => {
        postPromo(values)
        console.log(values);
        resetForm();
    }


    console.log(values)
    //Manejo de imagenes

    const [files, setFiles] = useState<File[]>([]);

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

                        <div className='flex flex-col w-full'>
                            {genericInput('denominacion', "text", values.denominacion, handleChange)}

                        </div>

                        <div className='flex flex-col w-full'>
                            {genericInput('tipoPromocion', 'text', values.tipoPromocion, handleChange)}

                        </div>

                    </div>


                    <div className='w-full flex flex-col md:flex-row space-x-0 md:space-x-4'>

                        <div className='flex flex-col w-full'>
                            {genericInput('fechaDesde', 'date', values.fechaDesde, handleChange)}
                            {/* YUP */}
                        </div>

                        <div className='flex flex-col w-full'>
                            {genericInput('fechaHasta', 'date', values.fechaHasta, handleChange)}

                        </div>

                    </div>

                    <div className='w-full flex flex-col md:flex-row space-x-0 md:space-x-4'>

                        <div className='flex flex-col w-full'>
                            {genericInput('horaDesde', 'time', values.horaDesde, handleChange)}
                            {/* YUP */}
                        </div>

                        <div className='flex flex-col w-full'>
                            {genericInput('horaHasta', 'time', values.horaHasta, handleChange)}

                        </div>

                    </div>

                    <div className='w-full flex flex-col md:flex-row space-x-0 md:space-x-4'>

                        <div className='flex flex-col w-full'>
                            {genericInput('descripcionDescuento', 'text', values.descripcionDescuento, handleChange)}
                            {/* YUP */}
                        </div>

                        <div className='flex flex-col w-full'>
                            {genericInput('precioPromocional', 'number', values.precioPromocional, handleChange)}
                        </div>

                    </div>


                    {/* {articulosInput()} */}
                    <ImageInput files={files} setFiles={setFiles} key={1} />
                </div>
            </div>

            <button className='bg-red-600 text-white px-4 py-2 rounded-md active:scale-95 transition-all'
                onClick={handleSubmit}>Enviar</button>
        </div>
    )
}

export default PromoForm