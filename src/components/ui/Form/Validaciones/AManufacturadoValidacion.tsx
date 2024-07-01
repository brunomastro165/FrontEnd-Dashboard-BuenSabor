import * as Yup from 'yup'


export const validationManufacturado = Yup.object().shape({
    denominacion: Yup.string().required('La denominación es requerida'),
    descripcion: Yup.string().required('La descripción es requerida'),
    precioVenta: Yup.number().required('El precio de venta es requerido').min(0, 'El precio de venta debe ser mayor o igual a 0'),
    preparacion: Yup.string().required('La preparación es requerida'),
    tiempoEstimadoMinutos: Yup.number().required('El tiempo estimado en minutos es requerido').min(1, 'El tiempo estimado debe ser mayor a 0'),
    //stock: Yup.number().required('El stock es requerido').min(0, 'El stock debe ser mayor o igual a 0'),
    unidadMedida: Yup.object().shape({
        denominacion: Yup.string().required('Debe seleccionar una unidad de medida'),
        id: Yup.number().required('Debe seleccionar una unidad de medida')
    }).required('Debe seleccionar una unidad de medida'),
    articuloManufacturadoDetalles: Yup.array()
        .min(1, 'Debe haber al menos un detalle de artículo manufacturado')
        .required('Los detalles de artículos manufacturados son requeridos'),
    idCategoria: Yup.number().required('Debe seleccionar una categoría').moreThan(0, 'Debe seleccionar una categoría')
});