import React from 'react'
import { Route, Routes } from 'react-router-dom'
import A from '../screens/A'
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
import Generales from '../screens/Productos/Generales'
import Categorias from '../screens/Categorias/Categorias'
import UsuariosPorRol from '../screens/Usuario/UsuariosPorRol'
import EmpresaV2 from '../screens/Empresa/EmpresaV2'
import SucursalPorEmpresa from '../screens/Empresa/SucursalesPorEmpresa'
import ProductosPorPromociones from '../screens/Promociones/ProductosPorPromociones'

const AppRouter = () => {

    return (
        <>
            <div className='flex flex-row'>
                <SideBar />
                <div className='md:ml-72 w-full'>
                    <Routes>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/manufacturados' element={<Manufacturados />} />
                        <Route path='/insumos' element={<Insumos />} />
                        <Route path='/promociones' element={<Promociones />} />
                        {/* <Route path='/empresa' element={<Empresa />} /> */}
                        <Route path='/usuarios' element={<Usuario />} />
                        <Route path="/usuarios/:id" element={<UsuariosPorRol />} />
                        <Route path='/categorias' element={<Categorias />} />
                        <Route path='/empresas' element={<EmpresaV2 />} />
                        <Route path='/empresas/:id' element={<SucursalPorEmpresa />} />
                        <Route path='/promociones/:id' element={<ProductosPorPromociones />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default AppRouter