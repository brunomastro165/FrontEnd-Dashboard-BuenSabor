import React, { useEffect, useState } from 'react'
import NavBar from '../../ui/NavBar/NavBar'
import { BackendClient } from '../../../services/BackendClient';
import { IPromos } from '../../../types/Promos';
import CardPromo from '../../ui/Cards/CardPromo';
import CPromos from '../../ui/CointainerCards/CPromos';
import SearchBar from '../../ui/SearchBar/SearchBar';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useParams } from 'react-router-dom';
import { IEmpresa } from '../../../types/Empresa';
import { ISucursal } from '../../../types/Sucursal';
import { setCategoriaSelector } from '../../../redux/slices/mostrarCategoriaSelector';



const Promociones = () => {

    const selector = useAppSelector((state) => state.search.search);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setCategoriaSelector(false))
    }, [])

    return (
        <>
            <NavBar title={`Promociones`} />
            <div className='mt-24'>
                <CPromos />
            </div>
        </>
    )

}

export default Promociones
