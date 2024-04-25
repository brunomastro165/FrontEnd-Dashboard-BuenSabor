import React, { ChangeEvent } from 'react'
import { useState } from 'react'
import { CiSquarePlus } from 'react-icons/ci'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setSearch } from '../../../redux/slices/search';

const SearchBar = () => {

    //Usé redux para generar un state global y que la misma barra de búsqueda sirva para cualquier
    //tabla
    const [localSearch, setLocalSearch] = useState("");

    const dispatch = useAppDispatch()

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setLocalSearch(e.target.value);
        dispatch(setSearch(e.target.value))
    }

    return (
        <div className='w-full  flex items-center justify-center '>
            <div className='flex items-center justify-center fixed w-full z-50 '>
                <label className="input input-bordered flex bg-white items-center gap-2 w-1/2 shadow-lg  z-50">
                    <input type="text" className="grow bg-white z-50" placeholder="Buscar productos..."
                        value={localSearch}
                        onChange={handleChange} />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>

            </div>
        </div>
    )
}

export default SearchBar