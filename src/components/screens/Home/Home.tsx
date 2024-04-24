import React, { useEffect, useState } from 'react'
import NavBar from '../../ui/NavBar/NavBar'
import { Doughnut } from 'react-chartjs-2';
import { fetchData } from '../../api/Fetch';
import { VerticalBarChart } from '../../chartJS/VerticalBarChart';

const Home = () => {

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchInsumo = async () => {
            const response = await fetchData("http://localhost:8080/articulosInsumos");
            setData(response);
            setLoading(true);
        }
        fetchInsumo();
    }, [loading])

    return (
        <>
            <NavBar title='Inicio' />
            <div className='mt-24'>

            </div>
        </>
    )
}

export default Home