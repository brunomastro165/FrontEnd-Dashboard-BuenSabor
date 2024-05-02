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

    const [title, setTitle] = useState<string>('');

    const [data, setData] = useState<IItem[]>([]);

    const location = useLocation();

    const sucursales = location.state.data as ISucursal[];

    const transformData = (sucursalesData: ISucursal[]): IItem[] => {
        return sucursalesData.map(sucursal => ({
            id: sucursal.id,
            denominacion: sucursal.nombre,
            param2: sucursal.domicilio.calle,
            param3: sucursal.horarioApertura,
            param4: sucursal.horarioCierre,
        }));
    }

    useEffect(() => {
        const fetchInsumo = async () => {
            const transformedData = transformData(sucursales);
            setData(transformedData);
            setLoading(true);
        }
        fetchInsumo();
    }, [loading])

    return (
        <>
            <BasePage
                title='Sucursales'
                data={data}
                loading={loading}
                row1="ID"
                row2="Nombre"
                row3="Domicilio"
                row4="Horario Apertura"
                row5="Horario Cierre"
                endpoint={`sucursal`}
            />
        </>
    )
}

export default SucursalPorEmpresa
