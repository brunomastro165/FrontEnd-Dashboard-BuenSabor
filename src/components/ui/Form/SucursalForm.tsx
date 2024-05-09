//@ts-nocheck
import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useForm } from '../../../hooks/useForm'
import { ISucursal } from '../../../types/Sucursal'
import { genericInput } from './Inputs/GenericInput';
import { BackendClient } from '../../../services/BackendClient';
import { IEmpresa } from '../../../types/Empresa';
import { ICategoria } from '../../../types/Categoria';
import { useParams } from 'react-router-dom';

interface IForm {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

type FormState = {
    [key: string]: any;
    id: number;
    nombre: string;
    horarioApertura: string;
    horarioCierre: string;
    domicilio: string; //FALTA TIPAR
    categorias: ICategoria[] | null;
    promociones: string; //FALTA TIPAR
};

class GenericBackend extends BackendClient<T> { } //Métodos genéricos 

const SucursalForm: FC<IForm> = ({ open, setOpen }) => {

    const backend = new GenericBackend(); //Objeto de BackendClient

    const { id } = useParams(); //Uso useParams para averiguar en qué empresa estamos parados

    console.log(id);

    const [categorias, setCategorias] = useState<ICategoria[]>([]);

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<ICategoria | undefined>();

    const [loaded, setLoaded] = useState<boolean>(false);

    const getSucursales = async () => {
        const res: ICategoria[] = await backend.getAll("https://backend-jsonserver-1.onrender.com/categorias");
        setCategorias(res);
        setLoaded(true);
    }

    const postSucursal = async (data) => {

        const idString = String(id);

        //Esta sería la forma REAL de hacer la petición
        const res: ISucursal = await backend.post(`https://backend-jsonserver-1.onrender.com/empresas/${idString}/sucursales`, values);

        try {
            //const res: ISucursal = await backend.post(`http://localhost:8080/empresas/${idString}/sucursales`, values);
            console.log()
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getSucursales();
    }, [loaded])

    const [selectedCategorias, setSelecetedCategorias] = useState<ICategoria[] | undefined>([]);

    const { handleChange, values, resetForm, setValues, handleSelect } = useForm<FormState>({
        id: 0,
        nombre: '',
        horarioApertura: '',
        horarioCierre: '',
        domicilio: '', //FALTA TIPAR
        categorias: null,
        promociones: '', //FALTA TIPAR (No sabría cómo meter esto)
    })

    const handleSubmit = () => {
        postSucursal(values)
        resetForm();
        setOpen(false)
    }

    const categoriasInput = () => {
        return (
            <>
                <div className='font-Roboto text-xl'>Categorias disponibles: </div>
                {categorias.map((categoria, index) => (
                    <div key={index}>
                        <input
                            multiple
                            type="checkbox"
                            id={`categoria${index}`}
                            name='categorias'
                            value={categoria.denominacion}
                            onChange={(e) => handleSelect(e, categorias, selectedCategorias, setSelecetedCategorias, 'denominacion', 'categorias')}
                        //onClick={() => setSelected(unidad.denominacion)}
                        //className={`peer ${selected === unidad.denominacion ? 'p-12' : ''}`}
                        //checked={medidaSeleccionada?.denominacion === unidad.denominacion}
                        />
                        <label htmlFor={`sucursales${index}`} className="ml-2">
                            {categoria.denominacion}
                        </label>
                    </div>
                ))}
            </>
        )
    }

    console.log(values);

    return (
        <div className='w-full flex flex-col items-center justify-center space-y-4 p-10 '
            onSubmit={handleSubmit}
        >
            <div className='w-full flex justify-end '>
                <h1 className='flex text-end justify-end bg-red-600 btn btn-error rounded-full text-white text-xl cursor-pointer w-min'
                    onClick={() => { setOpen(false), resetForm() }}>X</h1>
            </div>

            <h2 className='text-3xl font-Roboto'>Agrega tu sucursal</h2>
            {/*Mapeo los objetos que traigo al formulario, dependiendo de cada objeto, genero un input distinto */}

            <div className='w-full'>

                <div className="relative z-0 w-full mb-5 group">
                    {genericInput('nombre', "text", values.nombre, handleChange)} {/* Nombre */}
                    {genericInput('domicilio', 'text', values.domicilio, handleChange)} {/* Razón Social */}
                    {genericInput('horarioApertura', 'time', values.horarioApertura, handleChange)}
                    {genericInput('horarioCierre', 'time', values.horarioCierre, handleChange)}
                    {categoriasInput()}
                </div>

            </div>

            <button className='bg-red-600 text-white px-4 py-2 rounded-md active:scale-95 transition-all'
                onClick={handleSubmit}>Enviar</button>
        </div>
    )
}

export default SucursalForm