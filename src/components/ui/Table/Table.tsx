import React from 'react'
import TableItem from './TableItem'

const Table = () => {
    return (
        <div className='w-full'>
            <div className="overflow-x-auto flex rounded-md border h-auto">
                <table className="table-sm md:table table-zebra">
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
                        <TableItem />
                        <TableItem />
                        <TableItem />
                        <TableItem />
                        <TableItem />
                        <TableItem />
                        <TableItem />
                        <TableItem />
                        <TableItem />
                        <TableItem />
                        <TableItem />
                        <TableItem />

                        <TableItem />
                        <TableItem />
                        <TableItem />
                        <TableItem />
                        <TableItem />
                        <TableItem />

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table