import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
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

const UsuariosPorRol = () => {

    const backend = new BackendMethods()

    const [loading, setLoading] = useState<boolean>(false);

    const updated = useAppSelector((state) => state.GlobalUpdated.updated)

    const dispatch = useAppDispatch();

    const [empleados, setEmpleados] = useState<IEmpleado[]>([])

    const [title, setTitle] = useState<string>('');

    const [data, setData] = useState<IItem[]>([]);

    const { getAccessTokenSilently } = useAuth0()

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

    useEffect(() => {
        const getEmpleados = async () => {
            try {
                //TODO ESTO TIENE QUE FILTRAR POR EMPRESA/SUCURSAL
                const res: IEmpleado[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}empleado`, getAccessTokenSilently) as IEmpleado[]
                const data: IItem[] = transformData(res)
                setData(data);
                setEmpleados(res)
            } catch (error) {
                console.error(error)
            }
        }
        getEmpleados();
        dispatch(setGlobalUpdated(false))
    }, [loading, updated])

    return (
        <>
            <BasePage
                title={title}
                data={data}
                loading={loading}
                row1="ID"
                row2="Nombre"
                row3="Teléfono"
                row4="Email"
                row5="Rol"
                endpoint={`empleado`}
            />
        </>
    )
}

export default UsuariosPorRol
