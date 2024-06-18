import React from 'react'
import NavBar from '../../ui/NavBar/NavBar'
import ContainerCardsRol from '../../ui/CointainerCards/ContainerCardsRol'

const Usuario = () => {
    return (
        <>
            <NavBar title='Usuarios' />
            <div className='mt-24'>
                <ContainerCardsRol />
            </div>
        </>
    )
}

export default Usuario