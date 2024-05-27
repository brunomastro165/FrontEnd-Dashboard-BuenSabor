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

const CardPromo: FC<IPromosShort> = ({ denominacion, descripcionDescuento, detalles, fechaDesde, fechaHasta, horaDesde, horaHasta, id, imagenes, precioPromocional, tipoPromocion, eliminado }) => {


    const [vencida, setVencida] = useState<boolean>(false);

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
            console.error(error)
        }

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
                    <MdOutlineModeEdit className='text-3xl transition-all cursor-pointer hover:text-blue-600' />
                    <RiDeleteBinLine className='text-3xl transition-all cursor-pointer hover:text-red-600' onClick={() => deleteLogico()} />
                </h1>
            </div>
        </>
    )
}

export default CardPromo