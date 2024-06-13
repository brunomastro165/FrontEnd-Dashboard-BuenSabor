import { useEffect, useState } from 'react'
import NavBar from '../../ui/NavBar/NavBar'
import Example from '../../tremor/Example';
import { TrackerServ } from '../../tremor/TrackerServ';
import { GraficoBarra } from '../../tremor/GraficoBarra';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setGlobalUrl } from '../../../redux/slices/globalUrl';
import { ISucursal } from '../../../types/Sucursal';
import { IEmpresa } from '../../../types/Empresa';
import { BackendClient } from '../../../services/BackendClient';
import VentasSucGrafico from '../../tremor/VentasSucGrafico';
import { BarListVisitas } from '../../tremor/BarListVisitas';
import { ICategoria } from '../../../types/Categoria';
import { IArticuloManufacturado } from '../../../types/ArticuloManufacturado';
import GlobalLogged, { setLogged } from '../../../redux/slices/logged';
import { setIdEmpresa } from '../../../redux/slices/idEmpresa';


//@ts-ignore
class GenericBackend extends BackendClient<T> { } //Métodos genéricos

const backend = new GenericBackend();


const Home = () => {

    const [articulosManufacturados, setArticulosManufacturados] = useState<IArticuloManufacturado[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const { idEmpresa, idSucursales } = useParams();

    const dispatch = useAppDispatch()

    const id = useAppSelector((state) => state.GlobalIdEmpresa.idEmpresa)

    const url = `/${idEmpresa}/sucursales/${idSucursales}`

    const [sucursales, setSucursales] = useState<ISucursal[]>([]);

    const logged = useAppSelector((state) => state.logged.logged)

    console.log(logged)

    useEffect(() => {
        dispatch(setGlobalUrl(url), setLogged(true))
        sessionStorage.setItem('logged', 'true');
    }, [logged])

    useEffect(() => {
        dispatch(setIdEmpresa(idEmpresa))
    }, [])

    return (
        <div className='overflow-hidden'>
            <NavBar title='Inicio' />

            <div className='flex flex-col'>
                <div className=' m-5 rounded-btn mt-24 shadow-lg'>
                    <h1 className=' mx-auto font-Roboto text-2xl p-5  text-red-600 rounded-t'>Articulos más vendidos:</h1>
                    <div className=' flex flex-col md:flex-col justify-center items-center align-middle '>
                        <div className='p-5 rounded-md size-full '>
                            <GraficoBarra />
                        </div>
                        {/* <div className='p-5 rounded-md size-full md:size-3/6'>
                            <BarListVisitas articulos={articulosManufacturados} />
                        </div> */}
                    </div>
                </div>


                <div className='border m-5 rounded-btn mt-24 shadow-lg'>
                    <h1 className=' mx-auto font-Roboto text-2xl p-5  text-red-600 rounded-t'>Ventas:</h1>
                    <div className=' flex flex-col md:flex-row  justify-center items-center align-middle '>
                        <div className='p-5 rounded-md size-full'>
                            <Example />
                        </div>
                        {/* <div className='p-5 rounded-md size-full'>
                    <TrackerServ />
                </div> */}
                        <div className='p-5 rounded-md size-full'>
                            <VentasSucGrafico />
                        </div>
                    </div>
                </div>


                <div className='border m-5 rounded-btn mt-24 shadow-lg'>
                    <h1 className=' mx-auto font-Roboto text-2xl p-5  text-red-600 rounded-t'>Servidor:</h1>
                    <div className=' flex flex-col md:flex-row justify-center items-center align-middle '>

                        <div className='p-5 rounded-md size-full'>
                            <TrackerServ />
                        </div>


                        <div className='p-5 rounded-md size-full'>
                            <TrackerServ />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home