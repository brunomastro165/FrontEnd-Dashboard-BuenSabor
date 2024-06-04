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
import { ICategoriaShort } from "../../../../types/ShortDtos/CategoriaShort";
import { useParams } from "react-router-dom";


interface CategoriaInput {
    setIdCategoria: Dispatch<SetStateAction<number>>;
    setLoaded: Dispatch<SetStateAction<boolean>>;
    handleChange: any;
    value: any,
}

const CategoriaInput: FC<CategoriaInput> = ({ setLoaded, setIdCategoria, handleChange, value }) => {

    const backend = new BackendMethods();

    //REDUX

    const dispatch = useAppDispatch()

    const esInsumo = useAppSelector((state) => state.GlobalEsInsumo.esInsumo)

    const { idSucursales } = useParams();

    const [categorias, setCategorias] = useState<ICategoriaShort[]>([]);

    const updated = useAppSelector((state) => state.GlobalUpdated.updated)

    const getCategorias = async () => {
        const res: ICategoriaShort[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}sucursal/getCategorias/${idSucursales}`) as ICategoriaShort[];
        const categoriaExistente = res.filter((categoria) => categoria.eliminado === false)
        const categoriaFiltrada = categoriaExistente.filter((categoria) => categoria.esInsumo === esInsumo)
        setCategorias(categoriaFiltrada)
        setLoaded(true);
    }

    useEffect(() => {
        getCategorias();
    }, [updated])


    const [editar, setEditar] = useState<boolean>(false);

    console.log(value)

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
                                // checked={value === categoria.id}
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

