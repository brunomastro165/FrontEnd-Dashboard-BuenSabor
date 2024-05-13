import React, { FC, useState } from 'react'
import { IContainerCards } from '../../../types/ContainerCards/ContainerCards'
import CardEmpresa from '../Cards/CardEmpresa'
import EmpresaForm from '../Form/EmpresaForm';
import RolForm from '../Form/RolForm';
import { useNavigate } from 'react-router-dom';
import CardSucursal from '../Cards/CardSucursal';
import { ISucursal } from '../../../types/Sucursal';
import SucursalForm from '../Form/SucursalForm';
import { MdEdit } from 'react-icons/md';
import { FaBuilding, FaTrashAlt } from 'react-icons/fa';

interface IContainerCardSucursal {
    data: ISucursal[]
}

const ContainerCardSucursal: FC<IContainerCardSucursal> = ({ data }) => {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <div className='m-5 flex items-center justify-center  h-screen p-2'>
                <div className='flex mb-24 flex-wrap items-center w-full justify-center'>

                    {data.length >= 1 &&
                        data.map((sucursal, index) => (
                            <CardSucursal
                                categorias={sucursal.categorias}
                                domicilio={sucursal.domicilio}
                                horarioApertura={sucursal.horarioApertura}
                                horarioCierre={sucursal.horarioCierre}
                                id={sucursal.id}
                                nombre={sucursal.nombre}
                                promociones={sucursal.promociones}
                                imagen={sucursal.imagen}
                                key={sucursal.id}
                            />
                        ))
                    }

                    <>
                        <div className=' rounded-xl shadow-xl w-full h-96 md:w-80 flex flex-col items-center justify-center  cursor-pointer
        active:scale-95 transition-all hover:shadow-2xl m-5 group border border-dashed hover:border-red-600 border-gray-600 border-2 group'
                            onClick={() => setOpen(true)}
                        >
                            <h1 className='font-Roboto text-gray-600 group-hover:text-red-600 text-2xl'>Agregar sucursal</h1>
                            <h2 className='text-6xl text-gray-600 group-hover:text-red-600'>+</h2>

                        </div>
                    </>

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
                            <SucursalForm open={open} setOpen={setOpen} />
                        </div>
                    </div>
                </div>

            )}
        </>
    )
}

export default ContainerCardSucursal