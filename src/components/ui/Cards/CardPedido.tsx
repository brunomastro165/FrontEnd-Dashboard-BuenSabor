import React, { FC, useEffect, useState } from 'react'
import { IPedido } from '../../../types/Pedido'
import { BackendMethods } from '../../../services/BackendClient';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';
import { useAuth0 } from '@auth0/auth0-react';

interface IArticuloGenerico {
    id: number,
    denominacion: string;
    cantidad: number;
}

const CardPedido: FC<IPedido> = ({ cliente, domicilio, eliminado, empleado, estado, factura, fechaPedido, formaPago, id, sucursal, tipoEnvio, total, detallesPedido, horaEstimadaFinalizacion }) => {

    const backend = new BackendMethods();

    const { getAccessTokenSilently } = useAuth0()

    console.log(horaEstimadaFinalizacion)

    const [estadoActual, setEstadoActual] = useState<string>();

    const dispatch = useAppDispatch()

    const updated = useAppSelector((state) => state.GlobalUpdated.updated)

    const [detalleGenerico, setDetalleGenerico] = useState<IArticuloGenerico>();

    // useEffect(() => {
    //     // detallesPedido.map((detalle) => {
    //     //     if (detalle.articuloManufacturado !== null) {
    //     //         setDetalleGenerico(detalle.articuloManufacturado);
    //     //     } else if (detalle.articuloInsumo !== null) {
    //     //         setDetalleGenerico(detalle.articuloInsumo);
    //     //     }
    //     // });
    // }, []);

    const cambiarEstado = async (estado: string) => {
        try {
            const res = await backend.put(`${import.meta.env.VITE_LOCAL}pedido/cambiarEstado/${id}`, estado, getAccessTokenSilently);
            dispatch(setGlobalUpdated(true))
            console.log(res)
        } catch (error) {
            console.error(error)
            dispatch(setGlobalUpdated(true))
        }
    }

    return (
        <div className="card w-64 bg-base-100  shadow-md my-4">

            <div className="p-4 flex flex-col ">
                {/* <h1 className='font-Roboto'>Articulos en el pedido:</h1> */}
                {/* MOSTRAR LOS MANUFACTURADOS */}
                <h1 className="w-max text-sm  mb-2 text-white px-2  font-Roboto  bg-blue-600  rounded ">ID: {id}</h1>
                <div>
                    {/* <h1>{fechaPedido.toString()}</h1> */}
                    <h1>Entrega: {horaEstimadaFinalizacion?.toString()}</h1>
                    {detallesPedido && detallesPedido.length > 0 && detallesPedido
                        .filter((detalle) => detalle.articuloManufacturado)
                        .map((detalle) => (
                            <div className='flex flex-row space-x-2'>
                                <h1 className='w-32'>{detalle.articuloManufacturado?.denominacion}</h1>
                                <h1><span className='text-sm'>x</span>{detalle.cantidad}</h1>
                            </div>
                        ))}

                    {/* MOSTRAR LOS INSUMOS */}
                    {detallesPedido && detallesPedido.length > 0 && detallesPedido
                        .filter((detalle) => detalle.articuloInsumo)
                        .map((detalle) => (
                            <div className='flex flex-row space-x-2'>
                                <h1>{detalle.articuloInsumo?.denominacion}</h1>
                                <h1><span className='text-sm'>x</span>{detalle.cantidad}</h1>
                            </div>
                        ))}

                    <h1 className='bg-green-500 text-white w-max p-1 rounded mt-1'>{formaPago}</h1>
                </div>
                {/* <p>{detallesPedido}</p> */}
                <div className=" flex  items-center mt-4">
                    {/* <h2 className="card-title mb-4">Total: <span className='text-green-600'>${total}</span></h2> */}


                </div>

            </div>
            <select className=" select border-none focus:outline-none rounded-none rounded-b  focus:bg-blue-500 hover:bg-blue-500 text-black hover:text-white focus:text-white transition-all"
                onChange={(e) => cambiarEstado((e.target as HTMLSelectElement).value)}
                onClick={() => (console.log("sexo"))}>
                <option value="" >Estado del pedido</option>
                <option value="PREPARACION">PREPARACION</option>
                <option value="PENDIENTE">PENDIENTE</option>
                <option value="CANCELADO">CANCELADO</option>
                <option value="RECHAZADO">RECHAZADO</option>
                <option value="ENTREGADO">ENTREGADO</option>
            </select>
        </div>
    )
}

export default CardPedido