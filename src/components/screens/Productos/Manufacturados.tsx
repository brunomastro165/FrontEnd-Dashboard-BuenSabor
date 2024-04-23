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

const Manufacturados = () => {

    const [loading, setLoading] = useState<boolean>(false);

    const [data, setData] = useState<IItem[]>([]);

    useEffect(() => {
        const fetchInsumo = async () => {
            const response = await fetchData("/data/data.json");
            setData(response);
            setLoading(true);
        }
        fetchInsumo();
    }, [loading])

    return (
        <>
            <BasePage
                title="Articulos manufacturados"
                data={data}
                loading={loading}
            />
        </>
    )

}

export default Manufacturados