import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { IUsuario } from '../../../types/Usuario';
import NavBar from '../../ui/NavBar/NavBar';
import { Table, Title } from '@tremor/react';
import BasePage from '../Productos/BasePage';
import { IItem } from '../../../types/Table/TableItem';

const UsuariosPorRol = () => {

    const [loading, setLoading] = useState<boolean>(false);

    const [title, setTitle] = useState<string>('');

    const [data, setData] = useState<IItem[]>([]);

    const location = useLocation();

    const usuarios = location.state.data as IUsuario[];

    const transformData = (usuariosData: IUsuario[]): IItem[] => {
        return usuariosData.map(usuario => ({
            id: usuario.id,
            denominacion: usuario.username,
            param2: usuario.auth0Id,
            param3: usuario.rol,
            param4: '',
        }));
    }

    useEffect(() => {
        const fetchInsumo = async () => {
            const transformedData = transformData(usuarios);
            setData(transformedData);
            setLoading(true);
        }
        fetchInsumo();

        const rol = usuarios[0].rol;
        setTitle(rol);

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
                endpoint={`usuarios`}
            />
        </>
    )
}

export default UsuariosPorRol
