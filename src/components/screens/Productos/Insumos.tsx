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
import { useAuth0 } from "@auth0/auth0-react";

const Insumos = () => {


    const { getAccessTokenSilently } = useAuth0();

    const backend = new BackendMethods()

    //ROUTER

    const { idSucursales } = useParams();

    //REDUX 

    const updated = useAppSelector((state) => state.GlobalUpdated.updated)

    const selectedCategory = useAppSelector((state) => state.GlobalCategory.selected)

    const dispatch = useAppDispatch();

    const esInsumo = useAppSelector((state) => state.GlobalEsInsumo.esInsumo)

    const borrados = useAppSelector((state) => state.GlobalBorrados.borrado)

    const categoriaSeleccionada = useAppSelector((state) => state.GlobalCategory.selected)

    const idCategoriaSeleccionada = useAppSelector((state) => state.GlobalCategory.id)

    const initialValues = useAppSelector((state) => state.GlobalInitialValues.data);


    const [loading, setLoading] = useState<boolean>(false);

    const [data, setData] = useState<IItem[]>([]);


    const transformData = (insumosData: IArticuloInsumoCategoria[]): IItem[] => {

        return insumosData.map(insumo => ({
            id: insumo.id,
            denominacion: insumo.denominacion,
            param2: insumo.precioVenta,
            param3: insumo.unidadMedida.denominacion,
            param4: insumo.categoria.denominacion,
            endpoint: ''
        }));

    }

    // const obtenerArticulos = (categoria: ICategoria | undefined): any[] => {
    //     if (categoria) {
    //         let articulos = Array.isArray(categoria?.insumos) ? [...categoria.insumos] : [];

    //         categoria.subCategorias.forEach(subCategoria => {
    //             const subCategoriaArticulos = obtenerArticulos(subCategoria);
    //             if (Array.isArray(subCategoriaArticulos)) {
    //                 articulos = [...articulos, ...subCategoriaArticulos];
    //             }
    //         });

    //         console.log(articulos)
    //         return articulos;
    //     }
    //     else {
    //         return [];
    //     }
    // }

    console.log(borrados)
    console.log(selectedCategory)

    useEffect(() => {
        const fetchInsumo = async () => {

            if (selectedCategory !== 'Todos') {
                //Usamos una función recursiva para traernos todos los articulos dentro de la categoria que seleccionamos
    const { getAccessTokenSilently } = useAuth0();
                const insumos: IArticuloInsumoCategoria[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}categoria/getInsumos/${idCategoriaSeleccionada}`, getAccessTokenSilently) as IArticuloInsumoCategoria[];

                //Filtramos por articulos eliminados (si lo igualamos a borrados, vamos a poder invertir la vista de los articulos eliminados)
                const insumosHabilitados: IArticuloInsumoCategoria[] = insumos.filter((articulo) => articulo.eliminado === borrados)
                const transformedData = transformData(insumosHabilitados);
                setData(transformedData);
            }
            else {
                const responseArticulos: IArticuloInsumoCategoria[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}sucursal/getInsumos/${idSucursales}`, getAccessTokenSilently) as IArticuloInsumoCategoria[];
                const insumosHabilitados: IArticuloInsumoCategoria[] = responseArticulos.filter((articulo) => articulo.eliminado === borrados)
                const transformedData = transformData(insumosHabilitados);
                setData(transformedData);
            }

            setLoading(true);
            dispatch((setGlobalUpdated(false), setEsInsumo(true)))
        }
        fetchInsumo();
    }, [loading, updated, selectedCategory, borrados])

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
                row5="Categoría"
                endpoint="ArticuloInsumo"
            />
        </>
    )
}

export default Insumos;