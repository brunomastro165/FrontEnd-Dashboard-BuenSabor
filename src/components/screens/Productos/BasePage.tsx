import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import NavBar from '../../ui/NavBar/NavBar';
import SearchBar from '../../ui/SearchBar/SearchBar';
import Table from '../../ui/Table/Table';
import { IBasePage } from '../../../types/BasePage';
import { IItem } from '../../../types/Table/TableItem';
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';
import CategoriaSelector from '../../ui/CategoriaSelector/CategoriaSelector';
import { setCategoriaSelector } from '../../../redux/slices/mostrarCategoriaSelector';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setIdPaginador } from '../../../redux/slices/idPaginador';
import { FaArrowCircleRight } from "react-icons/fa";
// const ITEMS_PER_PAGE = 7;

const BasePage: FC<IBasePage> = ({ data, title, loading, row1, row2, row3, row4, row5, endpoint }) => {

    const [filteredData, setFilteredData] = useState<IItem[]>([]);

    const [currentPage, setCurrentPage] = useState<number>(1);

    const selector = useAppSelector((state) => state.search.search);

    const idPagina = useAppSelector((state) => state.GlobalIdPaginador.idPaginador)

    const update = useAppSelector((state) => state.GlobalUpdated.updated)

    const dispatch = useAppDispatch()

    // useEffect(() => {
    //     setCurrentPage(1);
    //     const filteredInsumosData = data.filter(d => d.denominacion.toLowerCase().includes(selector.toLowerCase()));
    //     setFilteredData(filteredInsumosData);
    //     dispatch(setGlobalUpdated(false))
    // }, [selector, loading, data]);

    useEffect(() => {
        dispatch(setCategoriaSelector(true))
    }, [])

    //Lógica de la paginación

    // const indexOfLastItem = currentPage * ITEMS_PER_PAGE;

    // const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

    // const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

    console.log("paginoide")
    console.log(idPagina)
    return (
        <>
            <NavBar title={title} />

            <div className='m-0 md:m-16 pt-14 '>

               {endpoint !== 'pedido' && <SearchBar />} 
                <div className='pt-16'>
                    {data.length >= 0 ?
                        <Table items={data} row1={row1} row2={row2} row3={row3}
                            row4={row4} row5={row5} endpoint={endpoint}
                        />
                        :
                        <div className=' flex flex-col justify-center items-center text-center w-full '>
                            <img src="/assets/img/buscando.svg" alt=""
                                className='size-1/3' />
                            <h1 className='mt-2 font-Roboto text-2xl '>No encontramos '{selector}'</h1>
                        </div>}

                    {/* Acá va el paginador */}

                    {/* <div className='flex flex-row items-center justify-center '>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                className={`border-red-500 border m-4 px-2 py-1 rounded-lg 
                                ${currentPage === index + 1 ? 'bg-red-600 text-white' : 'bg-white text-red-600'}`}
                                key={index} onClick={() => setCurrentPage(index + 1)}>
                                {index + 1}
                            </button>
                        ))}
                    </div> 
                    */}
                </div>


                <div className={`flex flex-row items-center ${idPagina !== 0 ? 'justify-between' : 'justify-end'} mt-2`}>
                    {idPagina !== 0 && <button className='btn btn-error text-white ' onClick={() => dispatch(setIdPaginador(1))}>Primera página</button>}
                    <div className=''>
                        {idPagina > 1 &&
                            <button className='hover:scale-105 transition-all hover:-translate-x-3' onClick={() => dispatch(setIdPaginador(idPagina - 1))}>
                                <FaArrowCircleRight className='rotate-180 text-4xl text-red-600' />
                            </button>
                        }

                        {data.length >= 0 && data.length < 5 ||
                            <button className='hover:scale-105 transition-all hover:translate-x-3' onClick={() => dispatch(setIdPaginador(idPagina + 1))}>
                                <FaArrowCircleRight className=' text-4xl text-red-600' />
                            </button>
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default BasePage