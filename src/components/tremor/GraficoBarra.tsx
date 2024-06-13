import { BarChart } from '@tremor/react';
import { BackendClient } from '../../services/BackendClient';
import { IRol } from '../../types/Rol';
import { useEffect, useState } from 'react';
import { IArticuloInsumo } from '../../types/ArticuloInsumo';
import { IPromos } from '../../types/Promos';
import { IUsuario } from '../../types/Usuario';
import { IEmpresa } from '../../types/Empresa';
import { useAuth0 } from '@auth0/auth0-react';
import useRankingArticulos from '../../hooks/useRankingArticulos';


export const GraficoBarra = () => {
  const [inicio, setInicio] = useState<string>('2024-01-01');
  const [fin, setFin] = useState<string>('2030-11-12');
  const [errorFecha, setErrorFecha] = useState<string>('');

  const { data, loading, error, fetchRankingArticulos } = useRankingArticulos({
    fechaInicio: inicio,
    fechaFin: fin,
  });

  useEffect(() => {
    fetchRankingArticulos();
  }, [inicio, fin]);

  const transformData = (response: [string, number][]) => {
    return response.map(([name, value]) => ({
      name,
      Elementos: value
    }));
  };

  //@ts-ignore
  const chartData = data ? transformData(data) : [];

  // Función para validar fechas
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='w-full'>
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

      <BarChart
        data={chartData}
        index="name"
        categories={['Elementos']}
        colors={['blue']}
        yAxisWidth={20}
        onValueChange={(v) => console.log(v)}
      />
    </div>
  );
};
