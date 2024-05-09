//@ts-nocheck
import React, { FC } from 'react'
import { IEmpresa } from '../../../types/Empresa'
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaUserTie } from 'react-icons/fa';
import { ISucursal } from '../../../types/Sucursal';
import { MdEdit } from 'react-icons/md';
import { IoIosBriefcase } from 'react-icons/io';

const CardEmpresa: FC<IEmpresa> = ({ cuil, id, nombre, razonSocial, sucursales }) => {

    const navigate = useNavigate();

    function pushCard(data: ISucursal[]) {
        const idEmpresa = id;
        navigate(`/${idEmpresa}/sucursales`, { state: { data } })
    }

    return (
        <div
            className=" rounded-xl shadow-xl w-full md:h-auto md:w-80 flex flex-col items-center justify-start  cursor-pointer
        active:scale-95 transition-all hover:shadow-2xl m-5 group "
            onClick={() => pushCard(sucursales)}
        >
            <div className="flex justify-between m-4 w-full px-4  text-2xl">
                <MdEdit className=" text-blue-500" />
                <FaTrashAlt className="text-red-600" />
            </div>
            <div className="p-5 flex flex-col items-center justify-start rounded">
                <IoIosBriefcase className="text-red-600 bg-red-200 p-1 rounded-md text-5xl text-center" />
                <h1 className="text-xl font-normal mt-5 mb-3">{nombre}</h1>
                <h1 className="text-xl font-extralight mb-5">{razonSocial}</h1>
            </div>
        </div>
    )
}

export default CardEmpresa