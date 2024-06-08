import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useForm } from '../../../hooks/useForm'
import { genericInput } from './Inputs/GenericInput';
import { BackendClient } from '../../../services/BackendClient';
import { IUnidadMedida } from '../../../types/UnidadMedida';
import DragDrop from './Inputs/FileInput';
import { IArticuloInsumo } from '../../../types/ArticuloInsumo';
import { IArticuloManufacturadoDetalle } from '../../../types/ArticuloManufacturadoDetalle';
import { IArticuloManufacturado } from '../../../types/ArticuloManufacturado';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';
import UnidadMedidaForm from './UnidadMedidaForm';
import { setUnidades } from '../../../redux/slices/unidadMedida';
import UnidadMedidaInput from './Inputs/UnidadMedidaInput';
import * as Yup from 'yup'
import CategoriaInput from './Inputs/CategoriaInput';
import { subirImagenes } from './Inputs/ImageFunction';
import { useParams } from 'react-router-dom';
import DetalleInput from './Inputs/DetalleInput';
import ImageInput from './Inputs/ImageInput';
import DetalleGenerico from './Inputs/DetalleGenerico';
import { validationManufacturado } from './Validaciones/AManufacturadoValidacion';

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
    unidadMedida: IUnidadMedida;
    descripcion: string,
    tiempoEstimadoMinutos: number,
    preparacion: string,
    articuloManufacturadoDetalles: IArticuloManufacturadoDetalle[] //Falta tipar
    stock: number,
    eliminado: boolean,
    idCategoria: number,
    imagenes: any[],
};

//@ts-ignore
class GenericBackend extends BackendClient<T> { } //Métodos genéricos 

type FileWithPreview = File & { preview: string };

