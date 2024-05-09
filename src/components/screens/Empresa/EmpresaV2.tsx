//@ts-nocheck
import React, { useEffect, useState } from 'react'
import ContainerCards from '../../ui/CointainerCards/ContainerCards'
import NavBar from '../../ui/NavBar/NavBar'
import { IRol } from '../../../types/Rol';
import { IEmpresa } from '../../../types/Empresa';
import { BackendClient } from '../../../services/BackendClient';
import { useParams } from 'react-router-dom';
import ContainerCardEmpresa from '../../ui/CointainerCards/ContainerCardEmpresa';

class Backend extends BackendClient<T> { }

const EmpresaV2 = () => {

    const backend = new Backend();

    const [empresa, setEmpresa] = useState<IEmpresa>();

    const { idEmpresa, idSucursales } = useParams();

    const getEmpresa = async () => {
        if (idEmpresa) {
            const idEmpresaString = idEmpresa.toString()
            const response: IEmpresa = await backend.get("https://backend-jsonserver-1.onrender.com/empresas", idEmpresaString)
            setEmpresa(response);
        }
    }

    useEffect(() => {
        getEmpresa();
    }, [])

    return (
        <>
            <NavBar title='Empresas' />
            <div className='mt-24'>
                <ContainerCardEmpresa
                    cuil={empresa?.cuil}
                    id={empresa?.id}
                    nombre={empresa?.nombre}
                    razonSocial={empresa?.razonSocial}
                    sucursales={empresa?.sucursales}
                    key={empresa?.id} />
            </div>
        </>
    )
}

export default EmpresaV2