import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useForm } from '../../../hooks/useForm'
import { genericInput } from './Inputs/GenericInput';
import { BackendClient } from '../../../services/BackendClient';
import { IUnidadMedida } from '../../../types/UnidadMedida';
import DragDrop from './Inputs/FileInput';
import { IArticuloInsumo } from '../../../types/ArticuloInsumo';
import { IArticuloManufacturadoDetalle } from '../../../types/ArticuloManufacturadoDetalle';

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
    articuloManufacturadoDetalles: IArticuloManufacturadoDetalle[] //Falta tipar
    stock: number,
};

//@ts-ignore
class GenericBackend extends BackendClient<T> { } //Métodos genéricos 

const AManufacturadoForm: FC<IForm> = ({ open, setOpen }) => {

    const backend = new GenericBackend(); //Objeto de BackendClient

    const [loaded, setLoaded] = useState<boolean>(false);

    //const [selectedSucursales, setSelectedSucursales] = useState<ISucursal[] | undefined>([]);

    const { handleChange, values, resetForm, handleSelect, handleChoose, handleFileDrop, setValues } = useForm<FormState>({
        id: 0,
        denominacion: '',
        descripcion: '',
        articuloManufacturadoDetalles: [
            {
                id: 0,
                cantidad: 0,
                articuloInsumo: {
                    denominacion: '',
                    esParaElaborar: false,
                    id: 0,
                    imagenes: [],
                    precioCompra: 0,
                    precioVenta: 0,
                    stockActual: 0,
                    stockMaximo: 0,
                    unidadMedida: {
                        id: 0,
                        denominacion: '',
                    }
                }
            }
        ],
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

    console.log(values)

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
                            id={`sucursales${index}`}
                            name='sucursales'
                            value={unidad.denominacion}

                            //@ts-ignore
                            onChange={(e) => handleChoose(e, unidadesMedida, setUnidadSeleccionada, 'denominacion', 'unidadMedida')}
                        />
                        <label htmlFor={`sucursales${index}`} className="ml-2">
                            {unidad.denominacion}
                        </label>
                    </div>
                ))}
            </>
        )
    }

    //SECCIÓN PARA MANEJAR LOS AMDETALLES

    const [filtroDetalle, setFiltroDetalle] = useState<IArticuloInsumo[]>([]);

    const [articulosInsumo, setArticulosInsumo] = useState<IArticuloInsumo[]>([])

    const [articuloSeleccionado, setArticuloSeleccionado] = useState<IArticuloInsumo>();

    const getInsumos = async () => {
        const res: IArticuloInsumo[] = await backend.getAll("https://backend-jsonserver-1.onrender.com/articulosInsumos");
        setArticulosInsumo(res);
        setFiltroDetalle(res);
        //setLoaded(true);
    }

    useEffect(() => {
        getInsumos();
    }, [])

    const [aMDetalles, setAmDetalles] = useState<IArticuloManufacturadoDetalle[]>([])

    //En esta función pedimos el valor del número ingresado por el usuario y el valor de la denominación del articulo insumo
    const handleQuantityChange = (cantidad: number, denominacion: string) => {

        let existe: boolean = false;

        let newDetalles = aMDetalles.map(detalle => {
            //Si el insumo ya existe dentro de la lista de detalles, solo actualizamos su cantidad
            if (detalle.articuloInsumo?.denominacion === denominacion) {
                existe = true;
                return {
                    ...detalle,
                    cantidad: cantidad === 1 ? detalle.cantidad + 1 : detalle.cantidad - 1
                };
            } else {
                return detalle;
            }
        });

        //Si el insumo no existe y e es 1, lo añadimos a la lista con cantidad 1
        if (!existe && cantidad === 1) {
            const selectedArticulo: IArticuloInsumo | undefined = articulosInsumo?.find((a) => a.denominacion === denominacion)
            newDetalles.push({
                id: 0,
                cantidad: 1,
                articuloInsumo: selectedArticulo
            });
        }

        //Eliminamos los artículos con cantidad 0
        newDetalles = newDetalles.filter(detalle => detalle.cantidad !== 0);

        setAmDetalles(newDetalles);
    }

    useEffect(() => {
        setValues(prevValues => ({
            ...prevValues,
            articuloManufacturadoDetalles: aMDetalles
        }));
    }, [aMDetalles]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setFiltroDetalle(articulosInsumo.filter(articulo => articulo.denominacion.toLocaleLowerCase().includes(e.target.value)))
    }

    console.log(filtroDetalle)

    const aMDetalle = () => {
        return (
            <div className='h-auto '>
                <div className='font-Roboto text-xl '>Articulos disponibles: </div>
                <label className="input input-bordered flex items-center gap-2 mt-2 ">
                    <input type="text" className="grow border-none focus:ring-0" placeholder="Buscar insumo..."
                        onChange={(e) => handleSearch(e)} />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>
                <div className='h-36 overflow-y-scroll mt-2 '>
                    {filtroDetalle.map((articulo: IArticuloInsumo, index: number) => (
                        <div key={index} className='  rounded p-1 flex justify-between items-center'>
                            <div className='flex flex-row my-2 items-center'>
                                <h1 className='w-24'>{articulo.denominacion}</h1>
                                <input
                                    className=' btn text-white bg-green-600 hover:bg-green-500 size-10'
                                    value={'+'}
                                    type="button"
                                    id={`cantidad${index}`}
                                    name='cantidad'
                                    min="0"
                                    onClick={() => handleQuantityChange(1, articulo.denominacion)}
                                //onChange={(e) => handleQuantityChange(e, articulo.denominacion)}
                                />
                                <input
                                    className=' btn size-10 ml-2'
                                    value={'-'}
                                    type="button"
                                    id={`cantidad${index}`}
                                    name='cantidad'
                                    min="0"
                                    //@ts-ignore
                                    onClick={() => handleQuantityChange(0, articulo.denominacion)}
                                />
                            </div>
                            {/*Por si no queda claro, esto me pone la cantidad actual de cada articulo */}
                            <div className=''>
                                <h1 className='ml-2 w-20'>{aMDetalles.find(e => e.articuloInsumo?.denominacion === articulo.denominacion)?.cantidad}</h1>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
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