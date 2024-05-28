import * as Yup from 'yup'

export const validationEmpresa = Yup.object().shape({
    nombre: Yup.string()
        .required('El nombre es requerido'),
    razonSocial: Yup.string()
        .required('La razón social es requerida'),
    cuil: Yup.number()
        .required('El CUIL es requerido')
        .positive('El CUIL debe ser un número positivo')
        .integer('El CUIL debe ser un número entero')
        .test('len', 'El CUIL debe tener exactamente 11 dígitos', val => {
            if (val) {
                return val.toString().length === 11
            }
            return false;
        }),
});