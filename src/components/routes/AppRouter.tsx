import React from 'react'
import { Route, Routes } from 'react-router-dom'
import A from '../screens/A'
import SideBar from '../ui/SideBar/SideBar'
import Table from '../ui/Table/Table'
import Productos from '../screens/Productos/Productos'
import NavBar from '../ui/NavBar/NavBar'
import Promociones from '../screens/Promociones/Promociones'
import Empresa from '../screens/Empresa/Empresa'
import Usuario from '../screens/Usuario/Usuario'
import Home from '../screens/Home/Home'

const AppRouter = () => {

    return (
        <>
            <div className='flex flex-row'>
                <SideBar />
                <div className='ml-72 w-full'>
                    <Routes>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/productos' element={<Productos />} />
                        <Route path='/promociones' element={<Promociones />} />
                        <Route path='/empresa' element={<Empresa />} />
                        <Route path='/usuarios' element={<Usuario />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default AppRouter