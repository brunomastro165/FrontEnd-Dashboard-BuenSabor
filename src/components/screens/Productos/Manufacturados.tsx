import React, { useEffect, useState } from 'react'
import Table from '../../ui/Table/Table'
import { CiSquarePlus } from "react-icons/ci";
import { useParams } from 'react-router-dom';
import NavBar from '../../ui/NavBar/NavBar';
import SearchBar from '../../ui/SearchBar/SearchBar';
import { IItem } from '../../../types/Table/TableItem';
import { useAppSelector } from '../../../hooks/redux';
import useFilteredData from '../../../hooks/useFilteredData';
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
            param3: manufacturado.precioVenta, // Aquí puedes poner la categoría que desees
            param4: manufacturado.tiempoEstimadoEnMinutos
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
                row5="Tiempo estimado"
                endpoint="articulosManufacturados"
            />
        </>
    )

}

export default Manufacturados