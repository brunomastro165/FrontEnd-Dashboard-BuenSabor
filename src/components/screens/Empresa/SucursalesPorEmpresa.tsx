import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { IUsuario } from '../../../types/Usuario';
import NavBar from '../../ui/NavBar/NavBar';
import { Table, Title } from '@tremor/react';
import BasePage from '../Productos/BasePage';
import { IItem } from '../../../types/Table/TableItem';
import { ISucursal } from '../../../types/Sucursal';

const SucursalPorEmpresa = () => {

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
 
    }, [loading])

    return (
        <>

        </>
    )
}

export default SucursalPorEmpresa
