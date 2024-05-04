import React, { useEffect, useState } from 'react'
import { IItem } from '../../../types/Table/TableItem';
import BasePage from './BasePage';
import { fetchData } from '../../api/Fetch';
import { IArticuloManufacturado } from '../../../types/ArticuloManufacturado';

const Manufacturados = () => {

    const [loading, setLoading] = useState<boolean>(false);

    const [data, setData] = useState<IItem[]>([]);

    //Esto es para normalizar los datos de IArticuloInsumo que traiga el Fetch, asi la tabla puede entender
    //distintos tipos de datos.

    const transformData = (manufacturadosData: IArticuloManufacturado[]): IItem[] => {
        return manufacturadosData.map(manufacturado => ({
            id: manufacturado.id,
            denominacion: manufacturado.denominacion,
            param2: manufacturado.descripcion,
            param3: manufacturado.precioVenta,
            param4: manufacturado.tiempoEstimadoMinutos // CAMBIAR
        }));
    }

    // Uso de la función
    useEffect(() => {
        const fetchManufacturado = async () => {
            const response = await fetchData("http://localhost:8080/articulosManufacturados");
            const transformedData = transformData(response);
            setData(transformedData);
            setLoading(true);
        }
        fetchManufacturado();
    }, [loading])

    return (
        <>
            <BasePage
                title="Articulos manufacturados"
                data={data}
                loading={loading}
                row1="ID"
                row2="Denominación"
                row3="Descripción"
                row4="Precio venta"
                row5="Stock"
                endpoint="articulosManufacturados"
            />
        </>
    )

}

export default Manufacturados