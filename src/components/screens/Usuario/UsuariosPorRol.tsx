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

const UsuariosPorRol = () => {

    const backend = new BackendMethods()

    const [loading, setLoading] = useState<boolean>(false);

    const [empleados, setEmpleados] = useState<IEmpleado[]>([])

    const [title, setTitle] = useState<string>('');

    const [data, setData] = useState<IItem[]>([]);

    const { getAccessTokenSilently } = useAuth0()

    const transformData = (empleadoData: IEmpleado[]): IItem[] => {
        return empleadoData.map(empleado => ({
            id: empleado.id,
            denominacion: empleado.nombre,
            param2: empleado.apellido,
            param3: empleado.email,
            param4: empleado.rol,
            endpoint: 'empleado'
        }));
    }

    useEffect(() => {

        const getEmpleados = async () => {
            try {
                const res: IEmpleado[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}`, getAccessTokenSilently) as IEmpleado[]
                const data: IItem[] = transformData(res)
                setData(data);
                setEmpleados(res)
            } catch (error) {
                console.error(error)
            }
        }
        getEmpleados();

    }, [loading])

    return (
        <>
            <BasePage
                title={title}
                data={data}
                loading={loading}
                row1="ID"
                row2="Nombre de usuario"
                row3="Auth0Id"
                row4="Rol"
                row5=""
                endpoint={`empleado`}
            />
        </>
    )
}

export default UsuariosPorRol
