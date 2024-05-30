//@ts-nocheck
import React, { FC, useState } from 'react'
import { IEmpresa } from '../../../types/Empresa'
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaUserTie } from 'react-icons/fa';
import { ISucursal } from '../../../types/Sucursal';
import { MdEdit } from 'react-icons/md';
import { IoIosBriefcase } from 'react-icons/io';
import { BackendClient } from '../../../services/BackendClient';
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';
import { useAppDispatch } from '../../../hooks/redux';
import EmpresaForm from '../Form/EmpresaForm';

class GenericBackend extends BackendClient<IEmpresa> { } //Métodos genéricos 

const CardEmpresa: FC<IEmpresa> = ({ cuil, id, nombre, razonSocial, sucursales, imagenes }) => {

    const backend = new GenericBackend(); //Objeto de BackendClient

    const dispatch = useAppDispatch();

    const [open, setOpen] = useState<boolean>(false);

    //Para poder pasarlo mas estructuradamente al editar
    const [data, setData] = useState<IEmpresa>({
        cuil,
        id,
        nombre,
        razonSocial,
        sucursales,
    });

    const [modalEliminar, setModalEliminar] = useState<boolean>(false);

    const [modalEditar, setModalEditar] = useState<boolean>(false);

    const deleteEmpresa = async () => {
        try {
            const res: IEmpresaShort = await backend.delete(`${import.meta.env.VITE_LOCAL}/empresa/${id}`);
            console.log(res)
        } catch (error) {
            console.error(error)
        }
        dispatch(setGlobalUpdated(true));
        setModalEliminar(false)
    }

    const navigate = useNavigate();

    function pushCard(nombre: string) {
        const idEmpresa = id;
        navigate(`/${idEmpresa}/sucursales`, { state: { nombre } })
    }

    console.log(imagenes)
    function confirmarEliminacion() {
        return <>
            <div className='inset-0 fixed z-50 bg-black bg-opacity-35 h-screen w-full flex flex-col justify-center items-center'>
                <div className='bg-white rounded h-auto w-auto'>
                    <div className='p-12  font-Roboto text-2xl text-center flex flex-col  justify-center items-center'>
                        <AiOutlineExclamationCircle className='text-8xl text-red-600 mb-14' />
                        <h1>¿Estás seguro de querer eliminar la empresa <span className='font-bold text-red-600'>'{nombre}'</span>?</h1>
                        <h2 className='font-Roboto text-base'>Esta acción es <span className='text-red-600'>irreversible</span></h2>
                        <div className='flex flex-row justify-center items-center mt-24 md:space-x-12'>
                            <button className='font-Roboto focus:scale-95 transition-all' onClick={() => setModalEliminar(false)}>Cancelar</button>
                            <button className='text-red-600 p-2 rounded-xl focus:scale-95 transition-all ' onClick={() => deleteEmpresa()}>Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }

    function editarEmpresa() {
        return <>
            <div className="fixed z-50 inset-0 overflow-y-auto w-full">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 m-14">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  w-full md:w-1/2">
                        <EmpresaForm open={open} setOpen={setOpen} data={data} method='PUT' />
                    </div>
                </div>
            </div>
        </>
    }

    return (
        <>
            <div
                className=" rounded-xl shadow-xl w-full md:h-auto md:w-80 flex flex-col items-center justify-start  cursor-pointer
        active:scale-95 transition-all hover:shadow-2xl m-5 group "

            >
                <div className="flex justify-end m-4 w-full px-4  text-2xl">
                    <MdEdit className=" text-blue-500 mx-3" onClick={() => { setModalEditar(true), setOpen(true) }} />
                    <FaTrashAlt className="text-red-600 hover:scale-110 transition-all duration-100" onClick={() => setModalEliminar(true)} />
                </div>
                <div className="p-5 flex flex-col items-center justify-start rounded">
                    <h1 className="text-xl font-normal mt-5 mb-3">{nombre}</h1>
                    <h1 className="text-xl font-extralight mb-5">{razonSocial}</h1>
                    <h1 className='font-Roboto text-lg px-2 bg- rounded text-red-600 hover:text-white hover:bg-red-600 transition-all hover:scale-105'
                        onClick={() => pushCard(nombre)}>
                        Ingresar
                    </h1>
                </div>
                <figure className='w-full '>
                    {imagenes !== undefined && imagenes.length >= 1 && <figure><img src={imagenes[0].url} className='w-full ' alt="imagenEmpresa" style={{ height: '231.63px', width: '320px' }}/></figure>}
                </figure>
            </div>

            {modalEliminar && (confirmarEliminacion())}

            {modalEditar && open && (editarEmpresa())}

        </>
    )
}

export default CardEmpresa