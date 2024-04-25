import React, { useEffect, useState } from 'react'
import NavBar from '../../ui/NavBar/NavBar'
import { fetchData } from '../../api/Fetch';
import { LinesChart } from '../../chartJS/LinesChart';
import BarChart from '../../chartJS/BarChart';
import { PolarChart } from '../../chartJS/PolarChart';

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
            <div className=' h-auto flex flex-col md:flex-col justify-center items-center align-middle bg-white mt-24'>

                <div className='flex flex-row w-full  justify-center items-center'>
                    <div className='p-5 shadow-lg rounded-md size-2/6'>
                        <LinesChart />
                    </div>
                    <div className='p-5 shadow-lg rounded-md size-2/6'>
                        <BarChart />
                    </div>
                </div>

                <div className='p-5 shadow-lg rounded-md size-2/6 justify-center flex'>
                    <PolarChart />
                </div>
            </div>
        </>
    )
}

export default Home