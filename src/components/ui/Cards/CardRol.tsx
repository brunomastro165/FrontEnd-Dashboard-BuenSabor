//@ts-nocheck
import React, { FC } from 'react'
import { IRol } from '../../../types/Rol'
import { FaUserTie } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { IUsuario } from '../../../types/Usuario';
import { useParams } from 'react-router-dom';

const CardRol: FC<IRol> = ({ denominacion, id, usuarios }) => {

    const navigate = useNavigate();

    const { idEmpresa, idSucursales } = useParams();

    function pushCard(data: IUsuario[]) {
        if (usuarios.length >= 1) {
            navigate(`/${idEmpresa}/sucursales/${idSucursales}/usuarios/${id}`, { state: { data } })
        }
    }

    return (
        <>
            <div className=' rounded-xl shadow-xl w-full md:w-80 flex flex-col items-center justify-center p-5 cursor-pointer
        active:scale-95 transition-all hover:shadow-2xl m-5'
                onClick={() => pushCard(usuarios)}>
                <FaUserTie className='text-red-600 bg-red-200 p-1 rounded-full text-5xl text-center' />
                <h1 className='text-xl font-Roboto mt-2'>{denominacion}</h1>
            </div>
        </>
    )
}

export default CardRol