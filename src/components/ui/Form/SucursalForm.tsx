import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useForm } from '../../../hooks/useForm'
import { ISucursal } from '../../../types/Sucursal'
import { genericInput } from './Inputs/GenericInput';
import { booleanInput } from './Inputs/GenericInput';
import { BackendClient } from '../../../services/BackendClient';
import { IEmpresa } from '../../../types/Empresa';
import { ICategoria } from '../../../types/Categoria';
import { useParams } from 'react-router-dom';
import { ISucursalShort } from '../../../types/ShortDtos/SucursalShort';
import { useAppDispatch } from '../../../hooks/redux';
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';
import { IDomicilio } from '../../../types/Domicilio/Domicilio';
import { IProvincia } from '../../../types/Domicilio/Provincia';
import { IEmpresaShort } from '../../../types/ShortDtos/EmpresaShort';
import { ILocalidad } from '../../../types/Domicilio/Localidad';

interface IForm {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    data: ISucursalShort;
    method: string
}
// id: number;
// eliminado: boolean;
// nombre: string;
// horarioApertura: string;
// horarioCierre: string;
// casaMatriz: boolean;

type FormState = {
    [key: string]: any;
    id: number;
    eliminado: boolean;
    nombre: string;
    horarioApertura: string;
    horarioCierre: string;
    esCasaMatriz: boolean;
    idEmpresa: number;
    domicilio: IDomicilio;
};

//@ts-ignore
class GenericBackend extends BackendClient<T> { } //Métodos genéricos 

