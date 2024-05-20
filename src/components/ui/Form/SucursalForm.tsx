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
import * as Yup from 'yup'
import { TbH1 } from 'react-icons/tb';

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

    const [errors, setErrors] = useState<any>({});

    const validationSchema = Yup.object().shape({
        nombre: Yup.string()
            .required('El nombre es requerido'),
        horarioApertura: Yup.string()
            .required('El horario de apertura es requerido'),
        horarioCierre: Yup.string()
            .required('El horario de cierre es requerido'),
        casaMatriz: Yup.boolean()
            .required('Este campo es requerido'),
        domicilio: Yup.object().shape({
            calle: Yup.string()
                .required('La calle es requerida'),
            numero: Yup.number()
                .typeError('El número debe ser un valor numérico')
                .required('El número es requerido'),
            cp: Yup.number()
                .typeError('El código postal debe ser un valor numérico')
                .required('El CP es requerido'),
            nroDpto: Yup.number()
                .typeError('El número de departamento debe ser un valor numérico'),
            nombre: Yup.string()
                .required('El nombre es requerido'),
            piso: Yup.number()
                .typeError('El piso debe ser un valor numérico')
        })
    });

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

    const handleSubmit = async () => {
        try {

            await validationSchema.validate(values, { abortEarly: false });
            //@ts-ignore
            postSucursal(values)
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
                            // Acceso a errores anidados, p.ej. 'domicilio.calle'
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

    console.log(errors)

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

    const provinciaInput = () => {
        return (
            <div className='w-full'>
                <div className='font-Roboto text-xl mt-2 w-full '>Provincias disponibles: </div>
                <select
                    className=' border rounded-md w-full'
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
                        <option key={index} value={provincia.nombre} className='rounded-full hover:bg-red-600'>
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
                    className=' border rounded-md w-full'
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


    console.log("acá")

    console.log(errors)
    return (
        <div className='w-full flex flex-col items-center justify-center space-y-4 p-10 '
            onSubmit={handleSubmit}
        >
            <div className='w-full flex justify-end '>
                <h1 className='flex text-end justify-end bg-red-600 btn btn-error rounded-full text-white text-xl cursor-pointer w-min'
                    onClick={() => { setOpen(false), resetForm() }}>X</h1>
            </div>

            <h2 className='text-3xl font-Roboto'>Agrega tu sucursal</h2>

            <div className={`w-full ${seccionDomicilio && 'hidden'}`}
                style={{ height: '50vh' }}>

                <div className="relative z-0 w-full mb-5 group">
                    <div className='w-full flex flex-col'>
                        {genericInput('nombre', "text", values.nombre, handleChange)} {/* Nombre */}
                        <p className='text-red-600 font-Roboto'>{errors?.nombre}</p>
                    </div>
                    <div className='flex justify-center w-full'>
                        <div className='w-full flex flex-col'>
                            {genericInput('horarioApertura', 'time', values.horarioApertura, handleChange)}
                            <p className='text-red-600 font-Roboto'>{errors?.horarioApertura}</p>
                        </div>

                        <div className='w-full flex flex-col'>
                            {genericInput('horarioCierre', 'time', values.horarioCierre, handleChange)}
                            <p className='text-red-600 font-Roboto'>{errors?.horarioCierre}</p>
                        </div>
                    </div>

                    <div className='w-full justify-center flex flex-col mt-4 '>
                        {booleanInput('casaMatriz', 'boolean', values.casaMatriz, handleChange, 'Es casa matriz', 'No es casa matriz')}
                        <p className='text-red-600 font-Roboto mt-4'>{errors?.casaMatriz}</p>
                    </div>

                </div>
            </div>

            <div className={`${seccionDomicilio || 'hidden'}`}
                style={{ height: '50vh' }}>
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
                            {genericInput('nombre', 'text', values.domicilio?.nombre, handleChangeDomicilio)}
                            {genericInput('piso', 'number', values.domicilio?.piso, handleChangeDomicilio)}
                        </div>
                    </>
                )}

            </div>

            {errors.domicilio && <h1 className='text-red-600 font-Roboto'>Se requiere asignar un domicilio</h1>}

            <div className='py-4'></div>
            <button onClick={() => setSeccionDomicilio(!seccionDomicilio)} className='bg-red-600 p-2  rounded btn text-white font-Roboto'>
                {seccionDomicilio ? 'Volver' : 'Agregar domicilio'}
            </button>

            {values.domicilio &&
                <button className='bg-red-600 text-white px-4 py-2 rounded-md active:scale-95 transition-all'
                    onClick={handleSubmit}>
                    Enviar
                </button>}

        </div>
    )
}

export default SucursalForm