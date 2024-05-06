import { Card, SparkAreaChart } from '@tremor/react';
import { BackendClient } from '../../services/BackendClient';
import { FC, useEffect, useState } from 'react';
import { ISucursal } from '../../types/Sucursal';
import { IEmpresa } from '../../types/Empresa';
import { useParams } from 'react-router-dom';
class GenericBackend extends BackendClient<T> { } //Métodos genéricos

const backend = new GenericBackend();


interface ISucursalReducer {
  id: number,
  nombre: string,
}

const getRandom = () => {
  const NumRandom = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
  return NumRandom
}

const VentasSucGrafico: FC<ISucursalReducer> = ({ id, nombre }) => {

  const chartdata = [ // Informacion del grafico
    { 
      month: 'Jan 21',
      Performance: getRandom(),
    },
    {
      month: 'Feb 21',
      Performance: getRandom(),
    },
    {
      month: 'Mar 21',
      Performance: getRandom(),
    },
    {
      month: 'Apr 21',
      Performance: getRandom(),
    },
    {
      month: 'May 21',
      Performance: getRandom(),
    },
    {
      month: 'Jun 21',
      Performance: getRandom(),
    },
    {
      month: 'Jul 21',
      Performance: getRandom(),
    },
  ];


  return (

    <>

      <Card className="mx-auto flex max-w-lg items-center justify-between px-4 py-3.5 m-4" key={id}>
        <div className="flex items-center space-x-2.5">
          <p className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">{nombre}</p>
          <span className="text-tremor-default text-tremor-content dark:text-dark-tremor-content"></span>
        </div>
        <SparkAreaChart
          data={chartdata}
          categories={['Performance']}
          index={'month'}
          colors={['emerald']}
          className="h-8 w-20 sm:h-10 sm:w-36"
        />
        <div className="flex items-center space-x-2.5">
          <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">{getRandom()}</span>
          <span className="rounded bg-emerald-500 px-2 py-1 text-tremor-default font-medium text-white">
            +1.72%
          </span>
        </div>
      </Card>

    </>
  );
}

export default VentasSucGrafico