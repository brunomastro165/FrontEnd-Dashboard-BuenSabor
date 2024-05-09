//@ts-nocheck
import { useEffect, useState } from "react";
import { IEmpresa } from "../../../types/Empresa";
import { BackendClient } from "../../../services/BackendClient";
import NavBar from "../../ui/NavBar/NavBar";
import ContainerCards from "../../ui/CointainerCards/ContainerCards";
import { ISucursal } from "../../../types/Sucursal";
import { IPromos } from "../../../types/Promos";

class Backend extends BackendClient<T> { }

const Inicio = () => {

    const backend = new Backend();

    // JERARQUÍA DE DATOS

    //HARDCODE PARA PROBAR FUNCIONALIDADES

    const [empresas, setEmpresas] = useState<IEmpresa[]>([]);

    const [empresaSeleccionada, setEmpresaSeleccionada] = useState<IEmpresa>();

    const [sucursales, setSucursales] = useState<ISucursal>();

    const [promos, setPromos] = useState<IPromos[] | undefined>([])

    const [loaded, setLoaded] = useState<boolean>(false);

    const getEmpresas = async () => {
        const res: IEmpresa[] = await backend.getAll("https://backend-jsonserver-1.onrender.com/empresas");
        setEmpresas(res);
    }

    const traerGetters = async () => {
        getEmpresas();
        getEmpresaById();
        getSucursalesPorEmpresa();
        //    getCategoriasPorSucursal();
        //  getPromocionesPorSucursal();
        setLoaded(true);
    }

    const getEmpresaById = async () => {
        const res = empresas.find((empresa) => empresa.id === "1")
        setEmpresaSeleccionada(res)
    }

    const getSucursalesPorEmpresa = async () => {

        const res = empresaSeleccionada?.sucursales.find((sucursal) => sucursal.id === 1)
        setSucursales(res)
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
        setLoaded(false)
    }, [loaded])


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