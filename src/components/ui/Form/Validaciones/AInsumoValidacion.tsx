import * as Yup from 'yup'

export const validationInsumo = Yup.object().shape({
    denominacion: Yup.string().required('La denominación es requerida'),
    descripcion: Yup.string().required('La descripción es requerida'),
    precioVenta: Yup.number()
        .typeError('El precio de venta debe ser un número')
        .required('El precio de venta es requerido'),
    precioCompra: Yup.number()
        .typeError('El precio de compra debe ser un número')
        .required('El precio de compra es requerido'),
    stockActual: Yup.number()
        .typeError('El stock actual debe ser un número')
        .required('El stock actual es requerido')
        .test('is-less-than-stockMaximo', 'El stock actual no puede ser mayor que el stock máximo', function (value) {
            return value <= this.parent.stockMaximo;
        })
        .test('is-more-than-stockMinimo', 'El stock actual no puede ser menor que el stock mínimo', function (value) {
            return value >= this.parent.stockMinimo;
        }),
    stockMaximo: Yup.number()
        .typeError('El stock máximo debe ser un número')
        .required('El stock máximo es requerido')
        .test('is-more-than-stockActual', 'El stock máximo debe ser mayor que el stock actual', function (value) {
            return value > this.parent.stockActual;
        })
        .test('is-more-than-stockMinimo', 'El stock máximo debe ser mayor que el stock mínimo', function (value) {
            return value > this.parent.stockMinimo;
        }),
    stockMinimo: Yup.number()
        .typeError('El stock mínimo debe ser un número')
        .required('El stock mínimo es requerido')
        .test('is-less-than-stockActual', 'El stock mínimo debe ser menor que el stock actual', function (value) {
            return value < this.parent.stockActual;
        })
        .test('is-less-than-stockMaximo', 'El stock mínimo debe ser menor que el stock máximo', function (value) {
            return value < this.parent.stockMaximo;
        }),
    esParaElaborar: Yup.boolean().required('Este campo es requerido'),
    unidadMedida: Yup.object().shape({
        denominacion: Yup.string().required('Debe seleccionar una unidad de medida'),
        id: Yup.number().required('Debe seleccionar una unidad de medida')
    }).required('Debe seleccionar una unidad de medida'),
    idCategoria: Yup.number()
        .required('Debe seleccionar una categoría')
        .moreThan(0, 'Debe seleccionar una categoría')
});
