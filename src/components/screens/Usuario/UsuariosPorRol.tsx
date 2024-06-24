import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { IUsuario } from '../../../types/Usuario';
import NavBar from '../../ui/NavBar/NavBar';
import { Table, Title } from '@tremor/react';
import BasePage from '../Productos/BasePage';
import { IItem } from '../../../types/Table/TableItem';
import { BackendClient, BackendMethods } from '../../../services/BackendClient';
import { useAuth0 } from '@auth0/auth0-react';
import { IEmpleado } from '../../../types/Empleado';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';
import { setCategoriaSelector } from '../../../redux/slices/mostrarCategoriaSelector';
import LoadingMessage from '../../ui/LoadingMessage/LoadingMessage';

const ITEMS_POR_PAGINA = 5;

const UsuariosPorRol = () => {

    const backend = new BackendMethods()

    const [loading, setLoading] = useState<boolean>(true);

    const updated = useAppSelector((state) => state.GlobalUpdated.updated)

    const dispatch = useAppDispatch();

    const [empleados, setEmpleados] = useState<IEmpleado[]>([])

    const [title, setTitle] = useState<string>('Empleados');

    const [data, setData] = useState<IItem[]>([]);

    const { getAccessTokenSilently } = useAuth0()

    const idPagina = useAppSelector((state) => state.GlobalIdPaginador.idPaginador)

    const eliminado = useAppSelector((state) => state.GlobalBorrados.borrado)

    const { idSucursales } = useParams();

    useEffect(() => {
        dispatch(setCategoriaSelector(false))
    }, [])


    const transformData = (empleadoData: IEmpleado[]): IItem[] => {
        return empleadoData.map(empleado => ({
            id: empleado.id,
            denominacion: empleado.nombre,
            param2: empleado.telefono,
            param3: empleado.email,
            param4: empleado.tipoEmpleado,
            endpoint: 'empleado'
        }));
    }

    console.log(eliminado);

    useEffect(() => {
        const getEmpleados = async () => {
            try {
                //TODO ESTO TIENE QUE FILTRAR POR EMPRESA/SUCURSAL
                const res: IEmpleado[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}empleado/getPorSucursal/${idSucursales}?limit=${ITEMS_POR_PAGINA}&startId=${idPagina}`, getAccessTokenSilently) as IEmpleado[]
                const empleadoFiltrado: IEmpleado[] = res.filter((empleado) => empleado.eliminado === eliminado)
                const data: IItem[] = transformData(empleadoFiltrado)
                setData(data);
                setEmpleados(res)
                setLoading(false);
            } catch (error) {
                console.error(error)
            }
        }
        getEmpleados();
        dispatch(setGlobalUpdated(false))
    }, [loading, updated, idPagina, eliminado])

    return (
        <>
            {!loading ? (<BasePage
                title={title}
                data={data}
                loading={loading}
                row1="ID"
                row2="Nombre"
                row3="Teléfono"
                row4="Email"
                row5="Rol"
                endpoint={`empleado`}
            />) : (<LoadingMessage titulo='Cargando usuarios desde el servidor'/>)}

        </>
    )
}

export default UsuariosPorRol
