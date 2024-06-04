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
import CategoriaInput from './Inputs/CategoriaInput';
import { subirImagenes } from './Inputs/ImageFunction';
import ImageInput from './Inputs/ImageInput';
import { validationInsumo } from './Validaciones/AInsumoValidacion';


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
    unidadMedida: IUnidadMedida;
    stockActual: number,
    stockMaximo: number,
    stockMinimo: number,
    esParaElaborar: boolean,
    idCategoria: number,
};



//@ts-ignore
class GenericBackend extends BackendClient<T> { } //Métodos genéricos 

type FileWithPreview = File & { preview: string };

const AInsumoForm: FC<IForm> = ({ open, setOpen, method }) => {

    const backend = new GenericBackend(); //Objeto de BackendClient

    const [loaded, setLoaded] = useState<boolean>(false);

    const [errors, setErrors] = useState<any>({});

    //REDUX 

    const initialValues = useAppSelector((state) => state.GlobalInitialValues.data);

    const dispatch = useAppDispatch();

    //USE FORM

    const { handleChange, values, resetForm, handleChoose, handleFileDrop, setValues } = useForm<FormState>(initialValues)


    useEffect(() => {
        setValues((prevValues: any) => {
            const newValues = { ...prevValues, idCategoria: prevValues.categoria?.id };
            delete newValues.categoria;
            return newValues;
        });
    }, [])

    const postArticulo = async (data: FormState) => {

        if (method === 'POST') {
            try {
                console.log("ssdaasddsads")
                //TODO Cambiar el método para que coincida con el backend
                const res: IArticuloInsumo = await backend.postConImagen(`${import.meta.env.VITE_LOCAL}ArticuloInsumo/save`, data, files);
                console.log(res)
                // const subirImagen = await subirImagenes(res.id, values.imagenes)

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
                const res: IArticuloInsumo = await backend.postConImagen(`${import.meta.env.VITE_LOCAL}ArticuloInsumo/save`, data, files);
                dispatch(setGlobalUpdated(true))
                setOpen(false);
            } catch (error) {
                console.error(error)
            }
        }
    }

    const handleSubmit = async () => {
        try {
            await validationInsumo.validate(values, { abortEarly: false });
            await postArticulo(values);
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

    console.log("sex")
    console.log(values)

    //Manejo de las imagenes

    const [files, setFiles] = useState<FileWithPreview[]>([]);

    //Manejo del input UNIDAD MEDIDA

    const [unidadSeleccionada, setUnidadSeleccionada] = useState<IUnidadMedida | undefined>();

    const [openUnidad, setOpenUnidad] = useState<boolean>(false);

    const [idCategoria, setIdCategoria] = useState<number>(0);


    useEffect(() => {

    }, [])

    return (
        <>
            <div className='w-full flex flex-col items-center justify-center space-y-4 p-10 '
                onSubmit={handleSubmit}
            >
                <div className='w-full flex justify-end '>
                    <h1 className='flex text-end justify-end bg-red-600 btn btn-error rounded-full text-white text-xl cursor-pointer w-min'
                        onClick={() => { setOpen(false), resetForm() }}>X</h1>
                </div>

                <h2 className='text-3xl font-Roboto'>Agrega tu insumo</h2>
                {/*Mapeo los objetos que traigo al formulario, dependiendo de cada objeto, genero un input distinto */}

                <div className={`w-full h-auto`}>
                    <div className="relative z-0 w-full mb-5 group">
                        <div className='w-full flex flex-row md:space-x-5'>
                            {genericInput('denominacion', "text", values.denominacion, handleChange, errors)}
                            {genericInput('descripcion', 'text', values.descripcion, handleChange, errors)}
                        </div>

                        <div className='flex justify-center w-full md:space-x-5'>
                            {genericInput('precioVenta', 'number', values.precioVenta, handleChange, errors)}
                            {genericInput('precioCompra', 'number', values.precioCompra, handleChange, errors)}
                        </div>

                        <div className='flex justify-center w-full space-x-4'>
                            {genericInput('stockActual', 'number', values.stockActual, handleChange, errors)}
                            {genericInput('stockMaximo', 'number', values.stockMaximo, handleChange, errors)}
                            {genericInput('stockMinimo', 'number', values.stockMinimo, handleChange, errors)}
                        </div>

                        <div className='w-full flex flex-col justify-center '>
                            <div className='w-full'>

                                <div className='flex flex-col justify-center'>
                                    <UnidadMedidaInput loaded={loaded} openUnidad={openUnidad}
                                        setLoaded={setLoaded} setOpenUnidad={setOpenUnidad} setUnidadSeleccionada={setUnidadSeleccionada}
                                        handleChoose={handleChoose} values={values}
                                        key={1} />
                                    {errors.unidadMedida?.denominacion && <h1 className='font-Roboto text-red-600 text-sm'>{errors.unidadMedida?.denominacion}</h1>}
                                </div>

                                <div className='flex flex-col justify-center'>
                                    <CategoriaInput handleChange={handleChange} setLoaded={setLoaded} setIdCategoria={setIdCategoria}
                                        key={1} value={values.idCategoria} />
                                    {errors.idCategoria && <h1 className='font-Roboto text-red-600'>{errors.idCategoria}</h1>}
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex justify-center flex-col '>

                            <div className='flex flex-col'>
                                <ImageInput files={files} setFiles={setFiles} id={values.id}/>
                                {booleanInput('esParaElaborar', 'boolean', values.esParaElaborar, handleChange, 'Es para elaborar', 'No es para elaborar', errors)}
                            </div>
                        </div>

                    </div>
                </div>

                <button className='bg-red-600 text-white px-4 py-2 rounded-md active:scale-95 transition-all'
                    onClick={handleSubmit}>Enviar</button>
            </div>




        </>
    )
}

export default AInsumoForm