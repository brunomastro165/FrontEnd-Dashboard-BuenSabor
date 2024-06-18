
import React, { ChangeEvent, FC, SetStateAction, useEffect, useState } from 'react'
import { IArticuloManufacturadoDetalle } from '../../../../types/ArticuloManufacturadoDetalle';
import { IArticuloInsumo } from '../../../../types/ArticuloInsumo';
import { Dispatch } from '@reduxjs/toolkit';
import { BackendMethods } from '../../../../services/BackendClient';
import { useAuth0 } from '@auth0/auth0-react';


interface IDetalleInput {
    values: any
    setValues: any
    idSucursales: string | undefined
}


const DetalleInput: FC<IDetalleInput> = ({ values, setValues, idSucursales }) => {

    const backend = new BackendMethods()

    const { getAccessTokenSilently } = useAuth0()

    const [aMDetalles, setAmDetalles] = useState<IArticuloManufacturadoDetalle[]>([])

    const [filtroDetalle, setFiltroDetalle] = useState<IArticuloInsumo[]>([]);

    const [articulosInsumo, setArticulosInsumo] = useState<IArticuloInsumo[]>([])

    const [popUp, setPopUp] = useState<boolean>(false);

    //En esta función pedimos el valor del número ingresado por el usuario y el valor de la denominación del articulo insumo
    // const handleQuantityChange = (cantidad: number, denominacion: string) => {

    //     let existe: boolean = false;

    //     let newDetalles = aMDetalles.map(detalle => {
    //         //Si el insumo ya existe dentro de la lista de detalles, solo actualizamos su cantidad
    //         if (detalle.articuloInsumo?.denominacion === denominacion) {
    //             existe = true;
    //             return {
    //                 ...detalle,
    //                 cantidad: cantidad === 1 ? detalle.cantidad + 1 : detalle.cantidad - 1
    //             };
    //         } else {
    //             return detalle;
    //         }
    //     });

    //     //Si el insumo no existe y e es 1, lo añadimos a la lista con cantidad 1
    //     if (!existe && cantidad === 1) {
    //         const selectedArticulo: IArticuloInsumo | undefined = articulosInsumo?.find((a) => a.denominacion === denominacion)
    //         newDetalles.push({
    //             id: 0,
    //             cantidad: 1,
    //             articuloInsumo: selectedArticulo
    //         });
    //     }

    //     //Eliminamos los artículos con cantidad 0
    //     newDetalles = newDetalles.filter(detalle => detalle.cantidad !== 0);


    //     //Esto es para almacenar temporalmene los insumos (de esta forma no tengo que traer de más)
    //     const insumos: IArticuloInsumo[] | undefined = [];

    //     const insumosGuardados = newDetalles.map((detalle) => detalle.articuloInsumo && insumos.push(detalle.articuloInsumo))

    //     //const insumosFinales = insumosGuardados.map((insumo) => insumo.articuloInsumo && insumos.push(insumo.articuloInsumo))

    //     setAmDetalles(newDetalles);
    // }

    useEffect(() => {
        setAmDetalles(values.articuloManufacturadoDetalles)
    }, [])


    const handleDirectQuantity = (e: ChangeEvent<HTMLInputElement>, id: number) => {

        const cantidad = Number(e.target.value);

        let existe: boolean = false;

        let newDetalles = aMDetalles.map(detalle => {
            //Si el insumo ya existe dentro de la lista de detalles, solo actualizamos su cantidad
            if (detalle.articuloInsumo?.id === id) {
                existe = true;
                return {
                    ...detalle,
                    cantidad: cantidad
                };
            } else {
                return detalle;
            }
        });

        if (!existe) {
            const selectedArticulo: IArticuloInsumo | undefined = articulosInsumo?.find((a) => a.id === id)
            newDetalles.push({
                id: 0,
                cantidad: cantidad,
                articuloInsumo: selectedArticulo,
            });
        }


        //Eliminamos los artículos con cantidad 0
        newDetalles = newDetalles.filter(detalle => detalle.cantidad !== 0);

        //Esto es para almacenar temporalmene los insumos (de esta forma no tengo que traer de más)
        const insumos: IArticuloInsumo[] | undefined = [];

        //const insumosGuardados = newDetalles.map((detalle) => detalle.idArticulo && insumos.push(detalle.idArticulo))

        //const insumosFinales = insumosGuardados.map((insumo) => insumo.articuloInsumo && insumos.push(insumo.articuloInsumo))

        setAmDetalles(newDetalles);
    }

    useEffect(() => {

        //@ts-ignore
        setValues(prevValues => ({
            ...prevValues,
            articuloManufacturadoDetalles: aMDetalles
        }));
    }, [aMDetalles]);

    const filtroPorBusqueda = async (busqueda: string) => {

        if (busqueda === "") {
            setFiltroDetalle([]);
            return 'no hay búsqueda';
        }
        else {
            const res: IArticuloInsumo[] = await backend.getAll(`http://localhost:8080/ArticuloInsumo/buscar/${idSucursales}?searchString=${busqueda}`, getAccessTokenSilently) as IArticuloInsumo[]
            setFiltroDetalle(res);
            setArticulosInsumo(res);
            return res;
        }
    }



    // console.log(values)

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        const search = e.target.value.toString();

        setTimeout(async () => {
            const res = await filtroPorBusqueda(search)

            if (res.length === 0) {
                setPopUp(true)
            } else if (res === "no hay búsqueda") {
                setPopUp(false)
            }
            else {
                setPopUp(false);
            }

        }, 1000);

    }

    return (
        <div className='h-auto '>
            <div className='font-Roboto text-xl '>Insumos disponibles: </div>
            <label className="input input-bordered flex items-center gap-2 mt-2 ">
                <input type="text" className="grow border-none focus:ring-0" placeholder="Buscar insumo..."
                    onChange={(e) => handleSearch(e)} />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            </label>
            <div className='h-36 overflow-y-scroll mt-2 flex flex-row '>
                <div>
                    {filtroDetalle
                        .filter((articulo: IArticuloInsumo) => articulo.esParaElaborar)
                        .map((articulo: IArticuloInsumo, index: number) => (
                            <div key={index} className={` flex w-full my-2 justify-between items-center border transition-all
                            bg-gray-100 rounded-md p-2 ${aMDetalles.find(e => e.articuloInsumo?.id === articulo.id)?.cantidad && 'bg-green-400 text-white'}`}>
                                <div className='flex flex-row my-2 items-center'>
                                    <h1 className='w-48'>{articulo.denominacion}</h1>
                                    {/* <input
                                        className=' btn text-white bg-green-600 hover:bg-green-500 size-10'
                                        value={'+'}
                                        type="button"
                                        id={`cantidad${index}`}
                                        name='cantidad'
                                        min="0"
                                        onClick={() => handleQuantityChange(1, articulo.denominacion)}
                                    />
                                    <input
                                        className=' btn size-10 ml-2'
                                        value={'-'}
                                        type="button"
                                        id={`cantidad${index}`}
                                        name='cantidad'
                                        min="0"
                                        onClick={() => handleQuantityChange(0, articulo.denominacion)}
                                    /> */}
                                    <input type="number"
                                        className='w-36 rounded focus:ring-0 border-none outline-none text-black'
                                        name='cantidad'
                                        min={0}
                                        placeholder='Cantidad'
                                        id={`cantidad${index}`}
                                        value={aMDetalles.find(e => e.articuloInsumo?.id === articulo.id)?.cantidad}
                                        onChange={(e) => handleDirectQuantity(e, articulo.id)}
                                    />
                                </div>
                                {/*Por si no queda claro, esto me pone la cantidad actual de cada articulo */}
                            </div>
                        ))}
                </div>
                {popUp && <h1 className='flex mt-4 justify-center w-full'>No se encontraron insumos... </h1>}
            </div>



            <div className='flex flex-wrap my-2 h-auto '>
                {aMDetalles?.map((detalle) => (
                    <div className='text-xl px-2 py-1 rounded mr-2 bg-green-400 w-max text-white '>{detalle.articuloInsumo?.denominacion}
                        <span className='text-xs mx-2'>x</span>{detalle.cantidad}<span className='text-sm mx-2'>{detalle.articuloInsumo?.unidadMedida.denominacion}</span></div>
                ))}
            </div>
        </div>
    )


}

export default DetalleInput
