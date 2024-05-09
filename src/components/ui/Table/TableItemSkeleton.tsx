//@ts-nocheck
import React from 'react'
import { FiEdit2 } from 'react-icons/fi'
import { MdOutlineDelete } from 'react-icons/md'

const TableItemSkeleton = () => {
  return (
    <tr className='hover cursor-pointer animate-pulse border-red-600'>
      <th></th>
      <td>Cargando...</td>
      <td>Cargando...</td>
      <td>Cargando...</td>
      <td>Cargando...</td>
      <td className=' text-2xl '>
        <button className='hover:text-blue-600'><FiEdit2 /></button>
        <button className='hover:text-red-600 ml-5'><MdOutlineDelete /></button>
      </td>
    </tr>
  )
}

export default TableItemSkeleton