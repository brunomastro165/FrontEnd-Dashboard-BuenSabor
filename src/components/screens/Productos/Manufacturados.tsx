import React from 'react'
import Table from '../../ui/Table/Table'
import { CiSquarePlus } from "react-icons/ci";
import { useParams } from 'react-router-dom';
import NavBar from '../../ui/NavBar/NavBar';

const Manufacturados = () => {

    //Acá iría el fetch al endpoint que carga todos los productos

    return (
        <>
            <NavBar title='Manufacturados' />
            <div className='m-0 md:m-16 pt-10'>
                <div className='w-full  flex items-center justify-center '>
                    <div className='flex items-center justify-center fixed w-full z-50 '>
                        <label className="input input-bordered flex bg-white items-center gap-2 w-1/2 shadow-lg  z-50">
                            <input type="text" className="grow bg-white z-50" placeholder="Buscar productos..." />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                        </label>
                        {/*Este botón debería ir vinculado con el PUT de producto */}
                        <button className='text-white text-5xl ml-4 rounded-md bg-green-600  shadow-lg'>
                            <CiSquarePlus className='hover:-rotate-90 transition-all' />
                        </button>
                    </div>
                </div>

                <div className='pt-16'>
                    <Table />
                </div>
            </div>
        </>
    )
}

export default Manufacturados