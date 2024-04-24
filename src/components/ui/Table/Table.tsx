import React, { FC, useEffect } from 'react'
import TableItem from './TableItem'
import { ITable } from '../../../types/Table/Table'
import TableItemSkeleton from './TableItemSkeleton'


const Table: FC<ITable> = ({ items, row1, row2, row3, row4, row5, endpoint }) => {

    return (
        <div className='w-full'>
            <div className="overflow-x-auto flex rounded-md border h-auto">
                <table className="table-sm md:table ">
                    {/* head */}
                    <thead className=''>
                        <tr className='text-lg'>
                            <th>{row1}</th>
                            <th>{row2}</th>
                            <th>{row3}</th>
                            <th>{row4}</th>
                            <th>{row5}</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.length > 0 ?
                                (items.map((item) =>
                                (<TableItem
                                    id={item.id}
                                    denominacion={item.denominacion}
                                    param2={item.param2}
                                    param3={item.param3}
                                    param4={item.param4}
                                    endpoint={endpoint}
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