import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react'
import { BackendMethods } from '../../../services/BackendClient';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IPedido } from '../../../types/Pedido';
import { IItem } from '../../../types/Table/TableItem';
import { setIdPaginador } from '../../../redux/slices/idPaginador';
import BasePage from '../Productos/BasePage';
import { setGlobalUpdated } from '../../../redux/slices/globalUpdate';

const PedidosCajero = () => {

    const { getAccessTokenSilently } = useAuth0();

    const backend = new BackendMethods()

    //ROUTER

    const { idSucursales } = useParams();

    //REDUX 

    const updated = useAppSelector((state) => state.GlobalUpdated.updated)

    const dispatch = useAppDispatch();

    const [filteredData, setFilteredData] = useState<IPedido[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const [data, setData] = useState<IItem[]>([]);

    const today = new Date();

    const prevWeek = new Date();
    prevWeek.setDate(today.getDate() - 7)
    const prevWeekString = prevWeek.toISOString().split('T')[0]

    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    const nextWeekString = nextWeek.toISOString().split('T')[0];

    const [inicio, setInicio] = useState<string>(prevWeekString);

    const [fin, setFin] = useState<string>(nextWeekString);

    const [errorFecha, setErrorFecha] = useState<string>('')

    const validarFechas = (fechaInicio: string, fechaFin: string) => {
        if (fechaInicio > fechaFin) {
            setErrorFecha('La fecha de inicio no puede ser mayor que la fecha de fin');
            return false;
        }
        setErrorFecha('');
        return true;
    };

    const handleInicioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nuevaFechaInicio = e.target.value;
        if (validarFechas(nuevaFechaInicio, fin)) {
            setInicio(nuevaFechaInicio);
        }
    };

    const handleFinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nuevaFechaFin = e.target.value;
        if (validarFechas(inicio, nuevaFechaFin)) {
            setFin(nuevaFechaFin);
        }
    };


    const transformData = (insumosData: IPedido[]): IItem[] => {
        return insumosData.map(pedido => ({
            id: pedido.id,
            denominacion: pedido.estado,
            param2: pedido.formaPago,
            param3: pedido.empleado,
            param4: pedido.domicilio.calle,
            endpoint: ''
        }));
    }

    useEffect(() => {
        dispatch(setIdPaginador(1))
    }, [])

    const idPagina = useAppSelector((state) => state.GlobalIdPaginador.idPaginador);

    useEffect(() => {
        const fetchPedidos = async () => {
            setLoading(true);
            const res: IPedido[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}pedido/getPorFecha/${idSucursales}?fechaInicio=${inicio}&fechaFin=${fin}`, getAccessTokenSilently) as IPedido[]
            const data = transformData(res);
            setData(data);
            dispatch((setGlobalUpdated(false)))
        }
        fetchPedidos();
    }, [loading, updated, idPagina, inicio, fin])

    useEffect(() => {
        const handleFocus = () => {

        };

        window.addEventListener('DOMContentLoaded', handleFocus);

        // Limpiar el evento al desmontar el componente
        return () => {
            window.removeEventListener('DOMContentLoaded', handleFocus);
        };
    }, []);

    return (
        <>
            <div className='flex flex-row space-x-4 fixed translate-y-32 p-5'>
                <input
                    type="date"
                    className='border rounded cursor-pointer '
                    value={inicio}
                    onChange={handleInicioChange}
                />
                <input
                    type="date"
                    className='border rounded cursor-pointer'
                    value={fin}
                    onChange={handleFinChange}
                />
            </div>
            <BasePage
                title="Administración de pedidos"
                data={data}
                loading={loading}
                row1="ID"
                row2="Estado"
                row3="Forma pago"
                row4="Empleado"
                row5="Calle"
                endpoint="pedido"
            />
        </>
    )
}

export default PedidosCajero