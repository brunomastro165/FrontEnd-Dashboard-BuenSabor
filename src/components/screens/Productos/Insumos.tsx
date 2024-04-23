import { IItem } from "../../../types/Table/TableItem";
import { fetchData } from "../../api/Fetch";
import BasePage from "./BasePage";
import { useEffect, useState } from "react";

const Insumos = () => {

    const [loading, setLoading] = useState<boolean>(false);

    const [data, setData] = useState<IItem[]>([]);

    useEffect(() => {
        const fetchInsumo = async () => {
            const response = await fetchData("/data/data.json");
            setData(response);
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
            />
        </>
    )
}

export default Insumos;