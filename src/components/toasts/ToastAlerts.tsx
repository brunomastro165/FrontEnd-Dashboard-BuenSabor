import { toast } from "react-toastify";

export const errorMessage = () => {
    toast.error('Ocurrió un error en el envío del formulario', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
    });
};

export const successMessage = () => {
    toast.success('El formulario fué enviado con éxito', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
    });
};