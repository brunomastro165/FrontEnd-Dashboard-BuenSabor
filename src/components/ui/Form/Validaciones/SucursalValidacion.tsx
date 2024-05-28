import * as Yup from 'yup'

export const validationSucursal = Yup.object().shape({
    nombre: Yup.string()
        .required('El nombre es requerido'),
    horarioApertura: Yup.string()
        .required('El horario de apertura es requerido'),
    horarioCierre: Yup.string()
        .required('El horario de cierre es requerido'),
    casaMatriz: Yup.boolean()
        .required('Este campo es requerido'),
    domicilio: Yup.object().shape({
        calle: Yup.string()
            .required('La calle es requerida'),
        numero: Yup.number()
            .typeError('El número debe ser un valor numérico')
            .required('El número es requerido'),
        cp: Yup.number()
            .typeError('El código postal debe ser un valor numérico')
            .required('El CP es requerido'),
        nroDpto: Yup.number()
            .typeError('El número de departamento debe ser un valor numérico'),
        nombre: Yup.string()
            .required('El nombre es requerido'),
        piso: Yup.number()
            .typeError('El piso debe ser un valor numérico')
    })
});