import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { IImagen } from "../../../../types/Imagen";

type FileWithPreview = File & { preview: string };

interface IImageInput {
    file: FileWithPreview | null;
    setFile: Dispatch<SetStateAction<FileWithPreview | null>>;
    id: number;
    imagen: IImagen | undefined;
}

const ImageInputIndividual: FC<IImageInput> = ({ file, setFile, id, imagen }) => {
    console.log(file);

    const loadedImagesRef = useRef<Set<string>>(new Set());

    const { getRootProps, getInputProps } = useDropzone({
        /*@ts-ignore */
        accept: 'image/*',
        onDrop: (acceptedFiles: File[]) => {
            const newFile = Object.assign(acceptedFiles[0], {
                preview: URL.createObjectURL(acceptedFiles[0])
            });
            setFile(newFile);
        },
    });

    const urlToFile = async (url: RequestInfo | URL, filename: string, mimeType: string) => {
        try {
            const res = await fetch(url);
            const buf = await res.arrayBuffer();
            const file = new File([buf], filename, { type: mimeType, lastModified: Date.now() });
            const fileWithPreview = Object.assign(file, {
                preview: URL.createObjectURL(file),
                path: filename
            });
            return fileWithPreview;
        } catch (error) {
            console.error('Error fetching image:', error);
            throw error;
        }
    };

    useEffect(() => {
        const getImagenId = async () => {
            try {
                if (imagen && !loadedImagesRef.current.has(imagen.url)) {
                    loadedImagesRef.current.add(imagen.url);
                    const newFile = await urlToFile(imagen.url, `nombre-${imagen.url}`, "image/jpeg");
                    setFile(newFile);
                }
            } catch (error) {
                console.error('Error fetching image data:', error);
            }
        };

        getImagenId();
    }, [imagen]);

    const removeImage = () => {
        setFile(null);
    };

    return (
        <>
            <div className='my-5 rounded'>
                <h1 className='font-Roboto text-xl my-5 '>Selecciona o arrastra una imagen</h1>
                <div {...getRootProps()} className='active:scale-95 transition-all bg-slate-100 rounded-xl'>
                    <input {...getInputProps()} className='border bg-black' />
                    <div className='w-full h-full border-4 border-dashed p-5 font-Roboto text-xl text-center rounded-xl text-blue-600 cursor-pointer'>Selecciona o arrastra una imagen</div>
                </div>
            </div>

            {file && (
                <div className="flex justify-center items-center h-auto">
                    <div className="border m-2 p-4 rounded flex flex-col justify-center items-center">
                        <img src={file.preview} alt="Vista previa de la imagen seleccionada" className="size-48 rounded" />
                        <button onClick={removeImage} className="btn bg-red-600 text-white mt-2 hover:bg-red-500 items-center">Quitar</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ImageInputIndividual;