import { ChangeEvent, Dispatch, FC, useEffect, useState } from "react";
import UnidadMedidaForm from "../UnidadMedidaForm"
import { SetStateAction } from "react";
import { IUnidadMedida } from "../../../../types/UnidadMedida";
import { fetchData } from "../../../api/Fetch";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setUnidades } from "../../../../redux/slices/unidadMedida";
import { FaRegTrashAlt } from "react-icons/fa";
import { BackendMethods } from "../../../../services/BackendClient";
import { setGlobalUpdated } from "../../../../redux/slices/globalUpdate";


interface UnidadInput {
    setUnidadSeleccionada: Dispatch<SetStateAction<IUnidadMedida | undefined>>;
    openUnidad: boolean;
    setOpenUnidad: Dispatch<SetStateAction<boolean>>;
    loaded: boolean,
    setLoaded: Dispatch<SetStateAction<boolean>>;
    handleChoose: any;
}


const UnidadMedidaInput: FC<UnidadInput> = ({ loaded, openUnidad, setLoaded, setOpenUnidad, setUnidadSeleccionada, handleChoose }) => {


    const backend = new BackendMethods();

    const dispatch = useAppDispatch()

    const unidades = useAppSelector((state) => state.UnidadesMedida.UnidadesMedida)

    const updated = useAppSelector((state) => state.GlobalUpdated.updated)

    const getUnidades = async () => {
        const res: IUnidadMedida[] = await fetchData("http://localhost:8081/UnidadMedida");
        const unidadesHabilitadas = res.filter((unidad) => !unidad.eliminado)
        dispatch(setUnidades(unidadesHabilitadas))
        setLoaded(true);
    }

    const deleteLogico = async (id: number) => {
        dispatch(setGlobalUpdated(true))
        const res = await backend.delete(`http://localhost:8081/UnidadMedida/${id}`)
        dispatch(setGlobalUpdated(true))
    }

    useEffect(() => {
        getUnidades();
    }, [updated])


    const [editar, setEditar] = useState<boolean>(false);

    return (
        <>
            <div className='font-Roboto text-xl'>Unidades de medida: </div>

            <div className="overflow-y-scroll max-h-52 ">
                {unidades.map((unidad, index) => (
                    <>
                        <div key={index} className="flex flex-row items-center justify-between">

                            <div className="my-2">
                                <input
                                    type="radio"
                                    id={`unidadMedida${index}`}
                                    name='unidadMedida'
                                    value={unidad.denominacion}
                                    className="ml-5 text-green-600 rounded-none b border-dashed"

                                    //@ts-ignore
                                    onChange={(e) => handleChoose(e, unidades, setUnidadSeleccionada, 'denominacion', 'unidadMedida')}
                                />

                                <label htmlFor={`unidadMedida${index}`} className="ml-2">
                                    {unidad.denominacion}
                                </label>
                            </div>

                            {editar &&
                                <h1 className="mr-5"
                                    onClick={() => deleteLogico(unidad.id)}>
                                    <FaRegTrashAlt className="bg-red-600 text-white text-3xl p-1 rounded cursor-pointer hover:scale-105" />
                                </h1>
                            }
                        </div>
                    </>
                ))}

                {openUnidad && (
                    <div className="fixed z-50 inset-0  w-full">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 m-14">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 top-0 bg-gray-500 opacity-15"></div>
                            </div>
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                            <div className="inline-block top-0 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  w-full md:w-1/2">
                                <UnidadMedidaForm method='POST' open={openUnidad} setOpen={setOpenUnidad} />
                            </div>
                        </div>
                    </div>
                )}

            </div>

            <div className="flex flex-row justify-center items-center space-x-4 mb-4">
                <div className="flex justify-center items-center mt-2">
                    <button className='btn bg-green-500 text-center text-white mt-2'
                        onClick={() => setOpenUnidad(true)}>Agregar unidad</button>
                </div>

                <div className="flex justify-center items-center mt-2">
                    <button className='btn bg-blue-500 text-center text-white mt-2'
                        onClick={() => setEditar(!editar)}>Editar unidades</button>
                </div>
            </div>

        </>
    )
}

export default UnidadMedidaInput

