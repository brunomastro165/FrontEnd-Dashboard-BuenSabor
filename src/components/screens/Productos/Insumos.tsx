import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setGlobalInitialValues } from "../../../redux/slices/globalInitialValues";
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

    const initialValues = useAppSelector((state) => state.GlobalInitialValues.data);

    const updated = useAppSelector((state) => state.GlobalUpdated.updated)

    const dispatch = useAppDispatch();

    const transformData = (insumosData: IArticuloInsumo[]): IItem[] => {
        //@ts-ignore
        return insumosData.map(insumo => ({
            id: insumo.id,
            denominacion: insumo.denominacion,
            param2: insumo.precioVenta,
            param3: insumo.unidadMedida.denominacion,
            param4: insumo.stockActual,
        }));
    }

    // Uso de la función
    useEffect(() => {
        const fetchInsumo = async () => {
            const response = await fetchData("http://localhost:8081/ArticuloInsumo");
            const transformedData = transformData(response);
            setData(transformedData);
            setLoading(true);
        }
        fetchInsumo();
    }, [loading, updated])

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