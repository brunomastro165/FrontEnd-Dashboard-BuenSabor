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

    const [errors, setErrors] = useState<any>({});

    const validationSchema = Yup.object().shape({
        denominacion: Yup.string().required('La denominación es requerida'),
        descripcion: Yup.string().required('La descripción es requerida'),
        precioVenta: Yup.number()
            .typeError('El precio de venta debe ser un número')
            .required('El precio de venta es requerido'),
        precioCompra: Yup.number()
            .typeError('El precio de compra debe ser un número')
            .required('El precio de compra es requerido'),
        stockActual: Yup.number()
            .typeError('El stock actual debe ser un número')
            .required('El stock actual es requerido'),
        stockMaximo: Yup.number()
            .typeError('El stock máximo debe ser un número')
            .required('El stock máximo es requerido'),
        stockMinimo: Yup.number()
            .typeError('El stock mínimo debe ser un número')
            .required('El stock mínimo es requerido'),
        esParaElaborar: Yup.boolean().required('Este campo es requerido'),
        unidadMedida: Yup.object().shape({
            denominacion: Yup.string().required('Debe seleccionar una unidad de medida'),
            id: Yup.number().required('Debe seleccionar una unidad de medida')
        }).required('Debe seleccionar una unidad de medida')
    });

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


    const handleSubmit = async () => {
        try {
            await validationSchema.validate(values, { abortEarly: false });
            postArticulo(values);
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
    };

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
                    <div className='w-full flex md:space-x-5'>
                        <div className='flex flex-col w-full '>
                            {genericInput('denominacion', "text", values.denominacion, handleChange)}
                            {errors.denominacion && <h1 className='font-Roboto text-red-600'>{errors.denominacion}</h1>}
                        </div>

                        <div className='flex flex-col w-full'>
                            {genericInput('descripcion', 'text', values.descripcion, handleChange)}
                            {errors.descripcion && <h1 className='font-Roboto text-red-600'>{errors.descripcion}</h1>}
                        </div>
                    </div>

                    <div className='flex justify-center w-full md:space-x-5'>
                        <div className='flex flex-col w-full '>
                            {genericInput('precioVenta', 'number', values.precioVenta, handleChange)}
                            {errors.precioVenta && <h1 className='font-Roboto text-red-600'>{errors.precioVenta}</h1>}
                        </div>

                        <div className='flex flex-col w-full'>
                            {genericInput('precioCompra', 'number', values.precioCompra, handleChange)}
                            {errors.precioCompra && <h1 className='font-Roboto text-red-600'>{errors.precioCompra}</h1>}
                        </div>
                    </div>

                    <div className='flex justify-center w-full space-x-4'>
                        <div className='flex flex-col w-full '>
                            {genericInput('stockActual', 'number', values.stockActual, handleChange)}
                            {errors.stockActual && <h1 className='font-Roboto text-red-600 text-sm'>{errors.stockActual}</h1>}
                        </div>

                        <div className='flex flex-col w-full '>
                            {genericInput('stockMaximo', 'number', values.stockMaximo, handleChange)}
                            {errors.stockMaximo && <h1 className='font-Roboto text-red-600 text-sm'>{errors.stockMaximo}</h1>}
                        </div>

                        <div className='flex flex-col w-full '>
                            {genericInput('stockMinimo', 'number', values.stockMinimo, handleChange)}
                            {errors.stockMaximo && <h1 className='font-Roboto text-red-600 text-sm'>{errors.stockMaximo}</h1>}
                        </div>
                    </div>

                    <div className='w-full flex flex-col justify-center '>
                        <div className='w-full'>

                            <div className='flex flex-col justify-center'>
                                <UnidadMedidaInput loaded={loaded} openUnidad={openUnidad}
                                    setLoaded={setLoaded} setOpenUnidad={setOpenUnidad} setUnidadSeleccionada={setUnidadSeleccionada}
                                    handleChoose={handleChoose}
                                    key={1} />
                                {errors.unidadMedida?.denominacion && <h1 className='font-Roboto text-red-600 text-sm'>{errors.unidadMedida?.denominacion}</h1>}
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex justify-center flex-col '>

                        <div className='flex flex-col'>
                            <DragDrop onDrop={handleFileDrop} />
                            {booleanInput('esParaElaborar', 'boolean', values.esParaElaborar, handleChange, 'Es para elaborar', 'No es para elaborar')}
                            {errors.esParaElaborar && <h1 className='font-Roboto text-red-600 text-sm mt-2'>{errors.esParaElaborar}</h1>}
                        </div>
                    </div>

                </div>
            </div>

            <button className='bg-red-600 text-white px-4 py-2 rounded-md active:scale-95 transition-all'
                onClick={handleSubmit}>Enviar</button>
        </div>
    )
}

export default AInsumoForm