const SucursalForm: FC<IForm> = ({ open, setOpen, data, method }) => {

    const dispatch = useAppDispatch()

    const backend = new GenericBackend(); //Objeto de BackendClient

    const postSucursal = async (data: ISucursalShort) => {
        if (method === 'POST') {
            try {
                //TODO CAMBIAR ENDPOINT
                //const res: IEmpresaShort = await backend.post("http://localhost:8081/empresa/short", data);
                const res: IEmpresaShort = await backend.post("http://localhost:8081/sucursal", data);
                console.log(res)
                dispatch(setGlobalUpdated(true))
            } catch (error) {
                console.error(error)
            }
        }
        else if (method === 'PUT') {
            try {
                //TODO CAMBIAR ENDPOINT
                const res: IEmpresaShort = await backend.put(`http://localhost:8081/sucursal/${data.id}`, data);
                dispatch(setGlobalUpdated(true))
            } catch (error) {
                console.error(error)
            }
        }
    }

    const { handleChange, values, resetForm, setValues, handleSelect } = useForm<FormState>(data)

    const handleSubmit = () => {
        postSucursal(values)
        resetForm();
        setOpen(false)
    }


    //States para manejar las provincias
    const [provincias, setProvincias] = useState<IProvincia[]>([])

    const [selectedProvincia, setSelectedProvincia] = useState<IProvincia>();

    //States para manejar las localidades
    const [localidades, setLocalidades] = useState<ILocalidad[]>([]);

    const [selectedLocalidad, setSelectedLocalidad] = useState<ILocalidad>();

    //Effect para traer las provincias de Argentina
    useEffect(() => {
        const provincias = async () => {
            try {
                const res: IProvincia[] = await backend.getAll("http://localhost:8081/provincia")
                setProvincias(res);
                console.log(res)
            } catch (error) {
                console.error(error)
            }
        }
        provincias();
    }, [])

    //Effect para traer las localidades de la provincia seleccionada
    useEffect(() => {

        const localidades = async () => {
            try {
                const res: ILocalidad[] = await backend.getAll(`http://localhost:8081/localidad/findByProvincia/${selectedProvincia?.id}`)
                setLocalidades(res);
                console.log(res)
            } catch (error) {
                console.error(error)
            }
        }
        localidades();

    }, [selectedProvincia])



    // const categoriasInput = () => {
    //     return (
    //         <>
    //             <div className='font-Roboto text-xl'>Categorias disponibles: </div>
    //             {categorias.map((categoria, index) => (
    //                 <div key={index}>
    //                     <input
    //                         multiple
    //                         type="checkbox"
    //                         id={`categoria${index}`}
    //                         name='categorias'
    //                         value={categoria.denominacion}
    //                         onChange={(e) => handleSelect(e, categorias, selectedCategorias, setSelecetedCategorias, 'denominacion', 'categorias')}
    //                     //onClick={() => setSelected(unidad.denominacion)}
    //                     //className={`peer ${selected === unidad.denominacion ? 'p-12' : ''}`}
    //                     //checked={medidaSeleccionada?.denominacion === unidad.denominacion}
    //                     />
    //                     <label htmlFor={`sucursales${index}`} className="ml-2">
    //                         {categoria.denominacion}
    //                     </label>
    //                 </div>
    //             ))}
    //         </>
    //     )
    // }

    const provinciaInput = () => {
        return (
            <div className='w-full'>
                <div className='font-Roboto text-xl mt-2 w-full '>Provincias disponibles: </div>
                <select
                    className='border-red-600 border rounded-md w-full'
                    id="provincia"
                    name="provincia"
                    value={selectedProvincia?.nombre || ''}
                    onChange={(e) => {
                        const selectedValue = e.target.value;
                        const selectedProvincia = provincias.find((provincia) => provincia.nombre === selectedValue);
                        setSelectedProvincia(selectedProvincia);
                    }}
                >
                    {provincias.map((provincia, index) => (
                        <option key={index} value={provincia.nombre} className=''>
                            {provincia.nombre}
                        </option>
                    ))}
                </select>
            </div>
        )
    }

    const localidadInput = () => {
        return (
            <div className='w-full'>
                <div className='font-Roboto text-xl mt-2 w-full'>Localidades disponibles: </div>
                <select
                    className='border-red-600 border rounded-md w-full'
                    id="localidad"
                    name="localidad"
                    value={selectedLocalidad?.nombre || ''}
                    onChange={(e) => {
                        {
                            const selectedValue = e.target.value;
                            const selectedLocalidad = localidades.find((localidad) => localidad.nombre === selectedValue);
                            setSelectedLocalidad(selectedLocalidad);
                        }
                    }}
                >
                    {localidades.map((localidad, index) => (
                        <option key={index} value={localidad.nombre} className=''>
                            {localidad.nombre}
                        </option>
                    ))}
                </select>
            </div>
        )
    }

    const domicilioInput = () => {
        return (
            <div className='w-full'>
                <div className='font-Roboto text-xl mt-2 w-full '>Provincias disponibles: </div>
                <select
                    className='border-red-600 border rounded-md w-full'
                    id="provincia"
                    name="provincia"
                    value={selectedProvincia?.nombre || ''}
                    onChange={(e) => {
                        const selectedValue = e.target.value;
                        const selectedProvincia = provincias.find((provincia) => provincia.nombre === selectedValue);
                        setSelectedProvincia(selectedProvincia);
                    }}
                >
                    {provincias.map((provincia, index) => (
                        <option key={index} value={provincia.nombre} className=''>
                            {provincia.nombre}
                        </option>
                    ))}
                </select>
            </div>
        )
    }


    const [seccionDomicilio, setSeccionDomicilio] = useState<boolean>(false);

    const handleChangeDomicilio = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        //@ts-ignore
        setValues(prevState => ({
            ...prevState,
            domicilio: {
                ...prevState.domicilio,
                [name]: value,
            }
        }));
    };

    console.log(values)

    const handleChangeLocalidad = () => {

        //@ts-ignore
        setValues(prevState => ({
            ...prevState,
            domicilio: {
                ...prevState.domicilio,
                idLocalidad: selectedLocalidad?.id,
            }
        }));
    };

    useEffect(() => {
        handleChangeLocalidad();
    }, [selectedLocalidad])

    console.log("que")
    console.log(selectedLocalidad?.id)

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

            <div className={`w-full ${seccionDomicilio && 'hidden'}`}>

                <div className="relative z-0 w-full mb-5 group">

                    {genericInput('nombre', "text", values.nombre, handleChange)} {/* Nombre */}
                    <div className='flex justify-center w-full'>
                        {genericInput('horarioApertura', 'time', values.horarioApertura, handleChange)}
                        {genericInput('horarioCierre', 'time', values.horarioCierre, handleChange)}
                    </div>

                    {booleanInput('casaMatriz', 'boolean', values.casaMatriz, handleChange, 'Es casa matriz', 'No es casa matriz')}
                </div>


            </div>

            <div className={`${seccionDomicilio || 'hidden'}`}>
                <div className={`flex justify-center w-full space-x-5 mt-4`}>
                    {provinciaInput()}
                    {selectedProvincia && localidadInput()}

                </div>
                {selectedLocalidad && (
                    <>
                        <div className='flex justify-center w-full'>
                            {genericInput('calle', 'text', values.domicilio?.calle, handleChangeDomicilio)}
                            {genericInput('numero', 'number', values.domicilio?.numero, handleChangeDomicilio)}
                        </div>

                        <div className='flex justify-center w-full'>
                            {genericInput('cp', 'number', values.domicilio?.cp, handleChangeDomicilio)}
                            {genericInput('nroDpto', 'number', values.domicilio?.nroDpto, handleChangeDomicilio)}
                        </div>

                        <div className='flex justify-center w-full'>
                            {genericInput('nombre', 'string', values.domicilio?.nombre, handleChangeDomicilio)}
                            {genericInput('piso', 'number', values.domicilio?.piso, handleChangeDomicilio)}
                        </div>
                    </>
                )}

            </div>




            <button onClick={() => setSeccionDomicilio(!seccionDomicilio)}>Agregar domicilio</button>

            <button className='bg-red-600 text-white px-4 py-2 rounded-md active:scale-95 transition-all'
                onClick={handleSubmit}>Enviar</button>
        </div>
    )
}

export default SucursalForm