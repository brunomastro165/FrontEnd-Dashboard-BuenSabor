import React, { FC, useState } from 'react'
import { RiWeightLine } from "react-icons/ri";
import { RiDeleteBinLine } from "react-icons/ri";
import { useAppDispatch } from '../../../hooks/redux';
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';
import { BackendMethods } from '../../../services/BackendClient';
import { MdOutlineModeEdit } from "react-icons/md";
import { setGlobalInitialValues } from '../../../redux/slices/globalInitialValues';
import UnidadMedidaForm from '../Form/UnidadMedidaForm';
import { useAuth0 } from '@auth0/auth0-react';


interface ICardUnidad {
    id: number,
    denominacion: string,
}

const CardUnidadMedida: FC<ICardUnidad> = ({ denominacion, id }) => {

    const backend = new BackendMethods();

    const dispatch = useAppDispatch();

    const { getAccessTokenSilently } = useAuth0();

    const [edit, setEdit] = useState<boolean>(false);

    const deleteLogico = async (id: number) => {
        dispatch(setGlobalUpdated(true))
        try {
            const res = await backend.delete(`${import.meta.env.VITE_LOCAL}UnidadMedida/${id}`, getAccessTokenSilently)
        } catch (error) {
            console.error(error)
        }

        dispatch(setGlobalUpdated(true))
    }

    const editar = () => {
        dispatch(setGlobalInitialValues({ denominacion: denominacion, id: id }))
        setEdit(true)
    }

    return (
        <>
            <div className="card w-96 bg-base-100 shadow-xl m-5 group">
                <h1 className='flex justify-end items-end p-5 md:space-x-5'>
                    <MdOutlineModeEdit className='text-3xl transition-all cursor-pointer hover:text-blue-600' onClick={() => editar()} />
                    <RiDeleteBinLine className='text-3xl transition-all cursor-pointer hover:text-red-600' onClick={() => deleteLogico(id)} />
                </h1>
                <div className="card-body flex justify-center items-center">
                    <h1 className='font-Roboto '>Denominación:</h1>
                    <h2 className="card-title font-Roboto  transition-all bg-blue-600 p-2 rounded-xl text-white">{denominacion}</h2>
                </div>
                {/* <figure><RiWeightLine /></figure> */}
            </div>


            {edit &&
                <div className="fixed z-50 inset-0 overflow-y-auto w-full">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 m-14">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  w-full md:w-1/2">
                            <UnidadMedidaForm method='PUT' open={edit} setOpen={setEdit} key={1} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default CardUnidadMedida