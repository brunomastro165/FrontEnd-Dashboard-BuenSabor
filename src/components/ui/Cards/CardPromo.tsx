import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IPromos } from '../../../types/Promos';
import { useParams } from 'react-router-dom';
import { IPromosShort } from '../../../types/ShortDtos/PromoShort';
import { MdOutlineModeEdit } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BackendMethods } from '../../../services/BackendClient';
import { useAppDispatch } from '../../../hooks/redux';
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';
import { setGlobalInitialValues } from '../../../redux/slices/globalInitialValues';
import PromoForm from '../Form/PromoForm';
import { ISucursal } from '../../../types/Sucursal';

const CardPromo: FC<IPromos> = ({ denominacion, descripcionDescuento, detalles, fechaDesde, fechaHasta, horaDesde, horaHasta, id, imagenes, precioPromocional, tipoPromocion, eliminado, sucursales }) => {



    console.log("ayuda")
    console.log(detalles);

    const [vencida, setVencida] = useState<boolean>(false);

    const [editar, setEditar] = useState<boolean>(false);

    const [idSucursales, setIdSucursales] = useState<number[]>([]);


    useEffect(() => {
        async function extraerIdSucursal() {
            const id = sucursales.map((sucursal: ISucursal) => sucursal.id)
            setIdSucursales(id)
        }
        extraerIdSucursal()
    }, [])


    console.log("id sucursas")
    console.log(idSucursales)
    useEffect(() => {
        const fechaActual = new Date();

        const fechaCaducidad = new Date(fechaHasta)

        if (fechaActual.getTime() <= fechaCaducidad.getTime()) {
            setVencida(false)
        }
        else {
            setVencida(true)
        }

    }, [])


    const backend = new BackendMethods()

    const dispatch = useAppDispatch()

    const deleteLogico = async () => {

        try {
            dispatch(setGlobalUpdated(true))
            const res = await backend.delete(`${import.meta.env.VITE_LOCAL}promocion/${id}`)
            dispatch(setGlobalUpdated(true))
            console.log(res)
        } catch (error) {
            dispatch(setGlobalUpdated(true))
            console.error(error)
        }

    }


    function editarPromocion() {
        return <>
            <div className="fixed z-50 inset-0 overflow-y-auto w-full">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 m-14">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  w-full md:w-1/2">
                        <PromoForm method='PUT' open={editar} setOpen={setEditar} key={1} />
                    </div>
                </div>
            </div>
        </>
    }

    function promoActiva() {
        if (!vencida) {
            return (
                <h3 className='bg-green-600 w-max p-2 rounded-xl text-white font-bold'>ACTIVA</h3>
            )
        }
        else {
            return (
                <h3 className='bg-red-600 w-max p-2 rounded-xl text-white font-bold'>VENCIÓ</h3>
            )
        }
    }


    const put = async () => {
        try {

            dispatch(setGlobalInitialValues(
                {
                    id: id,
                    denominacion: denominacion,
                    eliminado: eliminado,
                    fechaDesde: fechaDesde,
                    fechaHasta: fechaHasta,
                    horaDesde: horaDesde,
                    horaHasta: horaHasta,
                    precioPromocional: precioPromocional,
                    detalles: detalles,
                    tipoPromocion: tipoPromocion,
                    idSucursales: idSucursales,

                }
            ))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>

            <div className="card size-96  bg-base-100 shadow-xl transition-transform m-5 z-0">

                <figure>
                    {imagenes !== undefined && imagenes.length >= 1 && <figure><img src={imagenes[0].url} alt="promo" /></figure>}
                </figure>

                <div className="p-5">
                    {promoActiva()}
                    <h2 className="card-title my-1">{denominacion}</h2>
                    <p className='font-roboto'>{descripcionDescuento}</p>

                    <div className='flex flex-col w-full justify-between items-start '>
                        <p className='font-roboto '>${precioPromocional}</p>
                        <p className='text-base font-Roboto'>{vencida ? 'Venció' : 'Vence'} el: {fechaHasta} a las {horaHasta}</p>
                    </div>
                </div>

                <h1 className='flex justify-end items-end p-3 md:space-x-5'>
                    <MdOutlineModeEdit className='text-3xl transition-all cursor-pointer hover:text-blue-600' onClick={() => { put(), setEditar(true) }} />
                    <RiDeleteBinLine className='text-3xl transition-all cursor-pointer hover:text-red-600' onClick={() => deleteLogico()} />
                </h1>
            </div>

            {editar && editarPromocion()}
        </>
    )
}

export default CardPromo