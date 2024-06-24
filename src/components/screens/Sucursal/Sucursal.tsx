import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { ISucursal } from '../../../types/Sucursal';
import ContainerCardSucursal from '../../ui/CointainerCards/ContainerCardSucursal';
import { ISucursalShort } from '../../../types/ShortDtos/SucursalShort';
import { BackendMethods } from '../../../services/BackendClient';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IEmpresaShort } from '../../../types/ShortDtos/EmpresaShort';
import { IEmpresa } from '../../../types/Empresa';
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';
import NavBar from '../../ui/NavBar/NavBar';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingMessage from '../../ui/LoadingMessage/LoadingMessage';

const Sucursal = () => {

    const { getAccessTokenSilently } = useAuth0();

    const CRUD = new BackendMethods<IEmpresaShort>();

    const { idEmpresa } = useParams();

    const [sucursales, setSucursales] = useState<ISucursalShort[]>([]);

    const location = useLocation();

    const nombreEmpresa = location?.state?.nombre;

    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState<boolean>(true);

    const updated = useAppSelector((state) => state.GlobalUpdated.updated);

    useEffect(() => {

        const fetchSucursal = async () => { //Método para llamar a todas las sucursales por su empresa
            try {
                const res: IEmpresaShort = await CRUD.getById(`${import.meta.env.VITE_LOCAL}empresa/sucursales/${idEmpresa}`, getAccessTokenSilently)
                const sucursales: ISucursalShort[] = res.sucursales;
                console.log(sucursales)
                dispatch(setGlobalUpdated(false))
                setLoading(false);
                setSucursales(sucursales);
            } catch (error) {
                console.log(error)
            }
        }

        fetchSucursal();

    }, [updated])


    return (
        <>
            {!loading ? (
                <>
                    <NavBar title={`Sucursales`} />
                    <div className='mt-24'>
                        <ContainerCardSucursal
                            data={sucursales} />
                    </div>
                </>
            ) : (<LoadingMessage titulo='Cargando sucursales desde el servidor' />)}
        </>
    )
}

export default Sucursal