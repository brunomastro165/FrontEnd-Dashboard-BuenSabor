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

//class Backend extends BackendClient<IArticuloManufacturadoCategoria> { }

const Manufacturados = () => {

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

    //Esto es para normalizar los datos de IArticuloInsumo que traiga el Fetch, asi la tabla puede entender
    //distintos tipos de datos.

    const transformData = (manufacturadosData: IArticuloManufacturadoCategoria[]): IItem[] => {
        //@ts-ignore
        return manufacturadosData.map(manufacturado => ({
            id: manufacturado.id,
            denominacion: manufacturado.denominacion,
            param2: manufacturado.unidadMedida.denominacion,
            param3: manufacturado.precioVenta,
            param4: manufacturado.stock
        }));
    }

    useEffect(() => {

        const fetchManufacturado = async () => {

            if (selectedCategory !== 'Todos') {
                const manufacturados: IArticuloManufacturadoCategoria[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}ArticuloManufacturado/getArticulosCategoria/${idCategory}`) as IArticuloManufacturadoCategoria[];
                const manufacturadosHabilitados: IArticuloManufacturadoCategoria[] = manufacturados.filter((articulo) => articulo.eliminado === borrados)
                const transformedData = transformData(manufacturadosHabilitados);
                setData(transformedData);
            }
            
            else {
                const manufacturados: IArticuloManufacturadoCategoria[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}ArticuloManufacturado/buscar/${idSucursales}`) as IArticuloManufacturadoCategoria[];
                const manufacturadosHabilitados: IArticuloManufacturadoCategoria[] = manufacturados.filter((articulo) => articulo.eliminado === borrados)
                const transformedData = transformData(manufacturadosHabilitados);
                setData(transformedData);
            }

            dispatch((setGlobalUpdated(false), setEsInsumo(false)))
            setLoading(true);
            console.log(esInsumo)
        }

        fetchManufacturado();
    }, [loading, updated, selectedCategory, borrados])

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
                row5="Stock"
                endpoint="ArticuloManufacturado"
            />
        </>
    )

}

export default Manufacturados