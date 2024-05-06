import React, { useEffect, useState } from 'react'
import { IItem } from '../../../types/Table/TableItem';
import BasePage from './BasePage';
import { fetchData } from '../../api/Fetch';
import { IArticuloManufacturado } from '../../../types/ArticuloManufacturado';
import { BackendClient } from '../../../services/BackendClient';
import { IEmpresa } from '../../../types/Empresa';
import { ISucursal } from '../../../types/Sucursal';
import { ICategoria } from '../../../types/Categoria';
import { useParams } from 'react-router-dom';

class Backend extends BackendClient<T> { }

const Manufacturados = () => {

    const backend = new Backend();

    const { idEmpresa, idSucursales } = useParams();

    const [loading, setLoading] = useState<boolean>(false);

    const [data, setData] = useState<IItem[]>([]);

    const [todosLosArticulos, setTodosLosArticulos] = useState<any[]>([]);

    //const [categorias, setCategorias] = useState<ICategoria[]>([])

    //Esto es para normalizar los datos de IArticuloInsumo que traiga el Fetch, asi la tabla puede entender
    //distintos tipos de datos.

    const transformData = (manufacturadosData: IArticuloManufacturado[]): IItem[] => {
        return manufacturadosData.map(manufacturado => ({
            id: manufacturado.id,
            denominacion: manufacturado.denominacion,
            param2: manufacturado.descripcion,
            param3: manufacturado.precioVenta,
            param4: manufacturado.tiempoEstimadoMinutos // CAMBIAR
        }));
    }

    //CODIGO RECURSIVO PARA TRAER TODOS LOS PRODUCTOS DE UNA SUCURSAL

    const obtenerArticulos = (categoria: ICategoria): any[] => {

        let articulos = [...categoria.articulos];

        categoria.subCategorias.forEach(subCategoria => {
            articulos = [...articulos, ...obtenerArticulos(subCategoria)];
        });

        return articulos;
    }

    useEffect(() => {
        const fetchManufacturado = async () => {

            //Esto está hecho de maneria precaria debido a las limitaciones de JSON SERVER,
            // con un backend funcional se hará el endpoint correspondiente

            if (idEmpresa && idSucursales) {

                //Buscamos la empresa por el ID que nos traemos con useParams
                const idEmpresaString = idEmpresa.toString()
                const response: IEmpresa = await backend.get("http://localhost:8080/empresas", idEmpresaString)

                //Una vez dentro de la empresa, buscamos la sucursal seleccionada con useParams
                const idSucursalNumber = Number(idSucursales)
                const sucursal: ISucursal | undefined = response.sucursales.find((sucursal: ISucursal) => sucursal.id === idSucursalNumber)

                //Ahora buscamos las categorías dentro de la sucursal que fué seleccionada
                const categorias: ICategoria[] | undefined = sucursal?.categorias

                //Llamada a la función obtener articulos, la cual nos retorna todos los articulosManufacturados dentro de todas las categorías
                const arCategorias: ICategoria[] | undefined = categorias;
                let articulos: IArticuloManufacturado[] = [];

                arCategorias?.forEach(categoria => {
                    articulos = [...articulos, ...obtenerArticulos(categoria)];
                });

                //Llamada a la función transformData, la cual nos retorna los datos de articuloManufacturado en un tipo de dato
                //compatible con la el componente Table
                const transformedData = transformData(articulos);
                setData(transformedData);

                setLoading(true);
            }
        }
        fetchManufacturado();
    }, [loading])

    return (
        <>
            <BasePage
                title="Articulos manufacturados"
                data={data}
                loading={loading}
                row1="ID"
                row2="Denominación"
                row3="Descripción"
                row4="Precio venta"
                row5="Stock"
                endpoint="articulosManufacturados"
            />
        </>
    )

}

export default Manufacturados