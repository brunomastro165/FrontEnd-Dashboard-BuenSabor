import { Card, SparkAreaChart } from '@tremor/react';
import { BackendClient, BackendMethods } from '../../services/BackendClient';
import { FC, useEffect, useState } from 'react';
import { ISucursal } from '../../types/Sucursal';
import { IEmpresa } from '../../types/Empresa';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { number } from 'yup';
import { errorGenerico } from '../toasts/ToastAlerts';


const backend = new BackendMethods();

const VentasSucGrafico = () => {

  const [inicio, setInicio] = useState<string>('2024-01-01');

  const [fin, setFin] = useState<string>('2030-11-12');

  const [data, setData] = useState<number>(0)

  const [errorFecha, setErrorFecha] = useState<string>('');

  const { getAccessTokenSilently } = useAuth0();

  const { idSucursales } = useParams();

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

  useEffect(() => {
    const traerGanancias = async () => {
      try {
        const res: number = await backend.getAll(`${import.meta.env.VITE_LOCAL}pedido/ganancia/${1}?fechaInicio=${inicio}&fechaFin=${fin}`, getAccessTokenSilently) as unknown as number
        setData(res);
      } catch (error) {
        console.error(error)
        errorGenerico("Ocurrrió un error al traer las ganancia")
      }
    }
    traerGanancias();
  }, [inicio, fin])

  return (
    <>
      <div className='flex flex-row space-x-4'>
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

      {errorFecha && <div className="text-red-500">{errorFecha}</div>}
      <Card className="mx-auto flex max-w-lg items-center justify-between px-4 py-3.5 m-4">
        <div className="flex items-center space-x-2.5">
          <p className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
            Ganancias de la sucursal:
          </p>

        </div>

        <div className="flex items-center space-x-2.5">
          <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            {data}$
          </span>

          {data >= 1 ? (<span className="rounded bg-emerald-500 px-2 py-1 text-tremor-default font-medium text-white">
            Estamos en ganancias
          </span>) : (<span className="rounded bg-red-500 px-2 py-1 text-tremor-default font-medium text-white">
            Estamos en pérdidas
          </span>)}

        </div>
      </Card>
    </>

  );
}

export default VentasSucGrafico