import * as Yup from 'yup'

export const validationEmpleado = Yup.object().shape({
  nombre: Yup.string()
    .required('El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no debe exceder los 50 caracteres'),

  apellido: Yup.string()
    .required('El apellido es requerido')
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no debe exceder los 50 caracteres'),

  email: Yup.string()
    .required('El correo electrónico es requerido')
    .email('El correo electrónico no es válido'),

  telefono: Yup.string()
    .required('El teléfono es requerido')
    .matches(/^[0-9]{10}$/, 'El teléfono debe tener 10 dígitos'),

  // usuario: Yup.string()
  //   .required('El nombre de usuario es requerido')
  //   .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
  //   .max(20, 'El nombre de usuario no debe exceder los 20 caracteres'),




  // Add other validations for 'SucursalIndividualInput' and 'tipoEmpleadoInput' if needed.
});