//@ts-nocheck
import React, { FC, useState, useEffect, ChangeEvent, useRef } from 'react';
import { IForm } from '../../../types/Form';
import { BackendClient } from '../../../services/BackendClient';
import { IUnidadMedida } from '../../../types/UnidadMedida';

class CRUDMetods extends BackendClient<any> { }

const PUTForm: FC<IForm> = ({ data, open, setOpen }) => {

    const backend = new CRUDMetods();

    const [formData, setFormData] = useState<{ [key: string]: T }>({});

    const [transformData, setTransformData] = useState<{ [key: string]: string }>({});

    //Esto en caso de tener un input FILE
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    useEffect(() => {
        setFormData(data);
        setTransformData(data)
    }, [data]);


    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        console.log(formData);
    };

    const genericInput = (key: string, type: string) => {
        return (
            <>
                <h1 className='font-Roboto text-xl first-letter:uppercase'>{key}</h1>
                <input
                    type={type}
                    name={key}
                    id={key}
                    value={formData[key]}
                    onChange={handleChange}
                    required
                    //placeholder={key}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer" />
                {/* <label htmlFor={key} className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    {key}
                </label> */}
            </>
        )
    }

    const fileInput = (key: string) => {
        return (
            <>
                <h1 className='font-Roboto text-xl mb-4'>Imágenes:</h1>
                <div className="relative w-24 h-24 ">
                    <input
                        className="absolute opacity-0 w-full h-full cursor-pointer"
                        multiple
                        type="file"
                        name={key}
                        id={key}
                        onChange={handleFileChange}
                        required
                    />
                    <label htmlFor={key} className="w-full h-full border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-400">
                        <span className="text-3xl">+</span>
                    </label>
                </div>
                {/* <input type="file" className="file-input w-full max-w-xs" /> */}
            </>
        )
    }

    const sucursalesInput = (key: string) => {
        return (
            <>
                <div className='font-Roboto text-xl'>Sucursales actuales</div>
                {transformData.sucursales.map((sucursal, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            id={`${key}${index}`}
                            name={key}
                            value={sucursal.id}
                            onChange={handleChange}
                            className="peer"
                        />
                        <label htmlFor={`${key}${index}`} className="ml-2">
                            {sucursal.nombre}
                        </label>
                    </div>
                ))}
            </>
        )
    }


    const AMDetalleInput = ({ item }) => {

        const [medidas, setMedidas] = useState<IUnidadMedida[]>([]);
        const mountedRef = useRef(false);

        //Traemos todas las medidas cargadas
        const getMedidas = async () => {
            const res: IUnidadMedida[] = await backend.getAll("http://localhost:8080/unidadesMedidas");
            if (mountedRef.current) { // Solo actualiza el estado si el componente está montado
                setMedidas(res);
            }
        }

        useEffect(() => {
            mountedRef.current = true;
            getMedidas();
            return () => { mountedRef.current = false; } // Limpia la referencia al desmontar
        }, [])


        return (
            <>
                <div className='font-Roboto text-xl'>Detalle de insumos: </div>
                {item.map((unidad, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            id={`${item}${index}`}
                            name={item}
                            value={unidad.id}
                            onChange={handleChange}
                            className="peer"
                        />
                        <label htmlFor={`${item}${index}`} className="ml-2">
                            {unidad.articuloInsumo.denominacion}
                        </label>
                    </div>
                ))}
            </>
        )
    }

    // Probé usando un componente funcional de React para cada input, asi está mejor organizado, en la versión
    // final puede cambiar
    const [selected, setSelected] = useState("");

    const UnidadMedidaInput = ({ name }) => {

        const [medidas, setMedidas] = useState<IUnidadMedida[]>([]);

        const [medidaSeleccionada, setMedidaSeleccionada] = useState<IUnidadMedida>();

        const mountedRef = useRef(false);

        //Traemos todas las medidas cargadas
        const getMedidas = async () => {
            const res: IUnidadMedida[] = await backend.getAll("http://localhost:8080/unidadesMedidas");
            if (mountedRef.current) { // Solo actualiza el estado si el componente está montado
                setMedidas(res);
            }
        }

        const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
            const denominacionSeleccionada = e.target.value;
            const unidadMedidaSeleccionada = medidas.find(medida => medida.denominacion === denominacionSeleccionada);
            setMedidaSeleccionada(unidadMedidaSeleccionada);
            setFormData(prevState => ({
                ...prevState,
                unidadMedida: unidadMedidaSeleccionada
            }))

        }

        useEffect(() => {
            mountedRef.current = true;
            getMedidas();
            return () => { mountedRef.current = false; } // Limpia la referencia al desmontar
        }, [])


        console.log(formData)

        return (
            <>
                <div className='font-Roboto text-xl'>Unidad de medida: </div>
                {medidas.map((unidad, index) => (
                    <div key={index}>
                        <input
                            type="radio"
                            id={`${name}${index}`}
                            name={name}
                            value={unidad.denominacion}
                            onChange={handleSelect}
                            onClick={() => setSelected(unidad.denominacion)}
                            className={`peer ${selected === unidad.denominacion ? 'p-12' : ''}`}
                        //checked={medidaSeleccionada?.denominacion === unidad.denominacion}
                        />
                        <label htmlFor={`${name}${index}`} className="ml-2">
                            {unidad.denominacion}
                        </label>
                    </div>
                ))}
            </>
        )
    }


    // TODO revisar esto

    interface IInputProps<T> {
        name: string;
        items: T[];
        selectedItem: T | undefined;
        itemToString: (item: T) => string;
        onSelect: (item: T | undefined) => void;
    }

    const GenericInput = <T,>({ name, items, selectedItem, itemToString, onSelect }: IInputProps<T>) => {
        const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
            const selectedString = e.target.value;
            const selectedItem = items.find(item => itemToString(item) === selectedString);
            onSelect(selectedItem);
        }

        return (
            <>
                <div className='font-Roboto text-xl'>{name}: </div>
                {items.map((item, index) => (
                    <div key={index}>
                        <input
                            type="radio"
                            id={`${name}${index}`}
                            name={name}
                            value={itemToString(item)}
                            onSelect={handleSelect}
                            className="peer"
                            checked={selectedItem && itemToString(selectedItem) === itemToString(item)}
                        />
                        <label htmlFor={`${name}${index}`} className="ml-2">
                            {itemToString(item)}
                        </label>
                    </div>
                ))}
            </>
        )
    }
    return (
        //Esto es un formulario genérico que va a recibir los datos que le pasemos y va a 
        //armar inputs en base a eso, queda diferenciar los inputs por tipo de dato y ya estaría
        //para probar los PUT
        <div className='w-full flex flex-col items-center justify-center space-y-4 p-10 '
            onSubmit={handleSubmit}
        >

            <div className='w-full flex justify-end '>
                <h1 className='flex text-end justify-end bg-red-600 btn btn-error rounded-full text-white text-xl cursor-pointer w-min'
                    onClick={() => setOpen(false)}>X</h1>
            </div>

            <h2 className='text-3xl font-Roboto'>Formulario para agregar</h2>

            {/*Mapeo los objetos que traigo al formulario, dependiendo de cada objeto, genero un input distinto */}
            {Object.keys(transformData).map((key, index) => (
                <div key={index} className='w-full'>
                    {key !== "id" && transformData[key] !== undefined &&
                        <div className="relative z-0 w-full mb-5 group">
                            {typeof transformData[key] === 'number' ? (
                                // Renderiza este input si el tipo de dato es 'number'
                                genericInput(key, "number")
                            ) : key === "sucursales" ? (
                                //Renderiza este input si se necesita un select de sucursales
                                sucursalesInput(key)
                            ) : key === "imagenes" ? (
                                //Renderiza este input si el tipo de dato es 'imagen'
                                fileInput(key)
                            ) : key === "unidadMedida" ? (
                                <UnidadMedidaInput name={key} />
                            ) : key === "articuloManufacturadoDetalles" ? (
                                <AMDetalleInput item={transformData[key]} />

                            ) : ( // Renderiza este input si el tipo de dato no es ningún otro
                                genericInput(key, "text")
                            )}
                        </div>
                    }
                </div>

            ))}
            <button className='bg-red-600 text-white px-4 py-2 rounded-md active:scale-95 transition-all'
                onClick={handleSubmit}>Enviar</button>
        </div>
    );
};

export default PUTForm;