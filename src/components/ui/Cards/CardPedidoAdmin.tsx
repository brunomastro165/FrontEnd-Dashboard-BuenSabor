import React, { FC, SetStateAction } from 'react'
import { useAppSelector } from '../../../hooks/redux'
import GlobalInitialValues from '../../../redux/slices/globalInitialValues'
import { IPedido } from '../../../types/Pedido'
import { Dispatch } from '@reduxjs/toolkit';
import { jsPDF } from 'jspdf';

interface ICardEmpleado {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardPedidoAdmin: FC<ICardEmpleado> = ({ open, setOpen }) => {

    const pedido: IPedido = useAppSelector((state) => state.GlobalInitialValues.data)

    const factura = pedido.factura;

    const generatePDF = () => {
        const doc = new jsPDF();
        const fecha = factura.fechaFcturacion;
        console.log(fecha)
        let y = 10;
        doc.text(`ID: ${factura.id}`, 10, 10);
        doc.text(`FECHA DE FACTURACIÓN: ${fecha}`, 10, 20);
        doc.text(`FORMA DE PAGO: ${factura.formaPago}`, 10, 30);
        doc.text(`TOTAL DE VENTA: $${factura.totalVenta}`, 10, 40);

        //@ts-ignore
        doc.text(`CLIENTE: ${pedido.cliente.nombre}`, 10, 50)
        doc.text(`CALLE: ${pedido.domicilio.calle}`, 10, 60)
        doc.save(`factura_id_${factura.id}.pdf`);
    };

    return (
        <div className='p-4 flex-col'>
            <div className='flex flex-row justify-between items-center'>
                <h1 className='text-xl '>
                    <span className='font-Roboto text-2xl text-red-600'>Pedido a nombre de: </span>
                    {/*@ts-ignore*/}
                    {pedido.cliente.nombre}
                </h1>
                <button onClick={() => setOpen(!open)} className='btn btn-error text-white text-xl'>X</button>
            </div>
            <div className='flex flex-row  w-full my-4 p-4 space-x-2 '>
                <div className='space-y-2 w-full'>
                    <div className='text-xl font-Roboto'>Fecha del pedido:
                        <h1>{pedido.fechaPedido.toString()}</h1>
                    </div>
                    <h3 className='text-xl font-Roboto'>Total del pedido:
                        <h1>${pedido.total}</h1>
                    </h3>
                    <h3 className='text-xl font-Roboto'>Tipo del envío:
                        <h1>{pedido.tipoEnvio}</h1>
                    </h3>
                </div>
                <div className='p-2 bg-gray-100 w-full'>
                    <h3 className='text-xl font-Roboto'>Contenido del pedido:</h3>
                    {pedido.detallesPedido.map((detalle) =>
                        detalle.articuloInsumo !== null ?
                            (<h1 className='flex flex-row space-x-2 text-lg p-2'>
                                <h1>{detalle.articuloInsumo?.denominacion}</h1><h1>x</h1><h2>{detalle.cantidad}</h2>
                            </h1>) :
                            detalle.articuloManufacturado !== null ?
                                (<h1 className='flex flex-row space-x-2 text-lg p-2'>
                                    <h1>{detalle.articuloManufacturado?.denominacion}</h1><h1>x</h1><h2>{detalle.cantidad}</h2>
                                </h1>)
                                :
                                detalle.promo !== null ?
                                    (<h1 className='flex flex-row space-x-2 text-lg p-2'>
                                        <h1>{detalle.promo?.denominacion}</h1><h1>x</h1><h2>{detalle.cantidad}</h2>
                                    </h1>)
                                    : null
                    )}
                </div>
            </div>
            <div className='btn btn-error text-white'>
                <button onClick={() => generatePDF()}>DESCARGAR FACTURA</button>
            </div>
        </div>
    )
}

export default CardPedidoAdmin