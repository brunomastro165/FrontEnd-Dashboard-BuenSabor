import React, { useEffect, useState } from 'react'
import { BackendClient, BackendMethods } from '../../../services/BackendClient'
import { IArticuloInsumo } from '../../../types/ArticuloInsumo';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IoIosArrowDown } from "react-icons/io";
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';
import { setCategory } from '../../../redux/slices/globalCategory';
import { ICategoriaShort } from '../../../types/ShortDtos/CategoriaShort';
import { useParams } from 'react-router-dom';
import { ICategoriaSinArticulo } from '../../../types/SpecialDtos/CategoriaSinArticulo';

const CategoriaSelector = () => {

    const back = new BackendMethods();

    const { idSucursales } = useParams();

    //REDUX

    const updated = useAppSelector((state) => state.GlobalUpdated.updated)

    const categoriaSeleccionada = useAppSelector((state) => state.GlobalCategory.selected)

    const globalEsInsumo = useAppSelector((state) => state.GlobalEsInsumo.esInsumo)

    const dispatch = useAppDispatch();

    const [items, setItems] = useState<ICategoriaSinArticulo[]>([]);

    useEffect(() => {
        const getAll = async () => {

            //SE TIENE QUE MODIFICAR ESTE MÉOTODO PARA QUE TRAIGA CATEGORIAS SIN ARTICULOS!!!
            const res: ICategoriaSinArticulo[] = await back.getAll(`${import.meta.env.VITE_LOCAL}sucursal/getCategorias/${idSucursales}`) as ICategoriaSinArticulo[]

            const categorias: ICategoriaSinArticulo[] = res.filter((categoria) => categoria.esInsumo === globalEsInsumo)

            const categoriasExistentes: ICategoriaSinArticulo[] = categorias.filter((categoria) => !categoria.eliminado)

            setItems(categoriasExistentes);
        }
        getAll();
    }, [updated, globalEsInsumo])


    return (
        <div className='z-50 '>
            <details className="dropdown w-full ">
                <summary className="m-1  btn bg-white w-full text-red-600 shadow-lg z-50 flex items-center">{categoriaSeleccionada} <IoIosArrowDown /></summary>
                <ul className="p-5 shadow  border dropdown-content flex flex-col space-y-4 bg-base-100 rounded-box w-52 z-50 overflow-y-scroll max-h-48">
                    {items.map((item: ICategoriaSinArticulo) => (
                        <li className='btn bg-white text-red-600 border-none shadow-none'
                            onClick={() => dispatch(setCategory({ selected: item.denominacion, id: item.id }))}><a>{item.denominacion}</a></li>
                    ))}
                </ul>
            </details>
        </div>
    )
}

export default CategoriaSelector