const AManufacturadoForm: FC<IForm> = ({ open, setOpen, method }) => {

    const [subiendo, setSubiendo] = useState<boolean>(false);

    const { idSucursales } = useParams();

    const backend = new GenericBackend(); //Objeto de BackendClient

    const [loaded, setLoaded] = useState<boolean>(false);

    const [errors, setErrors] = useState<any>({});

    // const validationSchema = Yup.object().shape({
    //     denominacion: Yup.string().required('La denominación es requerida'),
    //     descripcion: Yup.string().required('La descripción es requerida'),
    //     precioVenta: Yup.number().required('El precio de venta es requerido').min(0, 'El precio de venta debe ser mayor o igual a 0'),
    //     preparacion: Yup.string().required('La preparación es requerida'),
    //     tiempoEstimadoMinutos: Yup.number().required('El tiempo estimado en minutos es requerido').min(1, 'El tiempo estimado debe ser mayor a 0'),
    //     stock: Yup.number().required('El stock es requerido').min(0, 'El stock debe ser mayor o igual a 0'),
    //     unidadMedida: Yup.object().shape({
    //         denominacion: Yup.string().required('Debe seleccionar una unidad de medida'),
    //         id: Yup.number().required('Debe seleccionar una unidad de medida')
    //     }).required('Debe seleccionar una unidad de medida'),
    //     idCategoria: Yup.number().required('Debe seleccionar una categoría').moreThan(0, 'Debe seleccionar una categoría')
    // });

    //REDUX

    const initialValues = useAppSelector((state) => state.GlobalInitialValues.data);

    const unidades = useAppSelector((state) => state.UnidadesMedida.UnidadesMedida)

    const updated = useAppSelector((state) => state.GlobalUpdated.updated)

    const dispatch = useAppDispatch();

    //USE FORM

    const { handleChange, values, resetForm, handleSelect, handleChoose, handleFileDrop, setValues } = useForm<FormState>(initialValues) //Form genérico

    console.log("INITIAL VALUES")
    console.log(initialValues)
    const postArticulo = async (data: FormState) => {
        if (method === 'POST') {
            try {
                setSubiendo(true)
                //TODO Cambiar el método para que coincida con el backend
                const res: IArticuloManufacturado = await backend.postConImagen(`${import.meta.env.VITE_LOCAL}ArticuloManufacturado/save`, data, files);
                console.log(res)
                // const subirImagen = await subirImagenes(res.id, values.imagenes)
                dispatch(setGlobalUpdated(true))
                setSubiendo(false);
                setOpen(false);
            } catch (error) {
                setSubiendo(false)
                console.error(error)
            }
        }
        else if (method === 'PUT') {
            try {
                setSubiendo(true)
                console.log("PUT")
                console.log(data)
                //const res: IEmpresaShort = await backend.put(`http://localhost:8081/empresa/${data.id}/short`, data);
                const res: IArticuloManufacturado = await backend.putConImagen(`${import.meta.env.VITE_LOCAL}ArticuloManufacturado/save/${values.id}`, data, files);

                //  const subirImagen = await subirImagenes(res.id, values.imagenes)

                //setOpen(false);

                dispatch(setGlobalUpdated(true))
            } catch (error) {
                setSubiendo(false)
                console.error(error)
            }
        }
    }

    const handleSubmit = async () => {
        try {
            await validationManufacturado.validate(values, { abortEarly: false });
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


    //Manejo del input UNIDAD MEDIDA

    //const [unidadesMedida, setUnidadesMedida] = useState<IUnidadMedida[]>([]);

    const getUnidades = async () => {
        try {
            const res: IUnidadMedida[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}UnidadMedida`);
            dispatch(setUnidades(res))
            setLoaded(true);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUnidades();
    }, [loaded, updated])

    const [openUnidad, setOpenUnidad] = useState<boolean>(false);

    const [unidadSeleccionada, setUnidadSeleccionada] = useState<IUnidadMedida | undefined>();

    //SECCIÓN PARA MANEJAR LOS AMDETALLES

    const [filtroDetalle, setFiltroDetalle] = useState<IArticuloInsumo[]>([]);

    const [articulosInsumo, setArticulosInsumo] = useState<IArticuloInsumo[]>([])

    const [articuloSeleccionado, setArticuloSeleccionado] = useState<IArticuloInsumo>();

    const [idCategoria, setIdCategoria] = useState<number>(0);


    // const [aMDetalles, setAmDetalles] = useState<IArticuloManufacturadoDetalle[]>([])



    // const getInsumos = async () => {
    //     //const res: IArticuloInsumo[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}ArticuloInsumo`);
    //     //setArticulosInsumo(res);
    //     //setFiltroDetalle(res);
    //     //setLoaded(true);
    // }

    // useEffect(() => {
    //     getInsumos();
    // }, [])

    // const [aMDetalles, setAmDetalles] = useState<IArticuloManufacturadoDetalle[]>([])

    // const [popUp, setPopUp] = useState<boolean>(false);

    // //En esta función pedimos el valor del número ingresado por el usuario y el valor de la denominación del articulo insumo
    // const handleQuantityChange = (cantidad: number, denominacion: string) => {

    //     let existe: boolean = false;

    //     let newDetalles = aMDetalles.map(detalle => {
    //         //Si el insumo ya existe dentro de la lista de detalles, solo actualizamos su cantidad
    //         if (detalle.articuloInsumo?.denominacion === denominacion) {
    //             existe = true;
    //             return {
    //                 ...detalle,
    //                 cantidad: cantidad === 1 ? detalle.cantidad + 1 : detalle.cantidad - 1
    //             };
    //         } else {
    //             return detalle;
    //         }
    //     });

    //     //Si el insumo no existe y e es 1, lo añadimos a la lista con cantidad 1
    //     if (!existe && cantidad === 1) {
    //         const selectedArticulo: IArticuloInsumo | undefined = articulosInsumo?.find((a) => a.denominacion === denominacion)
    //         newDetalles.push({
    //             id: 0,
    //             cantidad: 1,
    //             articuloInsumo: selectedArticulo
    //         });
    //     }

    //     //Eliminamos los artículos con cantidad 0
    //     newDetalles = newDetalles.filter(detalle => detalle.cantidad !== 0);

    //     //Esto es para almacenar temporalmene los insumos (de esta forma no tengo que traer de más)
    //     const insumos: IArticuloInsumo[] | undefined = [];

    //     const insumosGuardados = newDetalles.map((detalle) => detalle.articuloInsumo && insumos.push(detalle.articuloInsumo))

    //     //const insumosFinales = insumosGuardados.map((insumo) => insumo.articuloInsumo && insumos.push(insumo.articuloInsumo))

    //     setAmDetalles(newDetalles);

    // }

    // useEffect(() => {
    //     setValues(prevValues => ({
    //         ...prevValues,
    //         articuloManufacturadoDetalles: aMDetalles
    //     }));
    // }, [aMDetalles]);

    // const filtroPorBusqueda = async (busqueda: string) => {

    //     if (busqueda === "") {
    //         setFiltroDetalle([]);
    //         return 'no hay búsqueda';
    //     }
    //     else {
    //         const res: IArticuloInsumo[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}ArticuloInsumo/buscar/${busqueda}/${idSucursales}`)
    //         setFiltroDetalle(res);
    //         setArticulosInsumo(res);
    //         return res;
    //     }
    // }

    // const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    //     const search = e.target.value.toString();

    //     setTimeout(async () => {
    //         const res = await filtroPorBusqueda(search)

    //         if (res.length === 0) {
    //             setPopUp(true)
    //         } else if (res === "no hay búsqueda") {
    //             setPopUp(false)
    //         }
    //         else {
    //             setPopUp(false);
    //         }

    //     }, 1000);

    // }

    // const aMDetalle = () => {
    //     return (
    //         <div className='h-auto '>
    //             <div className='font-Roboto text-xl '>Insumos disponibles: </div>
    //             <label className="input input-bordered flex items-center gap-2 mt-2 ">
    //                 <input type="text" className="grow border-none focus:ring-0" placeholder="Buscar insumo..."
    //                     onChange={(e) => handleSearch(e)} />
    //                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
    //             </label>
    //             <div className='h-36 overflow-y-scroll mt-2 flex flex-row '>
    //                 <div>
    //                     {filtroDetalle
    //                         .filter((articulo: IArticuloInsumo) => articulo.esParaElaborar)
    //                         .map((articulo: IArticuloInsumo, index: number) => (
    //                             <div key={index} className='  rounded p-1 flex justify-between items-center'>
    //                                 <div className='flex flex-row my-2 items-center'>
    //                                     <h1 className='w-24'>{articulo.denominacion}</h1>
    //                                     <input
    //                                         className=' btn text-white bg-green-600 hover:bg-green-500 size-10'
    //                                         value={'+'}
    //                                         type="button"
    //                                         id={`cantidad${index}`}
    //                                         name='cantidad'
    //                                         min="0"
    //                                         onClick={() => handleQuantityChange(1, articulo.denominacion)}
    //                                     />
    //                                     <input
    //                                         className=' btn size-10 ml-2'
    //                                         value={'-'}
    //                                         type="button"
    //                                         id={`cantidad${index}`}
    //                                         name='cantidad'
    //                                         min="0"
    //                                         onClick={() => handleQuantityChange(0, articulo.denominacion)}
    //                                     />
    //                                 </div>
    //                                 {/*Por si no queda claro, esto me pone la cantidad actual de cada articulo */}
    //                                 <div className=''>
    //                                     <h1 className='ml-2 w-20'>{aMDetalles.find(e => e.articuloInsumo?.denominacion === articulo.denominacion)?.cantidad}</h1>
    //                                 </div>
    //                             </div>
    //                         ))}
    //                 </div>
    //                 {popUp && <h1 className='flex mt-4 justify-center w-full'>No se encontraron insumos... </h1>}
    //             </div>



    //             <div className='flex flex-wrap my-2 h-auto '>
    //                 {aMDetalles?.map((detalle) => (
    //                     <div className='text-xl px-2 py-1 rounded mr-2 bg-green-400 w-max text-white '>{detalle.articuloInsumo?.denominacion}
    //                         <span className='text-xs mx-2'>x</span>{detalle.cantidad}</div>
    //                 ))}
    //             </div>
    //         </div>
    //     )
    // }



    //Manejo de imagenes 

    const [files, setFiles] = useState<FileWithPreview[]>([]);

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

                    <div className='w-full flex flex-col md:flex-row space-x-0 md:space-x-4'>
                        {genericInput('denominacion', "text", values.denominacion, handleChange, errors)}
                        {genericInput('descripcion', 'text', values.descripcion, handleChange, errors)}
                    </div>

                    <div className='w-full flex flex-col md:flex-row space-x-0 md:space-x-4'>
                        {genericInput('precioVenta', 'number', values.precioVenta, handleChange, errors)}
                        {genericInput('preparacion', 'text', values.preparacion, handleChange, errors)}
                    </div>

                    <div className='w-full flex flex-col md:flex-row space-x-0 md:space-x-4'>
                        {genericInput('tiempoEstimadoMinutos', 'number', values.tiempoEstimadoMinutos, handleChange, errors)}
                        {genericInput('stock', 'number', values.stock, handleChange, errors)}
                    </div>


                    <div className='w-full flex flex-col space-x-0 '>
                        <div className='w-full'>

                            <div className='flex flex-col w-full'>
                                <UnidadMedidaInput loaded={loaded} openUnidad={openUnidad}
                                    setLoaded={setLoaded} setOpenUnidad={setOpenUnidad} setUnidadSeleccionada={setUnidadSeleccionada}
                                    handleChoose={handleChoose} values={values}
                                    key={1} />
                                {errors.unidadMedida?.denominacion && <h1 className='font-Roboto text-red-600'>{errors.unidadMedida.denominacion}</h1>}
                            </div>

                            <div className='flex flex-col justify-center'>
                                <CategoriaInput handleChange={handleChange} setLoaded={setLoaded} setIdCategoria={setIdCategoria}
                                    key={1} value={values.idCategoria} />
                                {errors.idCategoria && <h1 className='font-Roboto text-red-600'>{errors.idCategoria}</h1>}
                            </div>

                        </div>
                        <div>
                            <DetalleInput setValues={setValues} values={values} idSucursales={idSucursales} />
                            {errors.articuloManufacturadoDetalles && <h1 className='font-Roboto text-red-600'>{errors.articuloManufacturadoDetalles}</h1>}
                        </div>

                        <div className='w-full flex flex-col justify-center '>
                            <ImageInput files={files} setFiles={setFiles} id={values.id} imagenes={values.imagenes} />
                        </div>
                    </div>
                </div>
            </div>

            <button className={`btn btn-wide btn-success text-white ${subiendo && 'btn-disabled animate-pulse'}`}
                onClick={handleSubmit}>
                {subiendo ? 'Subiendo...' : 'Enviar'}
            </button>
        </div >
    )
}

export default AManufacturadoForm