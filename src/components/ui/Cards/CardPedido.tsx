import React, { FC, useEffect, useState } from 'react'
import { IPedido } from '../../../types/Pedido'
import { BackendMethods } from '../../../services/BackendClient';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import { IEmpleado } from '../../../types/Empleado';
import { errorGenerico, infoGenerico, succesGenerico } from '../../toasts/ToastAlerts';
import { CiCircleInfo } from "react-icons/ci";

interface IArticuloGenerico {
    id: number,
    denominacion: string;
    cantidad: number;
}

const CardPedido: FC<IPedido> = ({ cliente, domicilio, eliminado, empleado, estado, factura, fechaPedido, formaPago, id, sucursal, tipoEnvio, total, detallesPedido, horaEstimadaFinalizacion }) => {

    const backend = new BackendMethods();

    const { getAccessTokenSilently } = useAuth0()

    const { idSucursales } = useParams();

    const [estadoActual, setEstadoActual] = useState<string>();

    const dispatch = useAppDispatch()

    const updated = useAppSelector((state) => state.GlobalUpdated.updated)

    const modificarStock = useAppSelector((state) => state.ModificarStock.modificarStock)

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

    // const [modificarStock, setModificarStock] = useState<boolean>(false);

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

        if (modificarStock) {
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

    // useEffect(() => {

    //     if (modificarStock) {
    //         infoGenerico('La modificación de stock está activada')
    //     }
    //     else {
    //         infoGenerico('La modificación de stock está desactivada')
    //     }

    // }, [modificarStock])

    console.log(modificarStock);

    return (
        <>
            <div className="card w-64 bg-base-100  shadow-md my-4 mx-2">

                <div className="p-4 flex flex-col ">
                    {/* <h1 className='font-Roboto'>Articulos en el pedido:</h1> */}
                    {/* MOSTRAR LOS MANUFACTURADOS */}
                    <div className='flex justify-between items-center'>
                        <h1 className="w-max text-sm  mb-2 text-white px-2  font-Roboto  bg-blue-600  rounded ">ID: {id}</h1>
                        {/*@ts-ignore */}
                        <CiCircleInfo className='text-3xl hover:text-blue-600 cursor-pointer' onClick={() => document?.getElementById(`detalles_${id}`)?.showModal()} />
                    </div>
                    {/* <label className="inline-flex items-center justify-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" onChange={() => { setModificarStock(!modificarStock), !modificarStock ? infoGenerico(`Se activó la modificación de stock del pedido ${id}`) : infoGenerico(`Se desactivó la modificación de stock del pedido ${id}`)}} />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900">Alterar stock</span>
                    </label> */}

                    {/* <div>
                     
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
                    </div> */}

                </div>

                {/*@ts-ignore */}
                <button className='mb-2 btn mx-2' onClick={async () => { document.getElementById(`my_modal_${id}`).showModal() }} >
                    Asignar empleado
                </button>

                <select className=" select border-none focus:outline-none rounded-none rounded-b  focus:bg-blue-500 hover:bg-blue-500 text-black hover:text-white focus:text-white transition-all"
                    onChange={(e) => { cambiarEstado((e.target as HTMLSelectElement).value) }}
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


            {/* MODAL DE ASIGNAR EMPLEADOS */}
            <dialog id={`my_modal_${id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Asigne un empleado al pedido</h3>
                    <p className="py-4">Seleccione un empleado </p>
                    <div className='p-2  rounded flex flex-col h-80 overflow-y-scroll'>
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


            {/* MODAL DE DETALLES DEL PEDIDO */}
            <dialog id={`detalles_${id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl mb-4">Detalles del pedido</h3>
                    <div className='space-y-4'>
                        <h1>Entrega estimada: {horaEstimadaFinalizacion?.toString()}</h1>
                        <div>
                            {detallesPedido && detallesPedido.length > 0 && detallesPedido.map((detalle, index) => {
                                const denominacion = detalle.articuloManufacturado?.denominacion || detalle.articuloInsumo?.denominacion || detalle.promocion?.denominacion;
                                return denominacion ? (
                                    <div className='flex flex-row space-x-2' key={index}>
                                        <h1 className='w-32'>{denominacion}</h1>
                                        <h1><span className='text-sm'>x</span>{detalle.cantidad}</h1>
                                    </div>
                                ) : null;
                            })}
                        </div>
                        {/*@ts-ignore */}
                        {empleado?.nombre && <h1>Empleado a cargo: {empleado?.nombre}</h1>}
                        <h1 className='bg-green-500 text-white w-max p-1 rounded mt-1'>{factura.formaPago}</h1>
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