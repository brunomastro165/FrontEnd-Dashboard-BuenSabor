import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { IImagen } from "../../../../types/Imagen";

type FileWithPreview = File & { preview: string };

interface IImageInput {
    files: FileWithPreview[];
    setFiles: Dispatch<SetStateAction<FileWithPreview[]>>;
    id: number;
    imagenes: IImagen[] | undefined;
}

const ImageInput: FC<IImageInput> = ({ files, setFiles, id, imagenes }) => {
    console.log(files);

    const loadedImagesRef = useRef<Set<string>>(new Set());

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles: File[]) => {
            setFiles(prevFiles => {
                const newFiles = acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                }));
                return [...prevFiles, ...newFiles];
            });
        },
    });

    const urlToFile = async (url, filename, mimeType) => {
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
                if (imagenes) {
                    const newFiles = await Promise.all(
                        imagenes.map(async (imagen) => {
                            if (!loadedImagesRef.current.has(imagen.url)) {
                                loadedImagesRef.current.add(imagen.url);
                                const file = await urlToFile(imagen.url, `nombre-${imagen.url}`, "image/jpeg");
                                return file;
                            }
                        })
                    );
                    setFiles(prevFiles => [...prevFiles, ...newFiles.filter(file => file !== undefined)]);
                }
            } catch (error) {
                console.error('Error fetching image data:', error);
            }
        };

        getImagenId();
    }, [imagenes]);

    const removeImage = (index: number) => {
        setFiles(files => files.filter((file, i) => i !== index));
    };

    return (
        <>
            <div className='my-5 rounded'>
                <h1 className='font-Roboto text-xl my-5 '>Selecciona o arrastra imágenes</h1>
                <div {...getRootProps()} className='active:scale-95 transition-all bg-slate-100 rounded-xl'>
                    <input {...getInputProps()} className='border bg-black' />
                    <div className='w-full h-full border-4 border-dashed p-5 font-Roboto text-xl text-center rounded-xl text-blue-600 cursor-pointer'>Selecciona o arrastra imágenes</div>
                </div>
            </div>

            <div className="flex justify-center flex-wrap items-center h-auto">
                {files.map((file: FileWithPreview, index: number) => (
                    <div key={file.name + index} className="border m-2 p-4 rounded flex flex-col justify-center items-center">
                        <img src={file.preview} alt="Vista previa de la imagen seleccionada"
                            className="size-48 rounded" />
                        <button onClick={() => removeImage(index)}
                            className="btn bg-red-600 text-white mt-2 hover:bg-red-500 items-center">Quitar</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ImageInput;
