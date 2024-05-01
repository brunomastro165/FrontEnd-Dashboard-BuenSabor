import React, { useEffect, useState } from 'react'
import { BackendClient } from '../../../services/BackendClient';
import { IRol } from '../../../types/Rol';
import CardRol from '../Cards/CardRol';

class Backend extends BackendClient<T> { }

const ContainerCardsRol = () => {

    const backend = new Backend();

    const [roles, setRoles] = useState<IRol[]>([]);

    const getRol = async () => {
        const res: IRol[] = await backend.getAll("http://localhost:8080/roles");
        setRoles(res);
    }

    useEffect(() => {
        getRol();
    }, [])

    console.log(roles)
    return (
        <div className='m-5 flex items-center justify-center  h-screen p-2'>
            <div className='flex mb-24 flex-wrap items-center w-full justify-around'>
                {roles.map((rol, index) => (
                    console.log(rol.usuarios),
                    <CardRol
                        denominacion={rol.denominacion}
                        id={rol.id}
                        usuarios={rol.usuarios}
                        key={index} />

                ))}
            </div>
        </div>
    )
}

export default ContainerCardsRol