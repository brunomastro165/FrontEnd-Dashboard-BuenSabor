import * as Yup from 'yup'

export const validationPromo = Yup.object().shape({
    denominacion: Yup.string()
        .required('Denominación es obligatorio'),
    fechaDesde: Yup.date()
        .required('Fecha Desde es obligatorio')
        .nullable(),
    fechaHasta: Yup.date()
        .required('Fecha Hasta es obligatorio')
        .nullable()
        .min(Yup.ref('fechaDesde'), 'Fecha Hasta debe ser posterior a Fecha Desde'),
    horaDesde: Yup.string()
        .required('Hora Desde es obligatorio'),
    horaHasta: Yup.string()
        .required('Hora Hasta es obligatorio')
        .test('is-greater', 'Hora Hasta debe ser posterior a Hora Desde', function (value) {
            const { horaDesde } = this.parent;
            return new Date(`1970-01-01T${value}:00`) > new Date(`1970-01-01T${horaDesde}:00`);
        }),
    precioPromocional: Yup.number()
        .required('Precio Promocional es obligatorio')
        .positive('Precio Promocional debe ser un número positivo')
        .integer('Precio Promocional debe ser un número entero'),
    // files: Yup.array()
    //     .required('Se requiere al menos un archivo')
    //     .nullable(),
    idSucursales: Yup.array()
        .of(Yup.number().integer('idSucursales debe contener solo números enteros'))
        .required('Asignar una sucursal es obligatorio')
        .min(1, 'Se debe asignar por lo menos una sucursal'),
});
