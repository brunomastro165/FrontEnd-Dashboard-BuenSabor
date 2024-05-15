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
const Sucursal = () => {

    const CRUD = new BackendMethods<IEmpresa>();

    const { idEmpresa } = useParams();

    const [sucursales, setSucursales] = useState<ISucursalShort[]>([]);

    const dispatch = useAppDispatch();

    const updated = useAppSelector((state) => state.GlobalUpdated.updated);

    useEffect(() => {

        const fetchSucursal = async () => { //Método para llamar a todas las sucursales por su empresa
            try {
                // const res: ISucursalShort[] = await CRUD.getAll(`http://localhost:8081/empresa/${idEmpresa}/sucursales`)

                //@ts-ignore
                const res: IEmpresa = await CRUD.getAll(`http://localhost:8081/empresa/sucursales/${idEmpresa}`)
                const sucursales = res.sucursales;

                dispatch(setGlobalUpdated(false))

                //@ts-ignore TODO verificar bien esto
                setSucursales(sucursales);

                console.log(res)
            } catch (error) {
                console.error(error)
            }
        }

        fetchSucursal();

    }, [updated])


    return (
        <div className='mt-24'>
            <ContainerCardSucursal
                data={sucursales} />
        </div>
    )
}

export default Sucursal