import React, { useEffect, useState } from 'react'
import NavBar from '../../ui/NavBar/NavBar'
import { BackendClient } from '../../../services/BackendClient';
import { IPromos } from '../../../types/Promos';
import CardPromo from '../../ui/Cards/CardPromo';
import CPromos from '../../ui/CointainerCards/CPromos';
import SearchBar from '../../ui/SearchBar/SearchBar';
import { useAppSelector } from '../../../hooks/redux';


class Backend extends BackendClient<T> { }

const Promociones = () => {

    const backend = new Backend();

    const [promos, setPromos] = useState<IPromos[]>([]);

    const [filteredPromos, setFilteredPromos] = useState<IPromos[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const getPromos = async () => {
        const res: IPromos[] = await backend.getAll("http://localhost:8080/promociones");
        setPromos(res);
        setLoading(true)
    }

    useEffect(() => {
        getPromos();
    }, [])


    const selector = useAppSelector((state) => state.search.search);

    useEffect(() => {
        const filteredPromosData = promos.filter(d => d.denominacion.toLowerCase().includes(selector.toLowerCase()));
        setFilteredPromos(filteredPromosData);
    }, [selector, loading]);


    return (
        <>
            <NavBar title='Promociones' />
            <div className='mt-48'>
                <SearchBar />
                <div className='mt-24'>
                    <CPromos data={filteredPromos} />
                </div>

            </div>
        </>
    )
}

export default Promociones