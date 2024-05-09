//@ts-nocheck
import React, { useEffect, useState } from 'react'
import NavBar from '../../ui/NavBar/NavBar'
import { BackendClient } from '../../../services/BackendClient';
import { IPromos } from '../../../types/Promos';
import CardPromo from '../../ui/Cards/CardPromo';
import CPromos from '../../ui/CointainerCards/CPromos';
import SearchBar from '../../ui/SearchBar/SearchBar';
import { useAppSelector } from '../../../hooks/redux';
import { useParams } from 'react-router-dom';
import { IEmpresa } from '../../../types/Empresa';
import { ISucursal } from '../../../types/Sucursal';


class Backend extends BackendClient<T> { }

const Promociones = () => {

    const backend = new Backend();

    const [promos, setPromos] = useState<IPromos[] | undefined>([]);

    const [filteredPromos, setFilteredPromos] = useState<IPromos[] | undefined>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const { idEmpresa, idSucursales } = useParams();

    const getPromos = async () => {

        //Esto está hecho de maneria precaria debido a las limitaciones de JSON SERVER,
        // con un backend funcional se hará el endpoint correspondiente


        if (idEmpresa && idSucursales) {
            //Buscamos la empresa por el ID que nos traemos con useParams
            const idEmpresaString = idEmpresa.toString()
            const response: IEmpresa = await backend.get("http://localhost:8080/empresas", idEmpresaString)

            //Una vez dentro de la empresa, buscamos la sucursal seleccionada con useParams
            const idSucursalNumber = Number(idSucursales)
            const sucursal: ISucursal | undefined = response.sucursales.find((sucursal: ISucursal) => sucursal.id === idSucursalNumber)

            //Ahora buscamos las promociones dentro de la sucursal que fué seleccionada
            const promociones: IPromos[] | undefined = sucursal?.promociones;

            setPromos(promociones);

            setLoading(true);
        }
    }

    useEffect(() => {
        getPromos();
    }, [])

    const selector = useAppSelector((state) => state.search.search);

    useEffect(() => {
        const filteredPromosData = promos?.filter(d => d.denominacion.toLowerCase().includes(selector.toLowerCase()));
        setFilteredPromos(filteredPromosData);
    }, [selector, loading]);

    return (
        <>
            <NavBar title='Promociones' />
            <div className='mt-32'>
                <SearchBar />
                <div className=''>
                    <CPromos data={filteredPromos} />
                </div>

            </div>
        </>
    )
}

export default Promociones