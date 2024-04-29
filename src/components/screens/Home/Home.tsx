import { useEffect, useState } from 'react'
import NavBar from '../../ui/NavBar/NavBar'
import { fetchData } from '../../api/Fetch';
import Example from '../../tremor/Example';
import { GraficoArea } from '../../tremor/GraficoArea';
import { TrackerServ } from '../../tremor/TrackerServ';

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
            <div className='my- h-1/2 flex justify-center items-center align-middle'>
                <div className='p-5 rounded-md size-2/6'>
                    <GraficoArea/>
                </div>
                
            </div>
            <div className='mt-36 h-1/2 flex justify-center items-center align-middle'>
                <div className='p-5 rounded-md size-3/6'>
                    <Example/>
                </div>
                <div className='p-5 rounded-md size-2/6'>
                    <TrackerServ/>
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