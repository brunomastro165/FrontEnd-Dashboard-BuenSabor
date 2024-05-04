import { useEffect, useState } from 'react'
import NavBar from '../../ui/NavBar/NavBar'
import { fetchData } from '../../api/Fetch';
import Example from '../../tremor/Example';
import { TrackerServ } from '../../tremor/TrackerServ';
import { GraficoBarra } from '../../tremor/GraficoBarra';

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
                    <GraficoBarra />
                </div>

            </div>
            <div className='mt-36 h-1/2 flex justify-center items-center align-middle'>
                <div className='p-5 rounded-md size-3/6'>
                    <Example />
                </div>
                <div className='p-5 rounded-md size-2/6'>
                    <TrackerServ />
                </div>
            </div>
        </>
    )
}

export default Home