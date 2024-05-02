import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useForm } from '../../../hooks/useForm'
import { ISucursal } from '../../../types/Sucursal'
import { genericInput } from './Inputs/GenericInput';
import { BackendClient } from '../../../services/BackendClient';
import { IEmpresa } from '../../../types/Empresa';
import { IUsuario } from '../../../types/Usuario';

interface IForm {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

type FormState = {
    [key: string]: any;
    id: number;
    denominacion: string;
    usuarios: IUsuario[] | null;
};

class GenericBackend extends BackendClient<T> { } //Métodos genéricos 

const RolForm: FC<IForm> = ({ open, setOpen }) => {

    const backend = new GenericBackend(); //Objeto de BackendClient

    const [loaded, setLoaded] = useState<boolean>(false);

    const postRol = async (data) => {
        try {
            const res: IEmpresa = await backend.post("http://localhost:8080/roles", data);
            console.log(res)
        } catch (error) {
            console.error(error)
        }
    }
        ;

    const { handleChange, values, resetForm, setValues, handleSelect } = useForm<FormState>({
        id: 0,
        denominacion: '',
        usuarios: null
    })

    const handleSubmit = () => {
        postRol(values)
        resetForm();
        setOpen(false)
    }



    return (
        <div className='w-full flex flex-col items-center justify-center space-y-4 p-10 '
            onSubmit={handleSubmit}
        >
            <div className='w-full flex justify-end '>
                <h1 className='flex text-end justify-end bg-red-600 btn btn-error rounded-full text-white text-xl cursor-pointer w-min'
                    onClick={() => { setOpen(false), resetForm() }}>X</h1>
            </div>

            <h2 className='text-3xl font-Roboto'>Agrega tu Rol</h2>
            {/*Mapeo los objetos que traigo al formulario, dependiendo de cada objeto, genero un input distinto */}

            <div className='w-full'>

                <div className="relative z-0 w-full mb-5 group">
                    {genericInput('denominacion', 'text', values.razonSocial, handleChange)} {/* Razón Social */}
                </div>

            </div>

            <button className='bg-red-600 text-white px-4 py-2 rounded-md active:scale-95 transition-all'
                onClick={handleSubmit}>Enviar</button>
        </div>
    )
}

export default RolForm