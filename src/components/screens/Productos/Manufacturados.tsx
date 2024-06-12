import React, { useEffect, useState } from 'react'
import { IItem } from '../../../types/Table/TableItem';
import BasePage from './BasePage';
import { fetchData } from '../../api/Fetch';
import { IArticuloManufacturado } from '../../../types/ArticuloManufacturado';
import { BackendClient, BackendMethods } from '../../../services/BackendClient';
import { IEmpresa } from '../../../types/Empresa';
import { ISucursal } from '../../../types/Sucursal';
import { ICategoria } from '../../../types/Categoria';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setGlobalInitialValues } from '../../../redux/slices/globalInitialValues';
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';
import { IArticuloManufacturadoCategoria } from '../../../types/SpecialDtos/ArticuloManufacturadoCategoria';
import GlobalEsInsumo, { setEsInsumo } from '../../../redux/slices/esInsumo';
import GlobalCategory from '../../../redux/slices/globalCategory';
import { useAuth0 } from '@auth0/auth0-react';
import { setIdPaginador } from '../../../redux/slices/idPaginador';

//class Backend extends BackendClient<IArticuloManufacturadoCategoria> { }


const ITEMS_POR_PAGINA = 5;

const Manufacturados = () => {


    const { getAccessTokenSilently } = useAuth0();

    const backend = new BackendMethods();

    //ROUTER 

    const { idEmpresa, idSucursales } = useParams();

    //REDUX

    const selectedCategory = useAppSelector((state) => state.GlobalCategory.selected)

    const idCategory = useAppSelector((state) => state.GlobalCategory.id)

    const initialValues = useAppSelector((state) => state.GlobalInitialValues.data);

    const updated = useAppSelector((state) => state.GlobalUpdated.updated);

    const esInsumo = useAppSelector((state) => state.GlobalEsInsumo.esInsumo)

    const borrados = useAppSelector((state) => state.GlobalBorrados.borrado)

    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState<boolean>(false);

    const [data, setData] = useState<IItem[]>([]);

    const [todosLosArticulos, setTodosLosArticulos] = useState<any[]>([]);

    const [categorias, setCategorias] = useState<ICategoria[]>([])

    const search = useAppSelector((state) => state.search.search)

    const idPagina = useAppSelector((state) => state.GlobalIdPaginador.idPaginador)

    //Esto es para normalizar los datos de IArticuloInsumo que traiga el Fetch, asi la tabla puede entender
    //distintos tipos de datos.

    const transformData = (manufacturadosData: IArticuloManufacturadoCategoria[]): IItem[] => {
        //@ts-ignore
        return manufacturadosData.map(manufacturado => ({
            id: manufacturado.id,
            denominacion: manufacturado.denominacion,
            param2: manufacturado.unidadMedida.denominacion,
            param3: manufacturado.precioVenta,
            param4: manufacturado.categoria.denominacion
        }));
    }

    useEffect(() => {
        dispatch(setIdPaginador(1))
    }, [search])

    useEffect(() => {
        const fetchManufacturado = async () => {

            if (selectedCategory !== 'Todos') {
                const url = search !== '' ? `categoria/getManufacturados/${idCategory}?searchString=${search}&limit=${ITEMS_POR_PAGINA}&startId=${idPagina}` : `categoria/getManufacturados/${idCategory}?limit=${ITEMS_POR_PAGINA}&startId=${idPagina}`;
                const manufacturados: IArticuloManufacturadoCategoria[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}${url}`, getAccessTokenSilently) as IArticuloManufacturadoCategoria[];
                const manufacturadosHabilitados: IArticuloManufacturadoCategoria[] = manufacturados.filter((articulo) => articulo.eliminado === borrados)
                const transformedData = transformData(manufacturadosHabilitados);
                setData(transformedData);
            }

            else {
                const url = search !== '' ? `ArticuloManufacturado/getArticulosManufacturados/${idSucursales}?limit=${ITEMS_POR_PAGINA}&startId=${idPagina}` : `ArticuloManufacturado/getArticulosManufacturados/${idSucursales}?limit=${ITEMS_POR_PAGINA}&startId=${idPagina}`;
                const manufacturados: IArticuloManufacturadoCategoria[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}${url}`, getAccessTokenSilently) as IArticuloManufacturadoCategoria[];
                const manufacturadosHabilitados: IArticuloManufacturadoCategoria[] = manufacturados.filter((articulo) => articulo.eliminado === borrados)
                const transformedData = transformData(manufacturadosHabilitados);
                setData(transformedData);
            }

            dispatch((setGlobalUpdated(false), setEsInsumo(false)))
            setLoading(true);
        }

        fetchManufacturado();
    }, [loading, updated, selectedCategory, borrados, search, idPagina])

    return (
        <>
            <BasePage
                title="Articulos manufacturados"
                data={data}
                loading={loading}
                row1="ID"
                row2="Denominación"
                row3="Unidad de medida"
                row4="Precio venta"
                row5="Categoría"
                endpoint="ArticuloManufacturado"
            />
        </>
    )

}

export default Manufacturados