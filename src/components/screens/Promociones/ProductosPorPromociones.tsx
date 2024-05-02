import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { IUsuario } from '../../../types/Usuario';
import NavBar from '../../ui/NavBar/NavBar';
import { Table, Title } from '@tremor/react';
import BasePage from '../Productos/BasePage';
import { IItem } from '../../../types/Table/TableItem';
import { IPromos } from '../../../types/Promos';
import { IArticuloManufacturado } from '../../../types/ArticuloManufacturado';

const ProductosPorPromociones = () => {

    console.log("entró")
    
    const [loading, setLoading] = useState<boolean>(false);

    const [title, setTitle] = useState<string>('');

    const [data, setData] = useState<IItem[]>([]);

    const location = useLocation();

    const articulosManufacturados = location.state.data as IArticuloManufacturado[];

    const transformData = (articulos: IArticuloManufacturado[]): IItem[] => {
        return articulos.map(articulo => ({
            id: articulo.id,
            denominacion: articulo.denominacion,
            param2: articulo.descripcion,
            param3: articulo.precioVenta,
            param4: articulo.tiempoEstimadoMinutos // CAMBIAR
        }));
    }

    useEffect(() => {
        const fetchInsumo = async () => {
            const transformedData = transformData(articulosManufacturados);
            setData(transformedData);
            setLoading(true);
        }
        fetchInsumo();

    }, [loading])

    return (
        <>
            <BasePage
                title='Promoción'
                data={data}
                loading={loading}
                row1="ID"
                row2="Denominación"
                row3="Descripcion"
                row4="Precio venta"
                row5="Stock"
                endpoint={`articulosManufacturados`}
            />
        </>
    )
}

export default ProductosPorPromociones
