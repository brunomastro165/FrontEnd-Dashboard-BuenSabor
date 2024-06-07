import React, { FC, useEffect, useState } from 'react'
import { IPedido } from '../../../types/Pedido'
import { BackendMethods } from '../../../services/BackendClient'
import CardPedido from '../Cards/CardPedido';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';

const ContainerCardPedido = () => {

    const backend = new BackendMethods();

    const [pedidos, setPedidos] = useState<IPedido[]>([]);

    const dispatch = useAppDispatch();

    const updated = useAppSelector((state) => state.GlobalUpdated.updated)

    const [estadoActual, setEstadoActual] = useState<string>();

    useEffect(() => {
        const traerPedidos = async () => {
            const res: IPedido[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}pedido`) as IPedido[];
            console.log(res);
            setPedidos(res);
        }
        traerPedidos();
        dispatch(setGlobalUpdated(false))
    }, [updated])


    console.log(pedidos)

    return (
        <div className='flex flex-row w-full justify-around items-start overflow-x-auto'>

            <div className='flex flex-col justify-start items-start text-xl'>
                <h1 className='p-2 bg-gray-500 rounded-md text-white font-Roboto mb-5'>Pedidos pendientes</h1>
                {pedidos.filter((pedido) => pedido.estado === "PENDIENTE")
                    .map((pedido, index) => (
                        <CardPedido
                            cliente={pedido.cliente}
                            eliminado={pedido.eliminado}
                            estado={pedido.estado}
                            id={pedido.id}
                            fechaPedido={pedido.fechaPedido}
                            formaPago={pedido.formaPago}
                            tipoEnvio={pedido.tipoEnvio}
                            domicilio={pedido.domicilio}
                            empleado={pedido.empleado}
                            factura={pedido.factura}
                            sucursal={pedido.sucursal}
                            total={pedido.total}
                            detallesPedido={pedido.detallesPedido}
                            horaEstimadaFinalizacion={pedido.horaEstimadaFinalizacion}
                            key={pedido.id}
                        />
                    ))}
            </div>

            <div className='flex flex-col justify-start items-start text-xl'>
                <h1 className='p-2 bg-blue-500 rounded-md text-white font-Roboto mb-5'>Pedidos en preparación</h1>
                {pedidos.filter((pedido) => pedido.estado === "PREPARACION")
                    .map((pedido, index) => (
                        <CardPedido
                            cliente={pedido.cliente}
                            eliminado={pedido.eliminado}
                            estado={pedido.estado}
                            id={pedido.id}
                            fechaPedido={pedido.fechaPedido}
                            formaPago={pedido.formaPago}
                            tipoEnvio={pedido.tipoEnvio}
                            domicilio={pedido.domicilio}
                            empleado={pedido.empleado}
                            factura={pedido.factura}
                            sucursal={pedido.sucursal}
                            total={pedido.total}
                            detallesPedido={pedido.detallesPedido}
                            horaEstimadaFinalizacion={pedido.horaEstimadaFinalizacion}
                            key={pedido.id}
                        />
                    ))}
            </div>

            <div className='flex flex-col justify-start items-start text-xl'>
                <h1 className='p-2 bg-green-500 rounded-md text-white font-Roboto  mb-5'>Pedidos entregados</h1>
                {pedidos.filter((pedido) => pedido.estado === "ENTREGADO")
                    .map((pedido, index) => (
                        <CardPedido
                            cliente={pedido.cliente}
                            eliminado={pedido.eliminado}
                            estado={pedido.estado}
                            id={pedido.id}
                            fechaPedido={pedido.fechaPedido}
                            formaPago={pedido.formaPago}
                            tipoEnvio={pedido.tipoEnvio}
                            domicilio={pedido.domicilio}
                            empleado={pedido.empleado}
                            factura={pedido.factura}
                            sucursal={pedido.sucursal}
                            total={pedido.total}
                            detallesPedido={pedido.detallesPedido}
                            horaEstimadaFinalizacion={pedido.horaEstimadaFinalizacion}
                            key={pedido.id}
                        />
                    ))}
            </div>


            <div className='flex flex-col justify-start items-start text-xl'>
                <h1 className='p-2 bg-red-500 rounded-md text-white font-Roboto  mb-5'>Pedidos cancelados</h1>
                {pedidos.filter((pedido) => pedido.estado === "CANCELADO")
                    .map((pedido, index) => (
                        <CardPedido
                            cliente={pedido.cliente}
                            eliminado={pedido.eliminado}
                            estado={pedido.estado}
                            id={pedido.id}
                            fechaPedido={pedido.fechaPedido}
                            formaPago={pedido.formaPago}
                            tipoEnvio={pedido.tipoEnvio}
                            domicilio={pedido.domicilio}
                            empleado={pedido.empleado}
                            factura={pedido.factura}
                            sucursal={pedido.sucursal}
                            total={pedido.total}
                            detallesPedido={pedido.detallesPedido}
                            horaEstimadaFinalizacion={pedido.horaEstimadaFinalizacion}
                            key={pedido.id}
                        />
                    ))}
            </div>


            <div className='flex flex-col justify-start items-start text-xl'>
                <h1 className='p-2 bg-red-500 rounded-md text-white font-Roboto  mb-5'>Pedidos rechazados</h1>
                {pedidos.filter((pedido) => pedido.estado === "RECHAZADO")
                    .map((pedido, index) => (
                        <CardPedido
                            cliente={pedido.cliente}
                            eliminado={pedido.eliminado}
                            estado={pedido.estado}
                            id={pedido.id}
                            fechaPedido={pedido.fechaPedido}
                            formaPago={pedido.formaPago}
                            tipoEnvio={pedido.tipoEnvio}
                            domicilio={pedido.domicilio}
                            empleado={pedido.empleado}
                            factura={pedido.factura}
                            sucursal={pedido.sucursal}
                            total={pedido.total}
                            detallesPedido={pedido.detallesPedido}
                            horaEstimadaFinalizacion={pedido.horaEstimadaFinalizacion}
                            key={index}
                        />
                    ))}
            </div>


        </div>
    )
}

export default ContainerCardPedido