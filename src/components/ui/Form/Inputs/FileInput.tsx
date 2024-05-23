import { useDropzone } from 'react-dropzone';
import { BackendClient, BackendMethods } from '../../../../services/BackendClient';
import { ChangeEvent, useState } from 'react';

//@ts-ignore
const DragDrop = ({ onDrop }) => {

    const backend = new BackendMethods()

    const [imagenes, setImagenes] = useState<File[]>([]);

    const [image, setImage] = useState<any>(null);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            onDrop(acceptedFiles);
            if (acceptedFiles.length > 0) {
                setImagenes(prevImagenes => [...prevImagenes, ...acceptedFiles]);
            }
        },
    });

    return (
        <>
            <div className='my-5 rounded'>
                <h1 className='font-Roboto text-xl my-5'>Seleccionar imágenes: </h1>
                <div {...getRootProps()} className='active:scale-95 transition-all bg-slate-100 rounded-xl'>
                    <input {...getInputProps()} className='border bg-black' />
                    <div className='w-full h-full border p-5 font-Roboto text-xl text-center'>Haz clic para seleccionar archivos</div>
                </div>
            </div>

            <h1 className='cursor-pointer text-blue-500 btn'>Subir</h1>
        </>
    );
};

export default DragDrop;