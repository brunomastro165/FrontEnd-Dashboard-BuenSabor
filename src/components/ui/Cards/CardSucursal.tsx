import React, { FC, useEffect, useState } from 'react'
import { IRol } from '../../../types/Rol'
import { FaBuilding } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";
import { IUsuario } from '../../../types/Usuario';
import { ISucursal } from '../../../types/Sucursal';
import { MdEdit } from "react-icons/md";
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setLogged } from '../../../redux/slices/logged';
import { useParams } from 'react-router-dom';
import { ISucursalShort } from '../../../types/ShortDtos/SucursalShort';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { BackendClient } from '../../../services/BackendClient';
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';
import SucursalForm from '../Form/SucursalForm';
import { useAuth0 } from '@auth0/auth0-react';

class GenericBackend extends BackendClient<ISucursalShort> { } //Métodos genéricos 

const CardSucursal: FC<ISucursalShort> = ({ esCasaMatriz, eliminado, horarioApertura, horarioCierre, id, nombre, domicilio, imagenes }) => {

    const CRUD = new GenericBackend();

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { idEmpresa } = useParams();

    const { getAccessTokenSilently } = useAuth0();

    const idEmpresaNumber = Number(idEmpresa);

    const [open, setOpen] = useState<boolean>(false);

    const [initialValues, setInitialValues] = useState<ISucursalShort>({
        id: id,
        nombre: nombre,
        esCasaMatriz: esCasaMatriz,
        horarioApertura: horarioApertura,
        horarioCierre: horarioCierre,
        eliminado: eliminado,
        idEmpresa: idEmpresaNumber,
        domicilio: domicilio,
        imagenes: imagenes,
    });

    useEffect(() => {
        setInitialValues(prevValues => ({
            ...prevValues,
            idEmpresa: idEmpresaNumber // Aquí se actualiza el valor de idEmpresa
        }));
    }, [idEmpresa]); // Se agrega idEmpresa a la lista de dependencias

    function pushCard() {
        dispatch(setLogged(true))
        const idSucursales = id;
        navigate(`/${idEmpresa}/sucursales/${idSucursales}/home`)
    }

    const deleteSucursal = async () => {
        try {
            const res = await CRUD.delete(`${import.meta.env.VITE_LOCAL}sucursal/${id}`, getAccessTokenSilently);
            console.log(res)
        } catch (error) {
            console.error(error)
        }
        dispatch(setGlobalUpdated(true));
        setModalEliminar(false)
    }

    const [modalEliminar, setModalEliminar] = useState<boolean>(false);

    const [modalEditar, setModalEditar] = useState<boolean>(false);

    function confirmarEliminacion() {
        return <>
            <div className='inset-0 fixed z-50 bg-black bg-opacity-35 h-screen w-full flex flex-col justify-center items-center'>
                <div className='bg-white rounded h-auto w-auto'>
                    <div className='p-12  font-Roboto text-2xl text-center flex flex-col  justify-center items-center'>
                        <AiOutlineExclamationCircle className='text-8xl text-red-600 mb-14' />
                        <h1>¿Estás seguro de querer eliminar la sucursal <span className='font-bold text-red-600'>'{nombre}'</span>?</h1>
                        <h2 className='font-Roboto text-base'>Esta acción es <span className='text-red-600'>irreversible</span></h2>
                        <div className='flex flex-row justify-center items-center mt-24 md:space-x-12'>
                            <button className='font-Roboto focus:scale-95 transition-all' onClick={() => setModalEliminar(false)}>Cancelar</button>
                            <button className='text-red-600 p-2 rounded-xl focus:scale-95 transition-all ' onClick={() => deleteSucursal()}>Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }

    function editarSucursal() {
        return <>
            <div className="fixed z-50 inset-0 overflow-y-auto w-full">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 m-14">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  w-full md:w-1/2">
                        <SucursalForm open={open} setOpen={setOpen} data={initialValues} method='PUT' />
                    </div>
                </div>
            </div>
        </>
    }

    const rol = useAppSelector((state) => state.GlobalRol.rol)
    return (
        <>
            <div className=' rounded-xl shadow-xl w-full md:h-auto md:w-80 flex flex-col items-center justify-start  cursor-pointer
        active:scale-95 transition-all hover:shadow-2xl m-5 group '
            >
                <div className='flex justify-between m-4 w-full px-4 py-4 items-center bg-gray-100 rounded-t text-2xl'>

                    <button className='p-2 group' onClick={() => pushCard()}>
                        <h1 className='text-lg'>Ingresar</h1>
                        <div className='w-full bg-gray-500 h-0.5 group-hover:bg-red-600' />
                    </button>
                    {(rol === 'ADMIN' || rol === 'SUPERADMIN') &&
                        <div className='flex'>
                            <MdEdit className=' text-gray-500 hover:text-blue-600 transition-all mx-4 text-2xl' onClick={() => setOpen(true)} />
                            <FaTrashAlt className='text-gray-500 hover:text-red-600 transition-all text-2xl' onClick={() => setModalEliminar(true)} />
                        </div>
                    }
                </div>
                <div className='p-5 flex flex-col items-center justify-start rounded'>
                    <FaBuilding className='group-hover:text-red-600 text-gray-600 p-1 transition-all text-5xl text-center' />
                    <h1 className='text-xl font-extralight mt-5 mb-3'>{nombre}</h1>
                </div>
                {imagenes !== undefined && imagenes.length >= 1 && <figure><img src={imagenes[0].url} style={{ height: '231.63px', width: '320px' }} alt="promo" /></figure>}

            </div>

            {modalEliminar && confirmarEliminacion()}

            {open && editarSucursal()}
        </>
    )
}

export default CardSucursal