import React, { FC, useEffect, useState } from 'react'
import { IContainerCards } from '../../../types/ContainerCards/ContainerCards'
import CardPromo from '../Cards/CardPromo';
import { IPromos } from '../../../types/Promos';
import PromoForm from '../Form/PromoForm';
import { BackendMethods } from '../../../services/BackendClient';
import { useParams } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setGlobalInitialValues } from '../../../redux/slices/globalInitialValues';
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingMessage from '../LoadingMessage/LoadingMessage';

const CPromos = () => {

    const { getAccessTokenSilently } = useAuth0();

    const backend = new BackendMethods();

    const [open, setOpen] = useState<boolean>(false);


    //REDUX 

    const dispatch = useAppDispatch();

    const search = useAppSelector((state) => state.search.search)

    const updated = useAppSelector((state) => state.GlobalUpdated.updated)

    const rol = useAppSelector((state) => state.GlobalRol.rol)

    console.log(rol)
    console.log("el rol la puta amdre")

    const [promos, setPromos] = useState<IPromos[] | undefined>([]);

    const [filteredPromos, setFilteredPromos] = useState<IPromos[] | undefined>([]);

    const [loading, setLoading] = useState<boolean>(true);

    const { idEmpresa, idSucursales } = useParams();

    const hanlderOpen = () => {
        dispatch(setGlobalInitialValues(
            {
                id: 0,
                denominacion: '',
                eliminado: false,
                fechaDesde: '',
                fechaHasta: '',
                horaDesde: null,
                horaHasta: null,
                precioPromocional: 0,
                detalles: [],
                idSucursales: [],
            }
        ))
        setOpen(true)
    }

    const getPromos = async () => {
        const res: IPromos[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}sucursal/getPromociones/${idSucursales}`, getAccessTokenSilently) as IPromos[];
        const promosHabilitadas = res.filter((promo) => !promo.eliminado)
        setPromos(promosHabilitadas)
        dispatch(setGlobalUpdated(false))
        setLoading(false);
    }

    useEffect(() => {
        getPromos();
    }, [updated])

    const handlerFilter = () => {
        const promosFiltradas = promos?.filter((promo) => promo.denominacion.toLowerCase().includes(search))
        setFilteredPromos(promosFiltradas)
    }

    useEffect(() => {
        handlerFilter()
    }, [search, promos, updated])


    return (
        <>
            <div className='p-10'>
                <SearchBar />
            </div>

            {(rol === 'ADMIN' || rol === 'SUPERADMIN' || rol === 'COCINERO') &&
                <div className='flex justify-end fixed right-0 z-50'>
                    <button className='text-2xl z-50 font-Roboto btn btn-success my-4 bg-white text-green-600 hover:text-white mr-10 hover:bg-green-600'
                        onClick={() => hanlderOpen()}
                    >Agregar +</button>
                </div >
            }

            {!loading ? (<div className='flex flex-wrap justify-center items-center  m-5 z-0 mt-10'>
                {filteredPromos?.map((promo, index) => (
                    <CardPromo
                        eliminado={promo.eliminado}
                        detalles={promo.detalles}
                        denominacion={promo.denominacion}
                        descripcionDescuento={promo.descripcionDescuento}
                        fechaDesde={promo.fechaDesde}
                        fechaHasta={promo.fechaHasta}
                        horaDesde={promo.horaDesde}
                        horaHasta={promo.horaHasta}
                        precioPromocional={promo.precioPromocional}
                        id={promo.id}
                        imagenes={promo.imagenes}
                        tipoPromocion={promo.tipoPromocion}
                        key={promo.id}
                        sucursales={promo.sucursales}
                    />
                ))}
            </div>)
                : (<LoadingMessage titulo='Cargando promociones desde el servidor' />)
            }


            {
                open && (
                    <div className="fixed z-50 inset-0 overflow-y-auto w-full">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 m-14">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  w-full md:w-1/2">
                                <PromoForm open={open} setOpen={setOpen} method='POST' />
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default CPromos