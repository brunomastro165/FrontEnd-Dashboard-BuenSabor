//@ts-nocheck
import { useEffect, useState } from 'react'
import NavBar from '../../ui/NavBar/NavBar'
import Example from '../../tremor/Example';
import { TrackerServ } from '../../tremor/TrackerServ';
import { GraficoBarra } from '../../tremor/GraficoBarra';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/redux';
import { setGlobalUrl } from '../../../redux/slices/globalUrl';
import { ISucursal } from '../../../types/Sucursal';
import { IEmpresa } from '../../../types/Empresa';
import { BackendClient } from '../../../services/BackendClient';
import VentasSucGrafico from '../../tremor/VentasSucGrafico';
import { BarListVisitas } from '../../tremor/BarListVisitas';
import { ICategoria } from '../../../types/Categoria';
import { IArticuloManufacturado } from '../../../types/ArticuloManufacturado';

class GenericBackend extends BackendClient<T> { } //Métodos genéricos

const backend = new GenericBackend();


const Home = () => {

    const [articulosManufacturados, setArticulosManufacturados] = useState<IArticuloManufacturado[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const { idEmpresa, idSucursales } = useParams();

    const dispatch = useAppDispatch()

    const url = `/${idEmpresa}/sucursales/${idSucursales}`

    const [sucursales, setSucursales] = useState<ISucursal[]>([]);

    const getSucursales = async () => {

        if (idEmpresa) {
            const idEmpresaString = idEmpresa.toString();
            const res: IEmpresa = await backend.get("https://backend-jsonserver-1.onrender.com/empresas", idEmpresaString);
            const sucursales = res.sucursales;
            setSucursales(sucursales)
        }

    }

    //@ts ignore
    const obtenerArticulos = (categoria: ICategoria): any[] => {

        let articulos = [...categoria.articulos];

        categoria.subCategorias.forEach(subCategoria => {
            articulos = [...articulos, ...obtenerArticulos(subCategoria)];
        });

        return articulos;
    }

    useEffect(() => {
        dispatch(setGlobalUrl(url))
    }, [loading])


    useEffect(() => {
        const fetchManufacturado = async () => {

            //Esto está hecho de maneria precaria debido a las limitaciones de JSON SERVER,
            // con un backend funcional se hará el endpoint correspondiente

            if (idEmpresa && idSucursales) {

                //Buscamos la empresa por el ID que nos traemos con useParams
                const idEmpresaString = idEmpresa.toString()
                const response: IEmpresa = await backend.get("https://backend-jsonserver-1.onrender.com/empresas", idEmpresaString)

                //Una vez dentro de la empresa, buscamos la sucursal seleccionada con useParams
                const idSucursalNumber = Number(idSucursales)
                const sucursal: ISucursal | undefined = response.sucursales.find((sucursal: ISucursal) => sucursal.id === idSucursalNumber)

                //Ahora buscamos las categorías dentro de la sucursal que fué seleccionada
                const categorias: ICategoria[] | undefined = sucursal?.categorias

                //Llamada a la función obtener articulos, la cual nos retorna todos los articulosManufacturados dentro de todas las categorías
                const arCategorias: ICategoria[] | undefined = categorias;
                let articulos: IArticuloManufacturado[] = [];

                arCategorias?.forEach(categoria => {
                    articulos = [...articulos, ...obtenerArticulos(categoria)];
                });

                //Llamada a la función transformData, la cual nos retorna los datos de articuloManufacturado en un tipo de dato
                //compatible con la el componente Table
                setArticulosManufacturados(articulos);
                getSucursales()
                setLoading(true);
            }
        }
        fetchManufacturado();
    }, [loading])


    return (
        <div className='overflow-hidden'>
            <NavBar title='Inicio' />

            <div className='flex flex-col'>
                <div className=' m-5 rounded-btn mt-24 shadow-lg'>
                    <h1 className=' mx-auto font-Roboto text-2xl p-5  text-red-600 rounded-t'>Stock:</h1>
                    <div className=' flex flex-col md:flex-row justify-center items-center align-middle '>
                        <div className='p-5 rounded-md size-full md:size-2/6'>
                            <GraficoBarra />
                        </div>
                        <div className='p-5 rounded-md size-full md:size-3/6'>
                            <BarListVisitas articulos={articulosManufacturados} />
                        </div>
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
                            {sucursales.map((sucursal) => (
                                <VentasSucGrafico id={sucursal.id} nombre={sucursal.nombre} key={sucursal.id} />
                            ))}
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