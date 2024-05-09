//@ts-nocheck
import React from 'react'
import { FaRegUserCircle } from "react-icons/fa";


const UserSection = () => {
    return (
        <div className='flex justify-center items-center   mx-4'>
            <div className='flex flex-row'>
                <div className='mr-4 rounded-full bg-red-100 p-2'>
                    <img src="/assets/img/man.svg" alt=""
                        className='size-16' />
                </div>
                <div className='font-Roboto mt-2'>
                    <h2 className='text-sm font-bold text-red-600'>Administrador</h2>
                    <h1 className='text-md'>Nombre de usuario</h1>
                </div>
            </div>
        </div>
    )
}

export default UserSection