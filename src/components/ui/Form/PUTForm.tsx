import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import { IForm } from '../../../types/Form';


const PUTForm: FC<IForm> = ({ data, open, setOpen }) => {

    const [formData, setFormData] = useState<{ [key: string]: string }>({});

    const [transformData, setTransformData] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        setFormData(data);
        setTransformData(data)
    }, [data]);

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        console.log(formData);
    };

    const handleSubmit = (e) => {


        console.log(formData);
    };

    function test() {

        setTimeout(() => {
            console.log("Acá");
            transformData.sucursales.map((sucursal) => {
                console.log(sucursal);
            });
        }, 3000);

    }

    test();

    const genericInput = (key: string, type: string) => {
        return (
            <>
                <input
                    type={type}
                    name={key}
                    id={key}
                    value={formData[key]}
                    onChange={handleChange}
                    required
                    placeholder={key}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer" />
                {/* <label htmlFor={key} className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    {key}
                </label> */}
            </>
        )
    }

    const sucursalesInput = (key: string) => {
        return (
            <>
                <div>Sucursales actuales</div>
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

    return (
        //Esto es un formulario genérico que va a recibir los datos que le pasemos y va a 
        //armar inputs en base a eso, queda diferenciar los inputs por tipo de dato y ya estaría
        //para probar los PUT
        <form className='w-full flex flex-col items-center justify-center space-y-4 p-10 '
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
                            ) : (
                                // Renderiza este input si el tipo de dato no es 'number'
                                genericInput(key, "text")
                            )}
                        </div>
                    }
                </div>

            ))}
            <button
                onClick={handleSubmit}>Enviar</button>
        </form>
    );
};

export default PUTForm;