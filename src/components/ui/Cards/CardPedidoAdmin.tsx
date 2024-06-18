import React, { FC, SetStateAction } from 'react'
import { useAppSelector } from '../../../hooks/redux'
import GlobalInitialValues from '../../../redux/slices/globalInitialValues'
import { IPedido } from '../../../types/Pedido'
import { Dispatch } from '@reduxjs/toolkit';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { IFactura } from '../../../types/Factura';
import { useParams } from 'react-router-dom';

interface ICardEmpleado {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardPedidoAdmin: FC<ICardEmpleado> = ({ open, setOpen }) => {

    const pedido: IPedido = useAppSelector((state) => state.GlobalInitialValues.data)

    const factura = pedido.factura;

    const loadImageAsBase64 = (url: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = url;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0);
                    const dataURL = canvas.toDataURL('image/jpeg');
                    resolve(dataURL);
                } else {
                    reject(new Error('Failed to get canvas context'));
                }
            };
            img.onerror = reject;
        });
    };

    const generatePDF = async () => {
        const doc = new jsPDF();
        const fecha = factura.fechaFcturacion || 'N/A'; // Asegúrate de tener datos por defecto
        const imgSrc = pedido.sucursal.imagenes[0].url; // Ruta de la imagen local o URL

        try {
            const imgData = await loadImageAsBase64(imgSrc);
            // Agregar una imagen en la cabecera
            doc.addImage(imgData, 'JPEG', 140, 10, 50, 25); // Posición y tamaño de la imagen
        } catch (error) {
            console.error('Error loading image:', error);
        }

        // Agregar texto de cabecera con estilo
        doc.setFontSize(36);
        doc.setTextColor(0, 51, 102); // Color azul oscuro
        doc.setFont('helvetica', 'bold');
        doc.text('EL BUEN SABOR', 10, 20);
        doc.setFontSize(20);
        doc.setTextColor(0, 51, 102); // Color azul oscuro
        doc.setFont('helvetica');
        doc.text(`SUCURSAL: ${pedido.sucursal.nombre}`, 10, 30)

        let y = 40; // Posición inicial después de la cabecera

        // Mover datos de facturación a la derecha
        const datosFacturacionX = 100; // Nueva posición X para los datos de facturación

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 51, 102); // Azul oscuro
        doc.text(`FECHA DE FACTURACIÓN: ${fecha}`, datosFacturacionX, y + 10);
        doc.text(`FORMA DE PAGO: ${factura.formaPago}`, datosFacturacionX, y + 20);
        doc.text(`TOTAL DE VENTA: $${factura.totalVenta}`, datosFacturacionX, y + 30);

        // Agregar detalles del cliente (izquierda)
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 51, 102); // Azul oscuro
        doc.text(`ID FACTURA: ${factura.id}`, 10, y + 10);
        //@ts-ignore
        doc.text(`CLIENTE: ${pedido.cliente.nombre}`, 10, y + 20);
        doc.text(`CALLE: ${pedido.domicilio.calle}`, 10, y + 30);

        // Separador
        y += 40;
        doc.setDrawColor(0, 51, 102); // Azul oscuro
        doc.setLineWidth(0.5);
        doc.line(10, y - 5, 200, y - 5);

        // Agregar una tabla para los detalles del pedido
        const tableData = pedido.detallesPedido.map((detalle, index) => {
            const denominacion = detalle.articuloManufacturado?.denominacion || detalle.articuloInsumo?.denominacion || detalle.promocion?.denominacion || 'N/A';
            const precio = detalle.articuloManufacturado?.precioVenta || detalle.articuloInsumo?.precioVenta || detalle.promocion?.precioPromocional || 0;
            const precioTotal = precio * detalle.cantidad;
            return [
                index + 1,
                denominacion,
                detalle.cantidad,
                `$${precio.toFixed(2)}`,
                `$${precioTotal.toFixed(2)}`
            ];
        });

        // Configurar las opciones de autoTable
        //@ts-ignore
        doc.autoTable({
            startY: y + 10,
            head: [['#', 'Descripción', 'Cantidad', 'Individual', 'Total']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [22, 160, 133] },
            alternateRowStyles: { fillColor: [241, 241, 241] },
            margin: { top: 10 },
        });

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
                                detalle.promocion !== null ?
                                    (<h1 className='flex flex-row space-x-2 text-lg p-2'>
                                        <h1>{detalle.promocion?.denominacion}</h1><h1>x</h1><h2>{detalle.cantidad}</h2>
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