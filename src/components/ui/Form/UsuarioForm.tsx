//@ts-nocheck
import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useForm } from '../../../hooks/useForm'
import { ISucursal } from '../../../types/Sucursal'
import { genericInput } from './Inputs/GenericInput';
import { BackendClient } from '../../../services/BackendClient';
import { IEmpresa } from '../../../types/Empresa';
import { IRol } from '../../../types/Rol';

interface IForm {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

type FormState = {
    [key: string]: any;
    id: number;
    username: string;
    auth0Id: string;
    rol: IRol | null;
};

class GenericBackend extends BackendClient<T> { } //Métodos genéricos 

const UsuarioForm: FC<IForm> = ({ open, setOpen }) => {

    const backend = new GenericBackend(); //Objeto de BackendClient

    const [roles, setRoles] = useState<IRol[]>([]);

    const [rolSeleccionado, setRolSeleccionado] = useState<ISucursal | undefined>();

    const [loaded, setLoaded] = useState<boolean>(false);

    const getRoles = async () => {
        const res: IRol[] = await backend.getAll("http://localhost:8080/roles");
        setRoles(res);
        setLoaded(true);
    }

    useEffect(() => {
        getRoles();
    }, [loaded])

    //const [selectedSucursales, setSelectedSucursales] = useState<ISucursal[] | undefined>([]);

    const { handleChange, values, resetForm, setValues, handleChoose } = useForm<FormState>({
        id: 0,
        username: '',
        auth0Id: '',
        rol: null,
    })

    const handleSubmit = () => {
        console.log("A")
        console.log(values);
        resetForm();
    }

    const rolInput = () => {
        return (
            <>
                <div className='font-Roboto text-xl'>Rol del usuario: </div>
                {roles.map((rol, index) => (
                    <div key={index}>
                        <input
                            type="radio"
                            id={`rol${index}`}
                            name='rol'
                            value={rol.denominacion}
                            onChange={(e) => handleChoose(e, roles, setRolSeleccionado, 'denominacion', 'rol')}
                        //onClick={() => setSelected(unidad.denominacion)}
                        //className={`peer ${selected === unidad.denominacion ? 'p-12' : ''}`}
                        //checked={medidaSeleccionada?.denominacion === unidad.denominacion}
                        />
                        <label htmlFor={`rol${index}`} className="ml-2">
                            {rol.denominacion}
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

            <h2 className='text-3xl font-Roboto'>Agrega un usuario</h2>
            {/*Mapeo los objetos que traigo al formulario, dependiendo de cada objeto, genero un input distinto */}

            <div className='w-full'>

                <div className="relative z-0 w-full mb-5 group">
                    {genericInput('username', "text", values.username, handleChange)} {/* Nombre */}
                    {genericInput('auth0Id', 'text', values.auth0Id, handleChange)} {/* Razón Social */}
                    {rolInput()}

                </div>

            </div>

            <button className='bg-red-600 text-white px-4 py-2 rounded-md active:scale-95 transition-all'
                onClick={handleSubmit}>Enviar</button>
        </div>
    )
}

export default UsuarioForm