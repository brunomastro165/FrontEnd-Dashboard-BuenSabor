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

const Sucursal = () => {

    const CRUD = new BackendMethods<IEmpresa>();

    const { idEmpresa } = useParams();

    const [sucursales, setSucursales] = useState<ISucursalShort[]>([]);

    const location = useLocation();

    const nombreEmpresa = location.state.nombre;

    console.log(nombreEmpresa)

    const dispatch = useAppDispatch();

    const updated = useAppSelector((state) => state.GlobalUpdated.updated);

    useEffect(() => {

        const fetchSucursal = async () => { //Método para llamar a todas las sucursales por su empresa
            try {
                const res: IEmpresa = await CRUD.getById(`http://localhost:8081/empresa/sucursales/${idEmpresa}`)
                const sucursales = res.sucursales;
                dispatch(setGlobalUpdated(false))

                //@ts-ignore | esto es porque le estoy asignando una sucursal completa a una sucursal short
                setSucursales(sucursales);
            } catch (error) {
                console.error(error)
            }
        }

        fetchSucursal();

    }, [updated])


    return (
        <>
            <NavBar title={`Sucursales de ${nombreEmpresa}`} />
            <div className='mt-24'>
                <ContainerCardSucursal
                    data={sucursales} />
            </div>
        </>
    )
}

export default Sucursal