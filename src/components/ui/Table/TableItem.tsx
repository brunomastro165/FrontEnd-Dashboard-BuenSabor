import React, { FC, useState } from 'react'
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { IItem } from '../../../types/Table/TableItem';
import { fetchData } from '../../api/Fetch';
import Form from '../Form/Form';
import EmpresaForm from '../Form/EmpresaForm';
import AManufacturadoForm from '../Form/AManufacturadoForm';
import AInsumoForm from '../Form/AInsumoFormt';
import UsuarioForm from '../Form/UsuarioForm';
import SucursalForm from '../Form/SucursalForm';
import { useAppDispatch } from '../../../hooks/redux';
import { setGlobalInitialValues } from '../../../redux/slices/globalInitialValues';
import { BackendClient } from '../../../services/BackendClient';
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';
import { IArticuloManufacturado } from '../../../types/ArticuloManufacturado';

import { IArticuloInsumo } from '../../../types/ArticuloInsumo';


//@ts-ignore
class GenericBackend extends BackendClient<T> { } //Métodos genéricos 

const TableItem: FC<IItem> = ({ id, denominacion, param2, param3, param4, endpoint }) => {

    const CRUD = new GenericBackend();

    const [data, setData] = useState([]);

    const [open, setOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const fetchIndividual = async () => {
        const response: any = await fetchData(`http://localhost:8081/${endpoint}/${id}`)
        dispatch(setGlobalInitialValues(response))
        setOpen(true);
    }

    const deleteLogico = async () => {
        try {
            const response = await CRUD.delete(`http://localhost:8081/${endpoint}/${id}`)
            dispatch(setGlobalUpdated(true))
        } catch (error) {
            dispatch(setGlobalUpdated(true))
        }
    }

    return (
        <>
            <tr className='hover:bg-gray-200 cursor-pointer border-none'>
                <th className='w-10'>{id}</th>
                <td className='w-72'>{denominacion}</td>
                <td className='w-72'>{param2}</td>
                <td className='w-72'>{param3}</td>
                <td className='w-72'>{param4}</td>
                <td className='w-48 text-2xl items-center '>
                    <button className='hover:text-blue-600 rounded  p-1' onClick={fetchIndividual}><FiEdit2 /></button>
                    <button className='hover:text-red-600 ml-5 p-1' onClick={deleteLogico}><MdOutlineDelete /></button>
                </td>
            </tr>

            {open && (
                <div className="fixed z-50 inset-0 overflow-y-auto w-full ">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 m-14">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  w-full md:w-1/2">
                            {/* {endpoint === "empresas" && <EmpresaForm open={open} setOpen={setOpen} />} */}
                            {endpoint === "ArticuloManufacturado" && <AManufacturadoForm open={open} setOpen={setOpen} method='PUT' />}
                            {endpoint === "ArticuloInsumo" && <AInsumoForm open={open} setOpen={setOpen} method='PUT' />}
                            {endpoint === "usuarios" && <UsuarioForm open={open} setOpen={setOpen} />}
                            {/* {endpoint === "sucursal" && <SucursalForm open={open} setOpen={setOpen} />} */}
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default TableItem