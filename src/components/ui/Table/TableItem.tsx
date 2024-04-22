import React from 'react'
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";

const TableItem = () => {
    return (
        <tr className='hover cursor-pointer'>
            <th>1</th>
            <td>Cy Ganderton Cy Ganderton Cy Ganderton</td>
            <td>Quality Control Specialist Quality Control Specialist Quality Control Specialist Quality Control Specialist Quality Control Specialist Quality Control Specialist Quality Control Specialist Quality Control Specialist Quality Control Specialist Quality Control Specialist</td>
            <td>Categoría</td>
            <td>$109090</td>
            <td className=' text-2xl '>
                <button className='hover:text-blue-600'><FiEdit2 /></button>
                <button className='hover:text-red-600 ml-5'><MdOutlineDelete /></button>
            </td>
        </tr>
    )
}

export default TableItem