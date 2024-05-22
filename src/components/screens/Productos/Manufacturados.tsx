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

//class Backend extends BackendClient<IArticuloManufacturadoCategoria> { }

const Manufacturados = () => {

    const backend = new BackendMethods();

    //ROUTER 

    const { idEmpresa, idSucursales } = useParams();

    //REDUX

    const selectedCategory = useAppSelector((state) => state.GlobalCategory.selected)

    const initialValues = useAppSelector((state) => state.GlobalInitialValues.data);

    const updated = useAppSelector((state) => state.GlobalUpdated.updated);

    const dispatch = useAppDispatch();


    const [loading, setLoading] = useState<boolean>(false);

    const [data, setData] = useState<IItem[]>([]);

    const [todosLosArticulos, setTodosLosArticulos] = useState<any[]>([]);

    const [categorias, setCategorias] = useState<ICategoria[]>([])



    //const [categorias, setCategorias] = useState<ICategoria[]>([])

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

    //CODIGO RECURSIVO PARA TRAER TODOS LOS PRODUCTOS DE UNA SUCURSAL

    const obtenerArticulos = (categoria: ICategoria | undefined): any[] => {

        if (categoria) {
            let articulos = [...categoria.articulosManufacturados];

            categoria.subCategorias.forEach(subCategoria => {
                articulos = [...articulos, ...obtenerArticulos(subCategoria)];
            });

            return articulos;
        }
        else {
            return [];
        }

    }

    useEffect(() => {
        const fetchManufacturado = async () => {

            // const response: IArticuloManufacturadoCategoria[] = await backend.getAll("http://localhost:8081/ArticuloManufacturado/noEliminados") as IArticuloManufacturadoCategoria[];

            //Esto está hecho precariamente en el front, en realidad debería ser un endpoint que cumpla estas condiciones, pero por lo pronto, funciona

            //Traemos las categorias de una sucursal
            const responseCategoria: ICategoria[] = await backend.getAll(`http://localhost:8081/sucursal/getCategorias/${idSucursales}`) as ICategoria[];

            //Filtramos la categoria que está seleccionada en el selector (con redux)
            const categoriaFiltrada: ICategoria | undefined = responseCategoria.find((categoria) => categoria.denominacion === selectedCategory)

            //Usamos una función recursiva para traernos todos los articulos dentro de la categoria que seleccionamos
            const manufacturados: IArticuloManufacturadoCategoria[] = obtenerArticulos(categoriaFiltrada);

            console.log(manufacturados)

            //Filtramos por articulos eliminados
            const manufacturadosHabilitados: IArticuloManufacturadoCategoria[] = manufacturados.filter((articulo) => articulo.eliminado === false)

            const filteredByCategoria = manufacturadosHabilitados.filter((articulo) => articulo.categoria?.denominacion === selectedCategory)

            const transformedData = transformData(filteredByCategoria);


            setData(transformedData);
            setLoading(true);
            dispatch(setGlobalUpdated(false))
        }

        fetchManufacturado();
    }, [loading, updated, selectedCategory])


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