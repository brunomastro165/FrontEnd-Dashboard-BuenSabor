import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { BackendMethods } from "../../../../services/BackendClient";
import { useDropzone } from "react-dropzone";
import { IImagen } from "../../../../types/Imagen";

type FileWithPreview = File & { preview: string };

interface IImageInput {
    files: FileWithPreview[]
    setFiles: Dispatch<SetStateAction<FileWithPreview[]>>
    id: number,
}

const ImageInput: FC<IImageInput> = ({ files, setFiles, id }) => {

    const backend = new BackendMethods()

    console.log(files)

    const [imagenes, setImagenes] = useState<IImagen>();

    const { getRootProps, getInputProps } = useDropzone({
        //@ts-ignore
        accept: 'image/*',
        onDrop: (acceptedFiles: File[]) => {
            setFiles(prevFiles => [
                ...prevFiles,
                ...acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                }))
            ]);
        },
    });

    const urlToFile = async (url, filename, mimeType) => {
        try {
            const res = await fetch(url);
            const buf = await res.arrayBuffer();
            const file = new File([buf], filename, { type: mimeType, lastModified: Date.now() });
            const fileWithPreview = Object.assign(file, {
                preview: URL.createObjectURL(file),
                path: filename // Asegura que 'path' esté presente
            });
            return fileWithPreview;
        } catch (error) {
            console.error('Error fetching image:', error);
            throw error; // Lanza el error para manejarlo después si es necesario
        }
    };
    
    useEffect(() => {
        const getImagenId = async () => {
            try {
                const imagenes = await backend.getById(`${import.meta.env.VITE_LOCAL}imagenArticulo/${id}`);
                console.log("acá");
                console.log(imagenes);
                setImagenes(imagenes);
    
                // Crear un objeto FileWithPreview a partir de la URL de la imagen
                const file = await urlToFile(imagenes.url, `nombre-${imagenes.url}`, "image/jpeg");
                console.log(file);
                setFiles(prevFiles => [...prevFiles, file]);
            } catch (error) {
                console.error('Error fetching image data:', error);
            }
        };
    
        getImagenId();
    }, [id]); // Asegúrate de que el efecto se ejecute cuando 'id' cambie// Asegúrate de que el efecto se ejecute cuando 'id' cambie

    const removeImage = (index: number) => {
        setFiles(files => files.filter((file, i) => i !== index));
    };

    console.log(imagenes)
    return (
        <>
            <div className='my-5 rounded'>
                <h1 className='font-Roboto text-xl my-5 '>Selecciona o arrastra imágenes</h1>
                <div {...getRootProps()} className='active:scale-95 transition-all bg-slate-100 rounded-xl'>
                    <input {...getInputProps()} className='border bg-black' />
                    <div className='w-full h-full border-4 border-dashed   p-5 font-Roboto text-xl text-center rounded-xl text-blue-600 cursor-pointer'>Selecciona o arrastra imágenes</div>
                </div>
            </div>

            <div className="flex justify-center flex-wrap items-center h-auto">
                {files.map((file: FileWithPreview, index: number) => (
                    <>
                        <div className="border m-2 p-4 rounded flex flex-col justify-center items-center">
                            <img src={file.preview} alt="Vista previa de la imagen seleccionada" key={file.name}
                                className="size-48 rounded" />
                            <button onClick={() => removeImage(index)}
                                className="btn bg-red-600 text-white mt-2 hover:bg-red-500 items-center">Quitar</button>
                        </div>
                    </>
                ))}
                {/* 
                <>
                    {imagenes && (
                        <div className="border m-2 p-4 rounded flex flex-col justify-center items-center">
                            <img src={imagenes?.url} alt="Vista previa de la imagen seleccionada" key={imagenes?.name}
                                className="size-48 rounded" />
                            <button onClick={() => removeImage(1)}
                                className="btn bg-red-600 text-white mt-2 hover:bg-red-500 items-center">Quitar</button>
                        </div>
                    )}
                </> */}

            </div>
        </>
    );
};

export default ImageInput;