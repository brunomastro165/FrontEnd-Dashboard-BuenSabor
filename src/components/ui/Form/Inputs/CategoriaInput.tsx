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


interface CategoriaInput {
    //por ahora es unidad porque no puedo cargar categorías jajas
    setIdCategoria: Dispatch<SetStateAction<number>>;
    setLoaded: Dispatch<SetStateAction<boolean>>;
    handleChange: any;
    value: any,
}

const CategoriaInput: FC<CategoriaInput> = ({ setLoaded, setIdCategoria, handleChange, value }) => {

    const backend = new BackendMethods();

    const dispatch = useAppDispatch()

    const [categorias, setCategorias] = useState<IUnidadMedida[]>([]);

    const updated = useAppSelector((state) => state.GlobalUpdated.updated)

    const getUnidades = async () => {
        const res: IUnidadMedida[] = await backend.getAll("http://localhost:8081/UnidadMedida") as IUnidadMedida[];
        setCategorias(res)
        setLoaded(true);
    }

    useEffect(() => {
        getUnidades();
    }, [updated])


    const [editar, setEditar] = useState<boolean>(false);

    return (
        <>
            <div className='font-Roboto text-xl'>Categorías disponibles: </div>
            <div className="overflow-y-scroll max-h-52 ">
                {categorias.map((categoria, index) => (
                    <>
                        <div key={index} className="flex flex-row items-center justify-between">
                            <div className="my-2">
                                <input
                                    type="radio"
                                    id={`idCategoria${index}`}
                                    name='idCategoria'
                                    value={categoria.id}
                                    className="ml-5 text-green-600 rounded-none b border-dashed"

                                    //@ts-ignore
                                    onChange={handleChange}
                                />

                                <label htmlFor={`idCategoria${index}`} className="ml-2">
                                    {categoria.denominacion}
                                </label>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}



export default CategoriaInput

