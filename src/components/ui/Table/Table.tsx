import React, { FC, useEffect, useState } from 'react'
import TableItem from './TableItem'
import { ITable } from '../../../types/Table/Table'
import TableItemSkeleton from './TableItemSkeleton'
import { CiSquarePlus } from 'react-icons/ci'
import { fetchData } from '../../api/Fetch'
import Form from '../Form/Form'
import PUTForm from '../Form/PUTForm'
import EmpresaForm from '../Form/EmpresaForm'
import AManufacturadoForm from '../Form/AManufacturadoForm'
import AInsumoForm from '../Form/AInsumoFormt'
import UsuarioForm from '../Form/UsuarioForm'
import SucursalForm from '../Form/SucursalForm'


const Table: FC<ITable> = ({ items, row1, row2, row3, row4, row5, endpoint }) => {


    const [data, setData] = useState([]);

    const [open, setOpen] = useState<boolean>(false);

    const fetchForm = async () => {
        //Fetchea el primer ID del tipo de dato del endpoint
        // const response = await fetchData(`http://localhost:8080/${endpoint}`);
        // setData(response);
        setOpen(true);
        // console.log(response[0])
    }

    return (
        <>
            <div className='w-full  flex justify-end  my-4'>

                <button className='text-2xl font-Roboto btn btn-success bg-white text-green-600 hover:text-white  hover:bg-green-600'
                    onClick={() => { fetchForm() }}>Agregar +</button>
                {/*Este botón debería ir vinculado con el PUT de producto */}
                {/* <button className='text-white text-5xl ml-4 rounded-md bg-green-600  shadow-lg justify-end'>
                        <CiSquarePlus className='hover:-rotate-90 transition-all' />
                    </button> */}
            </div>

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
                        <tbody className=''>
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

            {open && (
                <div className="fixed z-50 inset-0 overflow-y-auto w-full">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 m-14">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  w-full md:w-1/2">
                            {endpoint === "empresas" && <EmpresaForm open={open} setOpen={setOpen} />}
                            {endpoint === "articulosManufacturados" && <AManufacturadoForm open={open} setOpen={setOpen} />}
                            {endpoint === "articulosInsumos" && <AInsumoForm open={open} setOpen={setOpen} />}
                            {endpoint === "usuarios" && <UsuarioForm open={open} setOpen={setOpen} />}
                            {endpoint === "sucursal" && <SucursalForm open={open} setOpen={setOpen} />}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Table