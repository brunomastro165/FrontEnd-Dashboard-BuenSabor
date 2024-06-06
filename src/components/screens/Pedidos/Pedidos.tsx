import React from 'react'
import NavBar from '../../ui/NavBar/NavBar'
import ContainerCardPedido from '../../ui/CointainerCards/ContainerCardPedido'

const Pedidos = () => {
    return (
        <>
            <NavBar title='Pedidos' />
            <div className='mt-24'>
                <ContainerCardPedido />
            </div>
        </>
    )
}

export default Pedidos