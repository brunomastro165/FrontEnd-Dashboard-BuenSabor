import React, { FC, useEffect, useState } from 'react'
import { IPedido } from '../../../types/Pedido'
import { BackendMethods } from '../../../services/BackendClient';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import { IEmpleado } from '../../../types/Empleado';
import { errorGenerico, succesGenerico } from '../../toasts/ToastAlerts';

interface IArticuloGenerico {
    id: number,
    denominacion: string;
    cantidad: number;
}

const CardPedido: FC<IPedido> = ({ cliente, domicilio, eliminado, empleado, estado, factura, fechaPedido, formaPago, id, sucursal, tipoEnvio, total, detallesPedido, horaEstimadaFinalizacion }) => {

    const backend = new BackendMethods();

    const { getAccessTokenSilently } = useAuth0()

    const { idSucursales } = useParams();

    console.log(horaEstimadaFinalizacion)

    const [estadoActual, setEstadoActual] = useState<string>();

    const dispatch = useAppDispatch()

    const updated = useAppSelector((state) => state.GlobalUpdated.updated)

    const [detalleGenerico, setDetalleGenerico] = useState<IArticuloGenerico>();

    const [empleados, setEmpleados] = useState<IEmpleado[]>([]);

    // useEffect(() => {
    //     // detallesPedido.map((detalle) => {
    //     //     if (detalle.articuloManufacturado !== null) {
    //     //         setDetalleGenerico(detalle.articuloManufacturado);
    //     //     } else if (detalle.articuloInsumo !== null) {
    //     //         setDetalleGenerico(detalle.articuloInsumo);
    //     //     }
    //     // });
    // }, []);

    useEffect(() => {
        const traerEmpleados = async () => {
            try {
                const res: IEmpleado[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}empleado/getPorSucursal/${idSucursales}`, getAccessTokenSilently) as IEmpleado[];
                setEmpleados(res)
            } catch (error) {
                errorGenerico('No se encontraron empleados')
                console.error(error)
            }
        }
        traerEmpleados();
    }, [])



    const asignarEmpleado = async (empleado: IEmpleado) => {
        try {
            const res = await backend.putNoData(`${import.meta.env.VITE_LOCAL}pedido/asignarEmpleado/${empleado.id}/${id}`, getAccessTokenSilently)
            succesGenerico(`Se asignó el empleado ${empleado.nombre}`)
        } catch (error) {
            console.error(error)
            errorGenerico('No se pudo asignar el empleado')
        }
    }

    const cambiarEstado = async (estado: string) => {
        try {
            if (estado === "CANCELADO") {
                const res = await backend.putNoData(`${import.meta.env.VITE_LOCAL}pedido/cancelar/${id}`, getAccessTokenSilently)
                console.log(res)
            }
        } catch (error) {
            console.error(error)
        }

        try {
            if (estado === "PENDIENTE") {
                const res = await backend.putNoData(`${import.meta.env.VITE_LOCAL}pedido/pendiente/${id}`, getAccessTokenSilently)
                console.log(res)
            }
        } catch (error) {
            console.error(error)
        }
        try {
            const res = await backend.put(`${import.meta.env.VITE_LOCAL}pedido/cambiarEstado/${id}`, estado, getAccessTokenSilently);
            dispatch(setGlobalUpdated(true))
            console.log(res)
        } catch (error) {
            console.error(error)
            dispatch(setGlobalUpdated(true))
        }

        
    }


    console.log(detallesPedido)
    return (
        <>
            <div className="card w-64 bg-base-100  shadow-md my-4">

                <div className="p-4 flex flex-col ">
                    {/* <h1 className='font-Roboto'>Articulos en el pedido:</h1> */}
                    {/* MOSTRAR LOS MANUFACTURADOS */}
                    <h1 className="w-max text-sm  mb-2 text-white px-2  font-Roboto  bg-blue-600  rounded ">ID: {id}</h1>
                    <div>
                        {/* <h1>{fechaPedido.toString()}</h1> */}
                        <h1>Entrega: {horaEstimadaFinalizacion?.toString()}</h1>
                        {detallesPedido && detallesPedido.length > 0 && detallesPedido.map((detalle, index) => {
                            const denominacion = detalle.articuloManufacturado?.denominacion || detalle.articuloInsumo?.denominacion || detalle.promocion?.denominacion;
                            return denominacion ? (
                                <div className='flex flex-row space-x-2' key={index}>
                                    <h1 className='w-32'>{denominacion}</h1>
                                    <h1><span className='text-sm'>x</span>{detalle.cantidad}</h1>
                                </div>
                            ) : null;
                        })}



                        <h1 className='bg-green-500 text-white w-max p-1 rounded mt-1'>{formaPago}</h1>
                    </div>
                    {/* <p>{detallesPedido}</p> */}
                </div>

                {/*@ts-ignore */}
                <button className='mb-2 btn mx-2' onClick={async () => {  document.getElementById(`my_modal_${id}`).showModal() }} >
                    Asignar empleado
                </button>

                <select className=" select border-none focus:outline-none rounded-none rounded-b  focus:bg-blue-500 hover:bg-blue-500 text-black hover:text-white focus:text-white transition-all"
                    onChange={(e) => cambiarEstado((e.target as HTMLSelectElement).value)}
                    onClick={() => (console.log("sexo"))}>
                    <option value="" >Estado del pedido</option>
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="PREPARACION">PREPARACION</option>
                    <option value="ENVIANDO">ENVIANDO</option>
                    <option value="ENTREGADO">ENTREGADO</option>
                    <option value="CANCELADO">CANCELADO</option>
                    <option value="RECHAZADO">RECHAZADO</option>

                </select>
            </div>

            <dialog id={`my_modal_${id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Asigne un empleado al pedido</h3>
                    <p className="py-4">Seleccione un empleado </p>
                    <div className='p-2 bg-gray-200 rounded flex flex-col h-80 overflow-y-scroll'>
                        {empleados
                            // .filter((empleado) => empleado.tipoEmpleado==="DELIVERY")
                            .map((empleado) =>
                                <h1 className='font-Roboto w my-2 btn' onClick={() => asignarEmpleado(empleado)}>{empleado.nombre}</h1>
                            )}
                    </div>
                    <div className="modal-action">

                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Listo</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default CardPedido