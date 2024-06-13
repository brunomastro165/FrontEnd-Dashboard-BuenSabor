import React from 'react'
import NavBar from '../../ui/NavBar/NavBar'
import ContainerCardPedido from '../../ui/CointainerCards/ContainerCardPedido'
import ContainerDelivery from '../../ui/CointainerCards/ContainerDelivery'

const Delivery = () => {
    return (
        <>
            <NavBar title='Pedidos' />
            <div className='mt-24'>
                <ContainerDelivery />
            </div>
        </>
    )
}

export default Delivery