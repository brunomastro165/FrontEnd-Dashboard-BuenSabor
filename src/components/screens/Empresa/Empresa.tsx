import React, { useEffect, useState } from 'react'
import NavBar from '../../ui/NavBar/NavBar'
import { fetchData } from '../../api/Fetch'
import { IEmpresa } from '../../../types/Empresa';
import ContainerCards from '../../ui/CointainerCards/ContainerCards';
import { IItem } from '../../../types/Table/TableItem';
import BasePage from '../Productos/BasePage';

const Empresa = () => {

    const [loading, setLoading] = useState<boolean>(false);

    const [data, setData] = useState<IItem[]>([]);

    //Esto es para normalizar los datos de IArticuloInsumo que traiga el Fetch, asi la tabla puede entender
    //distintos tipos de datos.

    const transformData = (empresasData: IEmpresa[]): IItem[] => {
        return empresasData.map(empresa => ({
            id: empresa.id,
            denominacion: empresa.nombre,
            param2: empresa.cuil,
            param3: empresa.razonSocial,
            param4: ''
        }));
    }

    // Uso de la función
    useEffect(() => {
        const fetchInsumo = async () => {
            const response = await fetchData("http://localhost:8080/empresas");
            const transformedData = transformData(response);
            setData(transformedData);
            setLoading(true);
        }
        fetchInsumo();
    }, [loading])

    return (
        <>
            <BasePage
                title="Empresa"
                data={data}
                loading={loading}
                row1="ID"
                row2="Nombre de la empresa"
                row3="CUIL"
                row4="Razón social"
                row5=""
                endpoint='empresas'
            />
        </>
    )
}

export default Empresa