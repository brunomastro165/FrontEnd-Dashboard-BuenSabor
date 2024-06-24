import React, { FC, useEffect, useState } from 'react'
import { IPedido } from '../../../types/Pedido'
import { BackendMethods } from '../../../services/BackendClient'
import CardPedido from '../Cards/CardPedido';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import ModificarStock, { setModificarStock } from '../../../redux/slices/modificarStock';
import { errorGenerico, infoGenerico } from '../../toasts/ToastAlerts';
import { FcInfo } from "react-icons/fc";
import LoadingMessage from '../LoadingMessage/LoadingMessage';

const ContainerCardPedido = () => {

    const { idSucursales } = useParams();

    const backend = new BackendMethods();

    const { getAccessTokenSilently } = useAuth0();

    const [pedidos, setPedidos] = useState<IPedido[]>([]);

    const dispatch = useAppDispatch();

    const updated = useAppSelector((state) => state.GlobalUpdated.updated)

    const modificarStock = useAppSelector((state) => state.ModificarStock.modificarStock)

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

    const [loading, setLoading] = useState<boolean>(true);

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
            try {
                const res: IPedido[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}pedido/getPorFecha/${idSucursales}?fechaInicio=${inicio}&fechaFin=${fin}`, getAccessTokenSilently) as IPedido[];
                setPedidos(res);
                setLoading(false);
            } catch (error) {
                console.error(error)
                errorGenerico('No se pudieron traer los pedidos')
            }
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

    console.log(modificarStock)

    return (
        !loading ? (<>
            <div className='flex flex-row space-x-4 items-center p-5'>
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
                <label className="inline-flex items-center justify-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" checked={modificarStock} onChange={() => { dispatch(setModificarStock(!modificarStock)), !modificarStock ? infoGenerico(`Se activó la modificación de stock del pedido`) : infoGenerico(`Se desactivó la modificación de stock del pedido`) }} />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900">Alterar stock</span>
                </label>
                {/*@ts-ignore*/}
                <FcInfo className='text-4xl cursor-pointer' onClick={() => document?.getElementById(`info_modificarStock`)?.showModal()} />
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

            <dialog id={`info_modificarStock`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg font-Roboto">Acerca de alterar stock...</h3>
                    <p className="py-4 font-Roboto">Con alterar stock usted le indica al sistema si el stock de los productos contenidos en sus pedidos va a ser alterado o no cuando cambie de estado.
                        <br />
                        Ejemplos de uso
                        <br /> <br />
                        Pasando de <span className='px-2 py-1 bg-gray-500 text-white rounded text-center'>PENDIENTE</span> a <span className='px-2 py-1 bg-red-500 text-white rounded text-center'>CANCELADO</span> usted va a <span className='font-bold'>reponer</span> el stock de sus productos.
                        <br /> <br />
                        Pasando de <span className='px-2 py-1 bg-red-500 text-white rounded text-center'>CANCELADO</span> a <span className='px-2 py-1 bg-gray-500 text-white rounded text-center'>PENDIENTE</span> usted le <span className='font-bold'>volverá a descontar el stock</span> a sus productos.
                        <br /> <br />
                        En los demás estados no está planificada la resta o suma del stock, si tiene la necesidad puntual de que así sea, comuniquese con nosotros.
                    </p>
                    <div className="modal-action">

                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Entendido</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>) : (<LoadingMessage titulo='Cargando pedidos desde el servidor' />)

    )
}

export default ContainerCardPedido