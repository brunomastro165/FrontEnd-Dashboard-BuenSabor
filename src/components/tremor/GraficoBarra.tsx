//@ts-nocheck
import { BarChart } from '@tremor/react';
import { BackendClient } from '../../services/BackendClient';
import { IRol } from '../../types/Rol';
import { useEffect, useState } from 'react';
import { IArticuloInsumo } from '../../types/ArticuloInsumo';
import { IPromos } from '../../types/Promos';
import { IUsuario } from '../../types/Usuario';
import { IEmpresa } from '../../types/Empresa';
import { IArticuloManufacturado } from '../../types/SpecialDtos';
class GenericBackend extends BackendClient<T> { } //Métodos genéricos

const dataFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString();

export const GraficoBarra = () => {

  const backend = new GenericBackend(); //Objeto de BackendClient

  const [roles, setRoles] = useState<IRol[]>([]); 
  const [articulosInsumo, setArtInsumo] = useState<IArticuloInsumo[]>([]); 
  const [promos, setPromos] = useState<IPromos[]>([]);
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]); 
  const [artManufacturados, setArtManu] = useState<IArticuloManufacturado[]>([]); 
  const [empresa, setEmpresa] = useState<IEmpresa>();


  const getRoles = async () => {
    const res: IRol[] = await backend.getAll("https://backend-jsonserver-1.onrender.com/roles"); // Fetch de roles
    setRoles(res)
  }

  const getArtInsumo = async () => {
    const res: IArticuloInsumo[] = await backend.getAll("https://backend-jsonserver-1.onrender.com/articulosInsumos"); // Fetch de articulo insumo
    setArtInsumo(res)
  }

  const getPromos = async () => {
    const res: IPromos[] = await backend.getAll("https://backend-jsonserver-1.onrender.com/promociones"); // Fetch de promociones
    setPromos(res)
  }

  const getUsuarios = async () => {
    const res: IUsuario[] = await backend.getAll("https://backend-jsonserver-1.onrender.com/usuarios"); // Fetch de usuarios
    setUsuarios(res)
  }

  const getArtManufacturado = async () => {
    const res: IArticuloManufacturado[] = await backend.getAll("https://backend-jsonserver-1.onrender.com/articulosManufacturados"); // Fetch de articulo manufacturado
    setArtManu(res)
  }

  useEffect(() => {
    getRoles();
    getArtInsumo();
    getPromos();
    getUsuarios();
    getArtManufacturado();
  }, [])

  // Informacion dentro de Barras
  const data = [
     {
      name: 'Roles',
      'Elementos': roles.length,
     },
     {
      name: 'Insumos',
      'Elementos': articulosInsumo.length,
     },
     {
      name: 'Usuarios',
      'Elementos': usuarios.length,
     },
     {
      name: 'Manufacturados',
      'Elementos': artManufacturados.length,
     },
     {
      name: 'Promociones',
      'Elementos': promos.length,
     }
  ]

  return(
    <BarChart
    data={data}
    index="name"
    categories={['Elementos']}
    colors={['blue']}
    valueFormatter={dataFormatter}
    yAxisWidth={20}
    onValueChange={(v) => console.log(v)}
  />
  )
};