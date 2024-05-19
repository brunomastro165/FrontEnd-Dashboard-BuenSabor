import { ChangeEvent, Dispatch, FC, useEffect, useState } from "react";
import UnidadMedidaForm from "../UnidadMedidaForm"
import { SetStateAction } from "react";
import { IUnidadMedida } from "../../../../types/UnidadMedida";
import { fetchData } from "../../../api/Fetch";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setUnidades } from "../../../../redux/slices/unidadMedida";

interface UnidadInput {
    setUnidadSeleccionada: Dispatch<SetStateAction<IUnidadMedida | undefined>>;
    openUnidad: boolean;
    setOpenUnidad: Dispatch<SetStateAction<boolean>>;
    loaded: boolean,
    setLoaded: Dispatch<SetStateAction<boolean>>;
    handleChoose: any;
}

const UnidadMedidaInput: FC<UnidadInput> = ({ loaded, openUnidad, setLoaded, setOpenUnidad, setUnidadSeleccionada, handleChoose }) => {

    const dispatch = useAppDispatch()

    const unidades = useAppSelector((state) => state.UnidadesMedida.UnidadesMedida)

    const updated = useAppSelector((state) => state.GlobalUpdated.updated)

    const getUnidades = async () => {
        const res: IUnidadMedida[] = await fetchData("http://localhost:8081/UnidadMedida");
        dispatch(setUnidades(res))
        setLoaded(true);
    }

    useEffect(() => {
        getUnidades();
    }, [updated])

    return (
        <>
            <div className='font-Roboto text-xl'>Unidades de medida: </div>
            {unidades.map((unidad, index) => (
                <>
                    <div key={index}>
                        <input
                            type="radio"
                            id={`unidadMedida${index}`}
                            name='unidadMedida'
                            value={unidad.denominacion}

                            //@ts-ignore
                            onChange={(e) => handleChoose(e, unidades, setUnidadSeleccionada, 'denominacion', 'unidadMedida')}
                        />
                        <label htmlFor={`unidadMedida${index}`} className="ml-2">
                            {unidad.denominacion}
                        </label>
                    </div>

                    {openUnidad && (
                        <div className="fixed z-50 inset-0  w-full">
                            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 m-14">
                                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                    <div className="absolute inset-0 top-0 bg-gray-500 opacity-15"></div>
                                </div>
                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                                <div className="inline-block top-0 translate-y-96 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  w-full md:w-1/2">
                                    <UnidadMedidaForm method='POST' open={openUnidad} setOpen={setOpenUnidad} />
                                </div>
                            </div>
                        </div>)}
                </>
            ))}

            <div>
                <button className='btn bg-green-500 text-white mt-2'
                    onClick={() => setOpenUnidad(true)}>Agregar unidad</button>
            </div>

        </>
    )
}

export default UnidadMedidaInput

