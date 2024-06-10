import React, { useEffect, useState } from 'react'
import { BackendClient } from '../../../services/BackendClient';
import { IRol } from '../../../types/Rol';
import CardRol from '../Cards/CardRol';
import EmpresaForm from '../Form/EmpresaForm';
import RolForm from '../Form/RolForm';
import { useAuth0 } from '@auth0/auth0-react';

//@ts-ignore
class Backend extends BackendClient<T> { }

const ContainerCardsRol = () => {

    const { getAccessTokenSilently } = useAuth0();

    const backend = new Backend();

    const [roles, setRoles] = useState<IRol[]>([]);

    const [open, setOpen] = useState<boolean>(false);

    const getRol = async () => {
        const res: IRol[] = await backend.getAll("https://backend-jsonserver-1.onrender.com/roles", getAccessTokenSilently);
        setRoles(res);
    }

    useEffect(() => {
        getRol();
    }, [])

    return (
        <>

            <div className='w-full flex justify-center items-center'>
                <button className='text-2xl font-Roboto btn btn-success bg-white text-green-600 hover:text-white  hover:bg-green-600'
                    onClick={() => setOpen(true)}>Agregar rol +</button>
            </div>

            <div className='m-5 flex items-center justify-center  h-screen p-2'>
                <div className='flex mb-24 flex-wrap items-center w-full justify-around'>
                    {roles.map((rol, index) => (
                        <CardRol
                            denominacion={rol.denominacion}
                            id={rol.id}
                            usuarios={rol.usuarios}
                            key={index} />
                    ))}
                </div>
            </div>


            {open && (
                <div className="fixed z-50 inset-0 overflow-y-auto w-full">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 m-14">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  w-full md:w-1/2">
                            <RolForm open={open} setOpen={setOpen} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )

}

export default ContainerCardsRol