//@ts-nocheck
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { ISucursal } from '../../../types/Sucursal';
import ContainerCardSucursal from '../../ui/CointainerCards/ContainerCardSucursal';

const Sucursal = () => {

    const location = useLocation();

    const sucursales = location.state.data as ISucursal[];

    return (
        <div className='mt-24'>
            <ContainerCardSucursal
                data={sucursales} />
        </div>
    )
}

export default Sucursal