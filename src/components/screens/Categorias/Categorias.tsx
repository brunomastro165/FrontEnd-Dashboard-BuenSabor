import React from 'react'
import NavBar from '../../ui/NavBar/NavBar'
import ContainerCategorias from '../../ui/TableCategorias/ContainerCategorias'

const Categorias = () => {
    return (
        <>
            <NavBar title='Categorias' />
            <div className='mt-24'>
                <ContainerCategorias />
            </div>
        </>
    )
}

export default Categorias