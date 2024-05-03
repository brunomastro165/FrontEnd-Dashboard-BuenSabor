import React, { FC } from 'react'
import { IRol } from '../../../types/Rol'
import { FaBuilding } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";
import { IUsuario } from '../../../types/Usuario';
import { ISucursal } from '../../../types/Sucursal';
import { MdEdit } from "react-icons/md";
import { useAppDispatch } from '../../../hooks/redux';
import { setLogged } from '../../../redux/slices/logged';
import { useParams } from 'react-router-dom';


const CardSucursal: FC<ISucursal> = ({ categorias, domicilio, horarioApertura, horarioCierre, id, nombre, promociones, imagen }) => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { idEmpresa } = useParams();

    console.log("ACÁ TA LA EMPRESA")
    console.log(idEmpresa)

    function pushCard() {
        dispatch(setLogged(true))
        const idSucursales = id;
        const idEmpresa = id;
        navigate(`/${idEmpresa}/sucursales/${idSucursales}/home`)
    }

    return (
        <>
            <div className=' rounded-xl shadow-xl w-full md:h-auto md:w-80 flex flex-col items-center justify-start  cursor-pointer
        active:scale-95 transition-all hover:shadow-2xl m-5 group '
                onClick={() => pushCard()}>
                <div className='flex justify-between m-4 w-full px-4  text-2xl'>
                    <MdEdit className=' text-blue-500' />
                    <FaTrashAlt className='text-red-600' />
                </div>
                <div className='p-5 flex flex-col items-center justify-start rounded'>
                    <FaBuilding className='group-hover:text-red-600 text-gray-600 p-1 transition-all text-5xl text-center' />
                    <h1 className='text-xl font-extralight mt-5 mb-3'>{nombre}</h1>
                </div>

                <img src={imagen} alt="Sucursal" className=' rounded-b' style={{ height: '231.63px', width: '320px' }} />
            </div>
        </>
    )
}

export default CardSucursal