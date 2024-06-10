import React, { useEffect, useState } from 'react'
import { BackendMethods } from '../../../services/BackendClient';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IUnidadMedida } from '../../../types/UnidadMedida';
import { setUnidades } from '../../../redux/slices/unidadMedida';
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';
import UnidadMedidaForm from '../Form/UnidadMedidaForm';
import { setGlobalInitialValues } from '../../../redux/slices/globalInitialValues';
import CardUnidadMedida from '../Cards/CardUnidadMedida';
import SearchBar from '../SearchBar/SearchBar';
import { useAuth0 } from '@auth0/auth0-react';

const ContainerUnidadesDeMedida = () => {

    const {getAccessTokenSilently} = useAuth0()
    const backend = new BackendMethods();

    const dispatch = useAppDispatch();

    const [unidades, setUnidades] = useState<IUnidadMedida[]>([]);

    const [filtro, setFiltro] = useState<IUnidadMedida[]>([]);
    //const unidades = useAppSelector((state) => state.UnidadesMedida.UnidadesMedida)

    const updated = useAppSelector((state) => state.GlobalUpdated.updated)

    const search = useAppSelector((state) => state.search.search)

    const [open, setOpen] = useState<boolean>(false);

    const hanlderOpen = () => {
        dispatch(setGlobalInitialValues({ denominacion: '' }))
        setOpen(true)
    }

    const getUnidades = async () => {
        const res: IUnidadMedida[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}UnidadMedida`, getAccessTokenSilently) as IUnidadMedida[];
        const unidadesHabilitadas = res.filter((unidad) => !unidad.eliminado)
        setUnidades(unidadesHabilitadas)
        dispatch(setGlobalUpdated(false))
    }

    useEffect(() => {
        getUnidades();
    }, [updated])


    const handlerFilter = () => {
        const unidadesFiltradas = unidades.filter((unidad) => unidad.denominacion.toLowerCase().includes(search))
        console.log(unidadesFiltradas)
        setFiltro(unidadesFiltradas)
    }

    useEffect(() => {
        handlerFilter()
    }, [search, unidades, updated])

    return (
        <>
            <div className=' p-10'>
                <SearchBar />
            </div>

            <div className='flex justify-end fixed right-0'>
                <button className='text-2xl z-50 font-Roboto btn btn-success my-4 bg-white text-green-600 hover:text-white mr-10 hover:bg-green-600'
                    onClick={() => hanlderOpen()}
                >Agregar +</button>
            </div>

            <div className='flex flex-wrap justify-center items-center  m-5 mt-10'>
                {filtro.map((unidad) => (
                    <CardUnidadMedida
                        denominacion={unidad.denominacion}
                        id={unidad.id} />
                ))}
            </div>

            {open &&
                <div className="fixed z-50 inset-0 overflow-y-auto w-full">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 m-14">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  w-full md:w-1/2">
                            <UnidadMedidaForm method='POST' open={open} setOpen={setOpen} key={1} />
                        </div>
                    </div>
                </div>
            }

        </>
    )
}

export default ContainerUnidadesDeMedida