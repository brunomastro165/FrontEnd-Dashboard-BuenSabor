import React, { FC, useEffect, useState } from 'react'
import { IPedido } from '../../../types/Pedido'
import { BackendMethods } from '../../../services/BackendClient'
import CardPedido from '../Cards/CardPedido';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';

const ContainerCardPedido = () => {

    const { idSucursales } = useParams();

    const backend = new BackendMethods();

    const { getAccessTokenSilently } = useAuth0();

    const [pedidos, setPedidos] = useState<IPedido[]>([]);

    const dispatch = useAppDispatch();

    const updated = useAppSelector((state) => state.GlobalUpdated.updated)

    const [estadoActual, setEstadoActual] = useState<string>();

    const today = new Date();

    const prevDay = new Date();
    prevDay.setDate(today.getDate() - 1)
    const prevDayString = prevDay.toISOString().split('T')[0]

    const nextDay = new Date();
    nextDay.setDate(today.getDate() + 1);
    const nextDayString = nextDay.toISOString().split('T')[0];

    const [inicio, setInicio] = useState<string>(prevDayString);

    const [fin, setFin] = useState<string>(nextDayString);

    const [errorFecha, setErrorFecha] = useState<string>('');

    const validarFechas = (fechaInicio: string, fechaFin: string) => {
        if (fechaInicio > fechaFin) {
            setErrorFecha('La fecha de inicio no puede ser mayor que la fecha de fin');
            return false;
        }
        setErrorFecha('');
        return true;
    };

    const handleInicioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nuevaFechaInicio = e.target.value;
        if (validarFechas(nuevaFechaInicio, fin)) {
            setInicio(nuevaFechaInicio);
        }
    };

    const handleFinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nuevaFechaFin = e.target.value;
        if (validarFechas(inicio, nuevaFechaFin)) {
            setFin(nuevaFechaFin);
        }
    };

    useEffect(() => {
        const traerPedidos = async () => {
            const res: IPedido[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}pedido/getPorFecha/${idSucursales}?fechaInicio=${inicio}&fechaFin=${fin}`, getAccessTokenSilently) as IPedido[];
            setPedidos(res);
        }
        traerPedidos();
        dispatch(setGlobalUpdated(false))
    }, [updated, inicio, fin])

    const estados = ["PENDIENTE", "PREPARACION", "ENVIANDO", "ENTREGADO", "CANCELADO", "RECHAZADO"];

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
        <>
            <div className='flex flex-row space-x-4  p-5'>
                <input
                    type="date"
                    className='border rounded cursor-pointer'
                    value={inicio}
                    onChange={handleInicioChange}
                />
                <input
                    type="date"
                    className='border rounded cursor-pointer'
                    value={fin}
                    onChange={handleFinChange}
                />
            </div>
            <div className='flex flex-row w-full justify-start items-start  overflow-x-auto'>
                <div className='flex flex-row m-2'>
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
        </>
    )
}

export default ContainerCardPedido