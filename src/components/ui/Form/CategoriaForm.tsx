import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useForm } from '../../../hooks/useForm'
import { ISucursal } from '../../../types/Sucursal'
import { booleanInput, genericInput } from './Inputs/GenericInput';
import { BackendClient } from '../../../services/BackendClient';
import { IEmpresa } from '../../../types/Empresa';
import { ICategoria } from '../../../types/Categoria';
import { IArticuloManufacturado } from '../../../types/ArticuloManufacturado';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { ICategoriaShort } from '../../../types/ShortDtos/CategoriaShort';
import { useParams } from 'react-router-dom';

interface IForm {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    method: string,
}

type FormState = {
    [key: string]: any;
    id: number;
    denominacion: string;
    idSucursales: number[];
    esInsumo: boolean;
    //articulosManufacturados: IArticuloManufacturado[] | null;
    //subCategorias: ICategoria[];
};

// export interface ICategoriaShort {
//     id: number;
//     denominacion: string;
//     idSucursales: number[];
//     esInsumo: boolean;
//     // subCategorias: ICategoria[];
// }

class GenericBackend extends BackendClient<FormState> { } //Métodos genéricos 

const CategoriaForm: FC<IForm> = ({ open, setOpen, method }) => {

    const backend = new GenericBackend(); //Objeto de BackendClient

    //REDUX

    const initialValues = useAppSelector((state) => state.GlobalInitialValues.data);

    //console.log(initialValues);

    const unidades = useAppSelector((state) => state.UnidadesMedida.UnidadesMedida)

    const updated = useAppSelector((state) => state.GlobalUpdated.updated)

    const dispatch = useAppDispatch();

    //ROUTER DOM

    const { idSucursales } = useParams();

    const [articulosManufacturados, setArticulosManufacturados] = useState<IArticuloManufacturado[]>([]);

    const [articuloMSeleccionado, setArticuloMSeleccionado] = useState<IArticuloManufacturado | undefined>();

    const [articulosMSeleccionados, setArticulosMSeleccionados] = useState<IArticuloManufacturado[] | undefined>([]);

    const [loaded, setLoaded] = useState<boolean>(false);

    // const getSucursales = async () => {

    //     //modificar el endpoint una vez con el backend funcional
    //     const res: IArticuloManufacturado[] = await backend.getAll("https://backend-jsonserver-1.onrender.com/articulosManufacturados");
    //     setArticulosManufacturados(res);
    //     setLoaded(true);
    // }

    const postCategoria = async (data: FormState) => {
        console.log(data)
        try {
            const res: FormState = await backend.post("http://localhost:8081/categoria", data);
            console.log(res)
        } catch (error) {
            console.error(error)
        }
    }

    //const [selectedSucursales, setSelectedSucursales] = useState<ISucursal[] | undefined>([]);

    const { handleChange, values, resetForm, setValues, handleSelect } = useForm<FormState>(initialValues)

    const handleSubmit = () => {
        postCategoria(values)
        resetForm();
        setOpen(false)
    }

    useEffect(() => {
        const asignarSucursal = () => {
            setValues({
                ...values,
                idSucursales: [
                    ...values.idSucursales.slice(0, 0),
                    Number(idSucursales),
                    ...values.idSucursales.slice(0 + 1),
                ],
            });
        }
        asignarSucursal();
    }, [])

    console.log(values)


    // const articulosInput = () => {
    //     return (
    //         <>
    //             <div className='font-Roboto text-xl'>Productos disponibles para la promoción: </div>
    //             {articulosManufacturados.map((articulo, index) => (
    //                 <div key={index}>
    //                     <input
    //                         multiple
    //                         type="checkbox"
    //                         id={`articulos${index}`}
    //                         name='articulos'
    //                         value={articulo.denominacion}
    //                         onChange={(e) => handleSelect(e, articulosManufacturados, articulosMSeleccionados, setArticulosMSeleccionados, 'denominacion', 'articulosManufacturados')}
    //                     //onClick={() => setSelected(unidad.denominacion)}
    //                     //className={`peer ${selected === unidad.denominacion ? 'p-12' : ''}`}
    //                     //checked={medidaSeleccionada?.denominacion === unidad.denominacion}
    //                     />
    //                     <label htmlFor={`sucursales${index}`} className="ml-2">
    //                         {articulo.denominacion}
    //                     </label>
    //                 </div>
    //             ))}
    //         </>
    //     )
    // }

    console.log(values);

    return (
        <div className='w-full flex flex-col items-center justify-center space-y-4 p-10 '
            onSubmit={handleSubmit}
        >
            <div className='w-full flex justify-end '>
                <h1 className='flex text-end justify-end bg-red-600 btn btn-error rounded-full text-white text-xl cursor-pointer w-min'
                    onClick={() => { setOpen(false), resetForm() }}>X</h1>
            </div>

            <h2 className='text-3xl font-Roboto'>Agrega tu categoría</h2>
            {/*Mapeo los objetos que traigo al formulario, dependiendo de cada objeto, genero un input distinto */}

            <div className='w-full'>

                <div className="relative z-0 w-full mb-5 group">
                    {genericInput('denominacion', "text", values.denominacion, handleChange)} {/* Nombre */}
                    {booleanInput('esInsumo', 'boolean', values.esInsumo, handleChange, 'Es insumo', 'No es insumo')}
                    {/* {articulosInput()} */}
                </div>

            </div>

            <button className='bg-red-600 text-white px-4 py-2 rounded-md active:scale-95 transition-all'
                onClick={handleSubmit}>Enviar</button>
        </div>
    )
}

export default CategoriaForm