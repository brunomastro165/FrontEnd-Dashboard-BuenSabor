import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setGlobalInitialValues } from "../../../redux/slices/globalInitialValues";
import { IArticuloInsumo } from "../../../types/ArticuloInsumo";
import { IItem } from "../../../types/Table/TableItem";
import { fetchData } from "../../api/Fetch";
import BasePage from "./BasePage";
import { useEffect, useState } from "react";
import { ICategoria } from "../../../types/Categoria";
import { BackendMethods } from "../../../services/BackendClient";
import { IArticuloInsumoCategoria } from "../../../types/SpecialDtos/ArticuloInsumoCategoria";
import { setGlobalUpdated } from "../../../redux/slices/globalUpdate";
import { setEsInsumo } from "../../../redux/slices/esInsumo";

const Insumos = () => {

    const backend = new BackendMethods()

    //ROUTER

    const { idSucursales } = useParams();

    //REDUX 

    const updated = useAppSelector((state) => state.GlobalUpdated.updated)

    const selectedCategory = useAppSelector((state) => state.GlobalCategory.selected)

    const dispatch = useAppDispatch();

    const esInsumo = useAppSelector((state) => state.GlobalEsInsumo.esInsumo)


    const [loading, setLoading] = useState<boolean>(false);

    const [data, setData] = useState<IItem[]>([]);

    //Esto es para normalizar los datos de IArticuloInsumo que traiga el Fetch, asi la tabla puede entender
    //distintos tipos de datos.

    const categoriaSeleccionada = useAppSelector((state) => state.GlobalCategory.selected)

    const initialValues = useAppSelector((state) => state.GlobalInitialValues.data);


    const transformData = (insumosData: IArticuloInsumoCategoria[]): IItem[] => {

        return insumosData.map(insumo => ({
            id: insumo.id,
            denominacion: insumo.denominacion,
            param2: insumo.precioVenta,
            param3: insumo.unidadMedida.denominacion,
            param4: insumo.stockActual,
            endpoint: ''
        }));

    }

    const obtenerArticulos = (categoria: ICategoria | undefined): any[] => {
        if (categoria) {
            let articulos = Array.isArray(categoria?.insumos) ? [...categoria.insumos] : [];

            categoria.subCategorias.forEach(subCategoria => {
                const subCategoriaArticulos = obtenerArticulos(subCategoria);
                if (Array.isArray(subCategoriaArticulos)) {
                    articulos = [...articulos, ...subCategoriaArticulos];
                }
            });

            console.log(articulos)
            return articulos;
        }
        else {
            return [];
        }
    }

    useEffect(() => {
        const fetchInsumo = async () => {

            // const response: IArticuloManufacturadoCategoria[] = await backend.getAll("http://localhost:8081/ArticuloManufacturado/noEliminados") as IArticuloManufacturadoCategoria[];

            //Esto está hecho precariamente en el front, en realidad debería ser un endpoint que cumpla estas condiciones, pero por lo pronto, funciona

            //Traemos las categorias de una sucursal$x
            const responseCategoria: ICategoria[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}sucursal/getCategorias/${idSucursales}`) as ICategoria[];

            //Filtramos la categoria que está seleccionada en el selector (con redux)
            const categoriaFiltrada: ICategoria | undefined = responseCategoria.find((categoria) => categoria.denominacion === selectedCategory)

            //Usamos una función recursiva para traernos todos los articulos dentro de la categoria que seleccionamos
            const insumos: IArticuloInsumoCategoria[] = obtenerArticulos(categoriaFiltrada);

            //Filtramos por articulos eliminados
            const insumosHabilitados: IArticuloInsumoCategoria[] = insumos.filter((articulo) => articulo.eliminado === false)

            const filteredByCategoria = insumosHabilitados.filter((articulo) => articulo.categoria?.denominacion === selectedCategory)

            const transformedData = transformData(filteredByCategoria);

            setData(transformedData);
            setLoading(true);
            dispatch((setGlobalUpdated(false), setEsInsumo(true)))

        }

        fetchInsumo();
    }, [loading, updated, selectedCategory])

    // Uso de la función
    // useEffect(() => {
    //     const fetchInsumo = async () => {
    //         const response = await fetchData("http://localhost:8081/ArticuloInsumo/noEliminados");
    //         const transformedData = transformData(response);
    //         setData(transformedData);
    //         setLoading(true);
    //     }
    //     fetchInsumo();
    // }, [loading, updated, categoriaSeleccionada])


    useEffect(() => {

        const handleFocus = () => {

        };

        window.addEventListener('DOMContentLoaded', handleFocus);

        // Limpiar el evento al desmontar el componente
        return () => {
            window.removeEventListener('DOMContentLoaded', handleFocus);
        };
    }, [esInsumo]);

    return (
        <>
            <BasePage
                title="Articulos insumo"
                data={data}
                loading={loading}
                row1="ID"
                row2="Denominación"
                row3="Precio venta"
                row4="Unidad de medida"
                row5="Stock"
                endpoint="ArticuloInsumo"
            />
        </>
    )
}

export default Insumos;