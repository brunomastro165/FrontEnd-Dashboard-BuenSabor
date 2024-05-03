import React, { FC, useState } from 'react'
import { IContainerCards } from '../../../types/ContainerCards/ContainerCards'
import CardEmpresa from '../Cards/CardEmpresa'
import EmpresaForm from '../Form/EmpresaForm';
import RolForm from '../Form/RolForm';
import { useNavigate } from 'react-router-dom';
import CardSucursal from '../Cards/CardSucursal';
import { ISucursal } from '../../../types/Sucursal';
import SucursalForm from '../Form/SucursalForm';

interface IContainerCardSucursal {
    data: ISucursal[]
}

const ContainerCardSucursal: FC<IContainerCardSucursal> = ({ data }) => {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <div className='w-full flex justify-center items-center'>
                <button className='text-2xl font-Roboto btn btn-success bg-white text-green-600 hover:text-white  hover:bg-green-600'
                    onClick={() => setOpen(true)}>Agregar sucursal +</button>
            </div>

            <div className='m-5 flex items-center justify-center  h-screen p-2'>
                <div className='flex mb-24 flex-wrap items-center w-full justify-around'>
                    {data.map((sucursal, index) => (

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
                    ))}
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