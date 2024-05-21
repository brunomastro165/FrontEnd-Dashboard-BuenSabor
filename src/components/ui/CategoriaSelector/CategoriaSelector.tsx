import React, { useEffect, useState } from 'react'
import { BackendClient, BackendMethods } from '../../../services/BackendClient'
import { IArticuloInsumo } from '../../../types/ArticuloInsumo';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IoIosArrowDown } from "react-icons/io";
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';
import { setCategory } from '../../../redux/slices/globalCategory';

const CategoriaSelector = () => {

    const back = new BackendMethods();


    //REDUX

    const updated = useAppSelector((state) => state.GlobalUpdated.updated)

    const categoriaSeleccionada = useAppSelector((state) => state.GlobalCategory.selected)

    const dispatch = useAppDispatch();

    console.log(categoriaSeleccionada);

    const [items, setItems] = useState<IArticuloInsumo[]>([]);

    useEffect(() => {
        const getAll = async () => {
            const res: IArticuloInsumo[] = await back.getAll('http://localhost:8081/ArticuloInsumo') as IArticuloInsumo[]
            setItems(res);
        }
        getAll();
    }, [updated])


    return (
        <div className='z-50 '>
            <details className="dropdown w-full ">
                <summary className="m-1  btn bg-white w-full text-red-600 shadow-lg z-50 flex items-center">{categoriaSeleccionada} <IoIosArrowDown /></summary>
                <ul className="p-5 shadow  border dropdown-content flex flex-col space-y-4 bg-base-100 rounded-box w-52 z-50 overflow-y-scroll max-h-48">
                    {items.map((item: IArticuloInsumo) => (
                        <li className='btn bg-white text-red-600 border-none shadow-none'
                            onClick={() => dispatch(setCategory(item.denominacion))}><a>{item.denominacion}</a></li>
                    ))}
                </ul>
            </details>
        </div>
    )
}

export default CategoriaSelector