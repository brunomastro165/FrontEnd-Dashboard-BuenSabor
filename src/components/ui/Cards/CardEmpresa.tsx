import React, { FC } from 'react'
import { IEmpresa } from '../../../types/Empresa'
import { useNavigate } from 'react-router-dom';
import { FaUserTie } from 'react-icons/fa';

const CardEmpresa: FC<IEmpresa> = ({ cuil, id, nombre, razonSocial, sucursales }) => {

    const navigate = useNavigate();

    function pushCard(data: IEmpresa[]) {
        navigate(`/empresas/${nombre}`, { state: { data } })
    }

    return (
        <div className=' rounded-xl shadow-xl w-full md:w-80 flex flex-col items-center justify-center p-5 cursor-pointer
        active:scale-95 transition-all hover:shadow-2xl m-5'
            onClick={() => pushCard(sucursales)}>
            <FaUserTie className='text-red-600 bg-red-200 p-1 rounded-full text-5xl text-center' />
            <h1 className='text-xl font-Roboto mt-2'>{nombre}</h1>
        </div>
    )
}

export default CardEmpresa