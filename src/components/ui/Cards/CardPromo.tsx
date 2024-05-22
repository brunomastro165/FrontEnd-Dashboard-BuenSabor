//@ts-nocheck
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom';
import { IArticuloManufacturado } from '../../../types/SpecialDtos';
import { IPromos } from '../../../types/Promos';
import { useParams } from 'react-router-dom';

const CardPromo: FC<IPromos> = ({ articulos, denominacion, descripcionDescuento, fechaDesde, fechaHasta, horaDesde, horaHasta, id, imagenes, precioPromocional, tipoPromocion }) => {

    const navigate = useNavigate();

    const { idEmpresa, idSucursales } = useParams();

    function pushCard(data: IArticuloManufacturado[]) {
        if (data.length >= 1) {
            navigate(`/${idEmpresa}/sucursales/${idSucursales}/promociones/${id}`, { state: { data } })
        }
    }

    return (
        <>

            <div className="card size-96  bg-base-100 shadow-xl hover:scale-105 transition-transform">

                {imagenes !== undefined && imagenes.length >= 1 && <figure><img src={imagenes[0].url} alt="promo" /></figure>}

                <div className="card-body">
                    <h2 className="card-title">{denominacion}</h2>
                    <p className='font-roboto'>{descripcionDescuento}</p>
                    <p className='text-md font-Roboto'>Vence el: {fechaHasta} a las {horaHasta}</p>
                    <div className="card-actions justify-center mt-4">
                        <button className="btn btn-outline text-red-600 hover:bg-red-600 hover:border-none" onClick={() => pushCard(articulos)} >Ver productos</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardPromo