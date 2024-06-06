import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import SideBar from '../ui/SideBar/SideBar'
import Table from '../ui/Table/Table'
import Productos from '../screens/Productos/Manufacturados'
import NavBar from '../ui/NavBar/NavBar'
import Promociones from '../screens/Promociones/Promociones'
import Empresa from '../screens/Empresa/Empresa'
import Usuario from '../screens/Usuario/Usuario'
import Home from '../screens/Home/Home'
import Manufacturados from '../screens/Productos/Manufacturados'
import Insumos from '../screens/Productos/Insumos'
import Categorias from '../screens/Categorias/Categorias'
import UsuariosPorRol from '../screens/Usuario/UsuariosPorRol'
import EmpresaV2 from '../screens/Empresa/EmpresaV2'
import SucursalPorEmpresa from '../screens/Empresa/SucursalesPorEmpresa'
import ProductosPorPromociones from '../screens/Promociones/ProductosPorPromociones'
import Inicio from '../screens/Inicio/Inicio'
import Sucursal from '../screens/Sucursal/Sucursal'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import UnidadesMedida from '../screens/UnidadesDeMedida/UnidadesDeMedida'
import { setLogged } from '../../redux/slices/logged'
import Pedidos from '../screens/Pedidos/Pedidos'

const AppRouter = () => {


    const selector = useAppSelector((state) => state.logged.logged);

    const dispatch = useAppDispatch()

    const [show, setShow] = useState<boolean>(false);

    const baseUrl = "/:idEmpresa/sucursales/:idSucursales"

    return (
        <>
            <div className='flex flex-row'>
                {selector && <SideBar />}
                <div className={`${selector && 'md:ml-72'} w-full`}>
                    <Routes>
                        <Route path='/' element={<Inicio />}></Route>
                        <Route path='/:idEmpresa/sucursales/' element={<Sucursal />}></Route> {/*SUCURSALES */}
                        <Route path='/sucursal' element={<Inicio />}></Route>
                        <Route path='/:idEmpresa/sucursales/:idSucursales/home' element={<Home />}></Route>
                        <Route path='/:idEmpresa/sucursales/:idSucursales/manufacturados' element={<Manufacturados />} />
                        <Route path='/:idEmpresa/sucursales/:idSucursales/insumos' element={<Insumos />} />
                        <Route path='/:idEmpresa/sucursales/:idSucursales/promociones' element={<Promociones />} />
                        <Route path='/:idEmpresa/sucursales/:idSucursales/promociones/:idPromocion' element={<ProductosPorPromociones />} />
                        {/* <Route path='/empresa' element={<Empresa />} /> */}
                        <Route path='/:idEmpresa/sucursales/:idSucursales/usuarios' element={<Usuario />} />
                        <Route path="/:idEmpresa/sucursales/:idSucursales/usuarios/:id" element={<UsuariosPorRol />} />
                        <Route path='/:idEmpresa/sucursales/:idSucursales/categorias' element={<Categorias />} />
                        <Route path='/:idEmpresa/sucursales' element={<Sucursal />} />
                        <Route path='/:idEmpresa/sucursales/:idSucursales/empresas/:id' element={<SucursalPorEmpresa />} />
                        <Route path='/:idEmpresa/sucursales/:idSucursales/unidadesDeMedida' element={<UnidadesMedida />} />
                        <Route path='/:idEmpresa/sucursales/:idSucursales/pedidos' element={<Pedidos />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default AppRouter