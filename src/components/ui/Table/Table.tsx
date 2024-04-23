import React, { FC, useEffect } from 'react'
import TableItem from './TableItem'
import { ITable } from '../../../types/Table/Table'
import TableItemSkeleton from './TableItemSkeleton'


const Table: FC<ITable> = ({ items }) => {

    useEffect(() => {
        console.log(items)
    }, [items])

    return (
        <div className='w-full'>
            <div className="overflow-x-auto flex rounded-md border h-auto">
                <table className="table-sm md:table ">
                    {/* head */}
                    <thead className=''>
                        <tr className='text-lg'>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.length > 0 ?
                                (items.map((item) =>
                                (<TableItem
                                    categoria={item.categoria}
                                    descripcion={item.descripcion}
                                    id={item.id}
                                    nombre={item.nombre}
                                    precio={item.precio}
                                    key={item.id}
                                />))

                                ) : (
                                    <TableItemSkeleton />
                                )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table