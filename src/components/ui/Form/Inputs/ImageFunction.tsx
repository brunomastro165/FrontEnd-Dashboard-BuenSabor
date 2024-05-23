import { FC } from "react";


export const subirImagenes = async (idArticulo: number, imagenes: any[]) => {

    if (imagenes.length === 0) {
        console.error("No hay imágenes para subir");
        return;
    }

    const formData = new FormData();
    imagenes.forEach((imagen: any, index: number) => {
        formData.append('uploads', imagen);
    });

    try {
        const res = await fetch(`${import.meta.env.VITE_LOCAL}imagenArticulo/uploads/${idArticulo}`, {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            const data = res.status; // Parse the JSON response
            console.log(data); // Log the parsed data for debugging
            return data; // Return the parsed data
        } else {
            console.error("Error en la respuesta del servidor:", res.statusText);
        }
    } catch (error) {
        console.error(error);
    }
};