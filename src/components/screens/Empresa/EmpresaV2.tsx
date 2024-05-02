import React, { useEffect, useState } from 'react'
import ContainerCards from '../../ui/CointainerCards/ContainerCards'
import NavBar from '../../ui/NavBar/NavBar'
import { IRol } from '../../../types/Rol';
import { IEmpresa } from '../../../types/Empresa';
import { BackendClient } from '../../../services/BackendClient';


class Backend extends BackendClient<T> { }

const EmpresaV2 = () => {

    const backend = new Backend();

    const [empresas, setEmpresas] = useState<IEmpresa[]>([]);

    const getEmpresas = async () => {
        const res: IEmpresa[] = await backend.getAll("http://localhost:8080/empresas");
        setEmpresas(res);
    }

    useEffect(() => {
        getEmpresas();
    }, [])

    return (
        <>
            <NavBar title='Empresas' />
            <div className='mt-24'>
                <ContainerCards data={empresas} />

            </div>
        </>
    )
}

export default EmpresaV2