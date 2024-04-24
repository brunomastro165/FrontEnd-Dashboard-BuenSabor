import React, { FC } from 'react'
import { IEmpresa } from '../../../types/Empresa'

const CardEmpresa: FC<IEmpresa> = ({ cuil, id, nombre, razonSocial, sucursales }) => {
    return (
        <div className='shadow-lg w-full md:w-1/3 p-5 flex flex-col justify-center items-center rounded-lg'>
            <div className='flex flex-row justify-start text-start'>
                <h2>{id}</h2>
                <h1 className='font-Roboto text-xl'>{nombre}</h1>
            </div>

            <div>

            </div>

        </div>
    )
}

export default CardEmpresa