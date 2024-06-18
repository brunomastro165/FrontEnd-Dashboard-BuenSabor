import React, { FC, useEffect, useState } from 'react'
import { IPedido } from '../../../types/Pedido'
import { BackendMethods } from '../../../services/BackendClient'
import CardPedido from '../Cards/CardPedido';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import { IEmpleado } from '../../../types/Empleado';

const ContainerDelivery = () => {

    const { idSucursales } = useParams();

    const backend = new BackendMethods();

    const { getAccessTokenSilently } = useAuth0();

    const empleado = useAppSelector((state) => state.GlobalEmpleado.empleado)

    const [pedidos, setPedidos] = useState<IPedido[]>([]);

    const dispatch = useAppDispatch();

    const updated = useAppSelector((state) => state.GlobalUpdated.updated)

    const [estadoActual, setEstadoActual] = useState<string>();

    const today = new Date();

    const prevDay = new Date();
    prevDay.setDate(today.getDate() - 20)
    const prevDayString = prevDay.toISOString().split('T')[0]

    const nextDay = new Date();
    nextDay.setDate(today.getDate() + 1);
    const nextDayString = nextDay.toISOString().split('T')[0];

    useEffect(() => {
        const traerPedidos = async () => {
            const res: IEmpleado = await backend.getById(`http://localhost:8080/empleado/${empleado.id}`, getAccessTokenSilently) as IEmpleado;
            console.log(res);
            //@ts-ignore
            setPedidos(res.pedidos);
        }
        traerPedidos();
        dispatch(setGlobalUpdated(false))
    }, [updated])

    const estados = ["PENDIENTE", "ENVIANDO", "ENTREGADO", "CANCELADO"];

    const estadoColores: { [key: string]: string } = {
        PENDIENTE: "bg-gray-500",
        PREPARACION: "bg-blue-500",
        ENVIANDO: "bg-blue-500",
        ENTREGADO: "bg-green-500",
        CANCELADO: "bg-red-500",
        RECHAZADO: "bg-red-500",
    };

    const pedidosPorEstado: { [key: string]: IPedido[] } = pedidos.reduce((acc, pedido) => {
        if (!acc[pedido.estado]) {
            acc[pedido.estado] = [];
        }
        acc[pedido.estado].push(pedido);
        return acc;
    }, {} as { [key: string]: IPedido[] });

    return (
        <div className='flex flex-row w-full justify-start items-start  overflow-x-auto'>

            <div className='flex flex-row'>
                {estados.map((estado) => (
                    <div className='flex flex-col w-full  justify-start items-start text-xl' key={estado}>
                        <h1 className={`p-2 ${estadoColores[estado]} rounded-md text-white mx-2 font-Roboto mb-5`}>{estado}</h1>
                        {pedidosPorEstado[estado] && pedidosPorEstado[estado]
                            .filter((pedido) => !pedido.eliminado)
                            .map((pedido) => (
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
                ))}
            </div>
        </div>
    )
}

export default ContainerDelivery