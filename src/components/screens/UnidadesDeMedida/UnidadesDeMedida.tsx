import React, { useEffect } from 'react'
import NavBar from '../../ui/NavBar/NavBar'
import ContainerUnidadesDeMedida from '../../ui/CointainerCards/ContainerUnidadesDeMedida'
import { useAppDispatch } from '../../../hooks/redux';
import MostrarCategoriaSelector, { setCategoriaSelector } from '../../../redux/slices/mostrarCategoriaSelector';

const UnidadesMedida = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setCategoriaSelector(false))
    }, [])

    return (
        <>
            <NavBar title={`Unidades de medida`} />
            <div className='mt-24'>
                <ContainerUnidadesDeMedida />
            </div>
        </>
    )
}

export default UnidadesMedida