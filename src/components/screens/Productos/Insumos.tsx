
//@ts-nocheck
import { IArticuloInsumo } from "../../../types/ArticuloInsumo";
import { IItem } from "../../../types/Table/TableItem";

import { fetchData } from "../../api/Fetch";
import BasePage from "./BasePage";
import { useEffect, useState } from "react";

const Insumos = () => {

    const [loading, setLoading] = useState<boolean>(false);

    const [data, setData] = useState<IItem[]>([]);

    //Esto es para normalizar los datos de IArticuloInsumo que traiga el Fetch, asi la tabla puede entender
    //distintos tipos de datos.

    const transformData = (insumosData: IArticuloInsumo[]): IItem[] => {
        return insumosData.map(insumo => ({
            id: insumo.id,
            denominacion: insumo.denominacion,
            param2: insumo.precioVenta,
            param3: insumo.precioCompra,
            param4: insumo.stockActual,
        }));
    }

    // Uso de la función
    useEffect(() => {
        const fetchInsumo = async () => {
            const response = await fetchData("https://backend-jsonserver-1.onrender.com/articulosInsumos");
            const transformedData = transformData(response);
            setData(transformedData);
            setLoading(true);
        }
        fetchInsumo();
    }, [loading])

    return (
        <>
            <BasePage
                title="Articulos insumo"
                data={data}
                loading={loading}
                row1="ID"
                row2="Denominación"
                row3="Precio venta"
                row4="Precio compra"
                row5="Stock"
                endpoint="articulosInsumos"
            />
        </>
    )
}

export default Insumos;