import { Card, SparkAreaChart } from '@tremor/react';
import { BackendClient } from '../../services/BackendClient';
import { FC, useEffect, useState } from 'react';
import { ISucursal } from '../../types/Sucursal';
import { IEmpresa } from '../../types/Empresa';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { number } from 'yup';
class GenericBackend extends BackendClient<T> { } //Métodos genéricos

const backend = new GenericBackend();

const VentasSucGrafico = () => {

  const [inicio, setInicio] = useState<string>('2024-01-01');

  const [fin, setFin] = useState<string>('2030-11-12');

  const [data, setData] = useState<number>(0)

  const [errorFecha, setErrorFecha] = useState<string>('');

  const { getAccessTokenSilently } = useAuth0();

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
    const fetchRankingArticulos = async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          },
        });
        const response = await fetch(`${import.meta.env.VITE_LOCAL}pedido/ganancia?fechaInicio=${inicio}&fechaFin=2${fin}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.log(error)
      } finally {

      }
    };
    fetchRankingArticulos();
  }, [])


  console.log(data)
  return (

    <>

      <Card className="mx-auto flex max-w-lg items-center justify-between px-4 py-3.5 m-4" >
        <div className="flex items-center space-x-2.5">
          <p className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">{ }</p>
          <span className="text-tremor-default text-tremor-content dark:text-dark-tremor-content"></span>
        </div>
        <SparkAreaChart
          data={5000 as any}
          categories={['Performance']}
          index={'month'}
          colors={['emerald']}
          className="h-8 w-20 sm:h-10 sm:w-36"
        />
        <div className="flex items-center space-x-2.5">
          <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">{ }</span>
          <span className="rounded bg-emerald-500 px-2 py-1 text-tremor-default font-medium text-white">
            +1.72%
          </span>
        </div>
      </Card>

    </>
  );
}

export default VentasSucGrafico