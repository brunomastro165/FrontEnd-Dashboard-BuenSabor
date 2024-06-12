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
import { setIdPaginador } from "../../../redux/slices/idPaginador";


const ITEMS_POR_PAGINA = 1;

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

    const search = useAppSelector((state) => state.search.search);



    const [filteredData, setFilteredData] = useState<IArticuloInsumoCategoria[]>([]);

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
        dispatch(setIdPaginador(1))
    }, [search])


    const idPagina = useAppSelector((state) => state.GlobalIdPaginador.idPaginador);

    console.log(search)
    useEffect(() => {
        const fetchInsumo = async () => {

            if (selectedCategory !== 'Todos') {
                //Usamos una función recursiva para traernos todos los articulos dentro de la categoria que seleccionamos
                'http://localhost:8080/categoria/getInsumos/1/se?limit=1&startId=1'
                const insumos: IArticuloInsumoCategoria[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}categoria/getInsumos/${idCategoriaSeleccionada}/${search}?limit=${ITEMS_POR_PAGINA}&startId=${idPagina}`, getAccessTokenSilently) as IArticuloInsumoCategoria[];
                console.log("SEX")
                console.log(insumos)
                //Filtramos por articulos eliminados (si lo igualamos a borrados, vamos a poder invertir la vista de los articulos eliminados)
                const insumosHabilitados: IArticuloInsumoCategoria[] = insumos.filter((articulo) => articulo.eliminado === borrados)
                const transformedData = transformData(insumosHabilitados);
                setData(transformedData);
            }
            else {
                try {
                    const responsePaginada: IArticuloInsumoCategoria[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}ArticuloInsumo/getArticulosInsumos/${search}/${idSucursales}?limit=${ITEMS_POR_PAGINA}&startId=${idPagina}`, getAccessTokenSilently) as IArticuloInsumoCategoria[];
                    const insumosHabilitados: IArticuloInsumoCategoria[] = responsePaginada.filter((articulo) => articulo.eliminado === borrados)
                    const transformedData = transformData(insumosHabilitados);
                    setData(transformedData);
                }
                catch (error) {
                    console.log(error)
                }
            }

            setLoading(true);
            dispatch((setGlobalUpdated(false), setEsInsumo(true)))
        }
        fetchInsumo();
    }, [loading, updated, selectedCategory, borrados, search, idPagina])
    console.log(idPagina)

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