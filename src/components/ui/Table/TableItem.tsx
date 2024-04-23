import React, { FC } from 'react'
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { IItem } from '../../../types/Table/TableItem';

const TableItem: FC<IItem> = ({ categoria, descripcion, id, nombre, precio }) => {
    return (
        <tr className='hover:bg-gray-200 cursor-pointer'>
            <th>{id}</th>
            <td>{nombre}</td>
            <td>{descripcion}</td>
            <td>{categoria}</td>
            <td>{precio}</td>
            <td className=' text-2xl '>
                <button className='hover:text-blue-600'><FiEdit2 /></button>
                <button className='hover:text-red-600 ml-5'><MdOutlineDelete /></button>
            </td>
        </tr>
    )
}

export default TableItem