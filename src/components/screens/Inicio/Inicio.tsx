import { useEffect, useState } from "react";
import { IEmpresa } from "../../../types/Empresa";
import { BackendClient } from "../../../services/BackendClient";
import NavBar from "../../ui/NavBar/NavBar";
import ContainerCards from "../../ui/CointainerCards/ContainerCards";
import { ISucursal } from "../../../types/Sucursal";
import { IPromos } from "../../../types/Promos";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setGlobalUpdated } from "../../../redux/slices/globalUpdate";

//@ts-ignore
class Backend extends BackendClient<T> { }

const Inicio = () => {

    const backend = new Backend();

    // JERARQUÍA DE DATOS

    //HARDCODE PARA PROBAR FUNCIONALIDADES

    const [empresas, setEmpresas] = useState<IEmpresa[]>([]);

    // const [empresaSeleccionada, setEmpresaSeleccionada] = useState<IEmpresa>();

    // const [sucursales, setSucursales] = useState<ISucursal>();

    // const [promos, setPromos] = useState<IPromos[] | undefined>([])

    const [loaded, setLoaded] = useState<boolean>(false);

    const updated = useAppSelector((state) => state.GlobalUpdated.updated);

    const dispatch = useAppDispatch();

    const getEmpresas = async () => {
        const res: IEmpresa[] = await backend.getAll("http://localhost:8081/empresa");
        setEmpresas(res);
    }

    const traerGetters = async () => {
        getEmpresas();
        // getEmpresaById();
        // getSucursalesPorEmpresa();
        //    getCategoriasPorSucursal();
        //  getPromocionesPorSucursal();
        setLoaded(true);
    }


    // CODIGO RECURSIVO PARA TRAER TODOS LOS PRODUCTOS DE UNA SUCURSAL

    // const obtenerArticulos = (categoria: ICategoria): any[] => {
    //     let articulos = [...categoria.articulos];

    //     categoria.subCategorias.forEach(subCategoria => {
    //         articulos = [...articulos, ...obtenerArticulos(subCategoria)];
    //     });

    //     return articulos;
    // }

    // const [todosLosArticulos, setTodosLosArticulos] = useState<any[]>([]);

    // useEffect(() => {
    //     const arCategorias: ICategoria[] | undefined = categorias;
    //     let articulos: IArticuloManufacturado[] = [];

    //     arCategorias?.forEach(categoria => {
    //         articulos = [...articulos, ...obtenerArticulos(categoria)];
    //     });

    //     setTodosLosArticulos(articulos);

    // }, [loaded]);

    useEffect(() => {
        traerGetters();
        console.log("hostia joder hostia")
        setLoaded(false)
        dispatch(setGlobalUpdated(false));
    }, [loaded, updated])


    return (
        <>
            <NavBar title='Empresas' />
            <div className='mt-24'>
                <ContainerCards data={empresas} />
            </div>
        </>
    )
}

export default Inicio