import * as Yup from 'yup'

export const validationCategoria = Yup.object().shape({
    denominacion: Yup.string().required('La denominación es requerida'),
    esInsumo: Yup.boolean().required('Este campo es requerido'),
    idSucursales: Yup.array()
        .of(Yup.number().integer('idSucursales debe contener solo números enteros'))
        .required('Asignar una sucursal es obligatorio')
        .min(1, 'Se debe asignar por lo menos una sucursal'),
});