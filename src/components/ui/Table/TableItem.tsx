import React, { FC, useState } from 'react'
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { IItem } from '../../../types/Table/TableItem';
import { fetchData } from '../../api/Fetch';
import Form from '../Form/Form';

const TableItem: FC<IItem> = ({ id, denominacion, param2, param3, param4, endpoint }) => {

    const [data, setData] = useState([]);

    const [open, setOpen] = useState<boolean>(false);

    const fetchIndividual = async () => {
        const response = await fetchData(`http://localhost:8080/${endpoint}/${id}`);
        setData(response);
        setOpen(true);
        console.log(response)
    }

    return (
        <>
            <tr className='hover:bg-gray-200 cursor-pointer'>
                <th className='w-10'>{id}</th>
                <td className='w-72'>{denominacion}</td>
                <td className='w-72'>{param2}</td>
                <td className='w-72'>{param3}</td>
                <td className='w-72'>{param4}</td>
                <td className='w-48 text-2xl '>
                    <button className='hover:text-blue-600 rounded  p-1' onClick={fetchIndividual}><FiEdit2 /></button>
                    <button className='hover:text-red-600 ml-5 p-1'><MdOutlineDelete /></button>
                </td>
            </tr>

            {open && (
                <div className="fixed z-50 inset-0 overflow-y-auto w-full">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 m-14">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  w-full md:w-1/2">
                            <Form data={data} open={open} setOpen={setOpen} />
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default TableItem