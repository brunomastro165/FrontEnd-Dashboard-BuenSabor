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

    const [imagenes, setImagenes] = useState<IImagen[]>([]);

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



    useEffect(() => {

        const getImagenId = async () => {
            const imagenes: IImagen[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}imagenArticulo/${id}`) as IImagen[]
            console.log("acá")
            console.log(imagenes)
            setImagenes(imagenes)
        }

        getImagenId();

    }, [])

    const removeImage = (index: number) => {
        setFiles(files => files.filter((file, i) => i !== index));
    };

    console.log(files)
    return (
        <>
            <div className='my-5 rounded'>
                <h1 className='font-Roboto text-xl my-5 '>Seleccionar imágenes: </h1>
                <div {...getRootProps()} className='active:scale-95 transition-all bg-slate-100 rounded-xl'>
                    <input {...getInputProps()} className='border bg-black' />
                    <div className='w-full h-full border p-5 font-Roboto text-xl text-center rounded-xl text-blue-600 cursor-pointer'>Haz clic para seleccionar archivos</div>
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


                {imagenes.length>= 1 &&

                <>
                    <div className="border m-2 p-4 rounded flex flex-col justify-center items-center">
                        <img src={imagenes[0].url} alt="Vista previa de la imagen seleccionada" key={imagenes[0].name}
                            className="size-48 rounded" />

                        <button onClick={() => removeImage(1)}
                            className="btn bg-red-600 text-white mt-2 hover:bg-red-500 items-center">Quitar</button>
                    </div>
                </>
                }
            </div>
        </>
    );
};

export default ImageInput;