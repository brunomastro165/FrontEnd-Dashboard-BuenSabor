
import React, { ChangeEvent, FC, SetStateAction, useEffect, useState } from 'react'
import { IArticuloManufacturadoDetalle } from '../../../../types/ArticuloManufacturadoDetalle';
import { IArticuloInsumo } from '../../../../types/ArticuloInsumo';
import { Dispatch } from '@reduxjs/toolkit';
import { BackendMethods } from '../../../../services/BackendClient';
import { IDetallePromo } from '../../../../types/DetallePromo';
import { IDetallePromoCreate } from '../../../../types/CreateDtos/DetallePromoCreate';


interface IDetalleInput {
    values: any
    setValues: any
    idSucursales: string | undefined
}


interface IArticuloGenerico {
    id: number,
    denominacion: string,

}


const DetalleGenerico: FC<IDetalleInput> = ({ values, setValues, idSucursales }) => {

    const backend = new BackendMethods()

    const [aMDetalles, setAmDetalles] = useState<IDetallePromoCreate[]>([])

    const [filtroDetalle, setFiltroDetalle] = useState<IArticuloInsumo[]>([]);

    const [articulosInsumo, setArticulosInsumo] = useState<IArticuloInsumo[]>([])

    const [articulosGenericos, setArticulosGenericos] = useState<IArticuloGenerico[]>([])

    const [filtroGenerico, setFiltroGenerico] = useState<IArticuloGenerico[]>([]);


    const [popUp, setPopUp] = useState<boolean>(false);

    //En esta función pedimos el valor del número ingresado por el usuario y el valor de la denominación del articulo insumo
    const handleQuantityChange = (cantidad: number, id: number) => {

        let existe: boolean = false;

        let newDetalles = aMDetalles.map(detalle => {
            //Si el insumo ya existe dentro de la lista de detalles, solo actualizamos su cantidad
            if (detalle.idArticulo === id) {
                existe = true;
                return {
                    ...detalle,
                    cantidad: cantidad === 1 ? detalle.cantidad + 1 : detalle.cantidad - 1
                };
            } else {
                return detalle;
            }
        });

        //Si el insumo no existe y e es 1, lo añadimos a la lista con cantidad 1
        if (!existe && cantidad === 1) {
            const selectedArticulo: IArticuloInsumo | undefined = articulosInsumo?.find((a) => a.id === id)
            newDetalles.push({
                id: 0,
                cantidad: 1,
                idArticulo: selectedArticulo?.id
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
            setFiltroGenerico([]);
            return 'no hay búsqueda';
        }
        else {
            const res: IArticuloGenerico[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}ArticuloInsumo/getArticulos`) as IArticuloGenerico[]
            setFiltroGenerico(res);
            setArticulosGenericos(res);
            return res;
        }
    }

    // console.log(values)

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
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
                    {filtroGenerico
                        .map((articulo: IArticuloGenerico, index: number) => (
                            <div key={index} className='  rounded p-1 flex justify-between items-center'>
                                <div className='flex flex-row my-2 items-center'>
                                    <h1 className='w-24'>{articulo.denominacion}</h1>
                                    <input
                                        className=' btn text-white bg-green-600 hover:bg-green-500 size-10'
                                        value={'+'}
                                        type="button"
                                        id={`cantidad${index}`}
                                        name='cantidad'
                                        min="0"
                                        onClick={() => handleQuantityChange(1, articulo.id)}
                                    />
                                    <input
                                        className=' btn size-10 ml-2'
                                        value={'-'}
                                        type="button"
                                        id={`cantidad${index}`}
                                        name='cantidad'
                                        min="0"
                                        onClick={() => handleQuantityChange(0, articulo.id)}
                                    />
                                </div>
                                {/*Por si no queda claro, esto me pone la cantidad actual de cada articulo */}
                                <div className=''>
                                    <h1 className='ml-2 w-20'>{aMDetalles.find(e => e.idArticulo === articulo.id)?.cantidad}</h1>
                                </div>
                            </div>
                        ))}
                </div>
                {popUp && <h1 className='flex mt-4 justify-center w-full'>No se encontraron insumos... </h1>}
            </div>



            <div className='flex flex-wrap my-2 h-auto '>
                {/* {aMDetalles?.map((detalle) => (
                    <div className='text-xl px-2 py-1 rounded mr-2 bg-green-400 w-max text-white '>{detalle.articuloInsumo?.denominacion}
                        <span className='text-xs mx-2'>x</span>{detalle.cantidad}</div>
                ))} */}
            </div>
        </div>
    )


}

export default DetalleGenerico
