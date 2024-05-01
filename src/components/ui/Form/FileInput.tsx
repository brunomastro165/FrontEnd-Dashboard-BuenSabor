import { useDropzone } from 'react-dropzone';

const DragDrop = ({ onDrop }) => {
    const { getRootProps, getInputProps } = useDropzone({
        // Esta función se llama cuando los archivos son soltados en la zona de arrastrar y soltar
        onDrop: (acceptedFiles) => {
            // Aquí puedes hacer algo con los archivos aceptados si lo necesitas
            // Luego, llama a la función onDrop que pasaste como prop
            onDrop(acceptedFiles);
        },
    });

    return (
        <div className='my-5'>
            <h1 className='font-Roboto text-xl my-5'>Seleccionar imágenes: </h1>
            <div {...getRootProps()} className='active:scale-95 transition-all'>
                <input {...getInputProps()} className='border bg-black' />
                <div className='w-full h-full border p-5 font-Roboto text-lg text-center'>Haz clic para seleccionar archivos</div>
            </div>
        </div>
    );
};
export default DragDrop
