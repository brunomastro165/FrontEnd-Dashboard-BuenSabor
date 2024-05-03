import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom';
import { IArticuloManufacturado } from '../../../types/ArticuloManufacturado';
import { IPromos } from '../../../types/Promos';

const CardPromo: FC<IPromos> = ({ articulosManufacturados, denominacion, descripcionDescuento, fechaDesde, fechaHasta, horaDesde, horaHasta, id, imagen, precioPromocional, tipoPromocion }) => {

    const navigate = useNavigate();

    function pushCard(data: IArticuloManufacturado[]) {
        console.log(data)
        if (data.length >= 1) {
            navigate(`/promociones/${id}`, { state: { data } })
        }
    }

    return (
        <>

            <div className="card size-96  bg-base-100 shadow-xl hover:scale-105 transition-transform">
                <figure><img src={imagen.url} alt="promo" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{denominacion}</h2>
                    <p className='font-roboto'>{descripcionDescuento}</p>
                    <p className='text-md font-Roboto'>Vence el: {fechaHasta} a las {horaHasta}</p>
                    <div className="card-actions justify-center mt-4">
                        <button className="btn btn-outline text-red-600 hover:bg-red-600 hover:border-none" onClick={() => pushCard(articulosManufacturados)} >Ver productos</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardPromo