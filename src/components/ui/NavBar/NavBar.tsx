import React, { FC, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { INavBar } from '../../../types/NavBar';
import { MdFastfood } from "react-icons/md";


const NavBar: FC<INavBar> = ({ title }) => {

    return (
        <div className='w-full items-center flex justify-between bg-white p-4 fixed z-50 shadow-md'>
            <h1 className='font-Roboto text-2xl text-red-600 '>{title}</h1>

            <div className='flex flex-row items-center text-white md:mr-80 bg-red-600 px-4 py-2 rounded-lg '>
                <h1 className='mr-5 text-xl font-Roboto'>El Buen Sas</h1>
                <MdFastfood className='  text-3xl ' />
            </div>
        </div>
    );

}

export default NavBar