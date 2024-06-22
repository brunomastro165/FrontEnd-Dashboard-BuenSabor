import React, { useEffect } from 'react'
import LoginButton from '../../auth0/LogIn/LoginButton'
import LogoutButton from '../../auth0/LogIn/LogoutButton'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import GlobalEmpleado from '../../../redux/slices/empleadoCompleto'
import { setLogged } from '../../../redux/slices/logged'
import { useNavigate } from 'react-router-dom'

const LogInScreen = () => {


    const rol = useAppSelector((state) => state.GlobalRol.rol)

    const empleado = useAppSelector((state) => state.GlobalEmpleado.empleado)

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    console.log(empleado)

    // useEffect(() => {
    //     if (empleado.email !== '') {
    //         //@ts-ignore
    //         const idEmpresa = empledo.sucursal.empresa.id;
    //         const idSucursal = empleado.sucursal.id
    //         switch (empleado.tipoEmpleado) {
    //             case 'CAJERO':
    //                 dispatch(setLogged(true))
    //                 navigate(`/${idEmpresa}/sucursales/${idSucursal}/home`);
    //                 break;
    //             case 'COCINERO':
    //                 dispatch(setLogged(true))
    //                 navigate(`/${idEmpresa}/sucursales/${idSucursal}/home`);
    //                 break;
    //             case 'DELIVERY':
    //                 dispatch(setLogged(true))
    //                 navigate(`/${idEmpresa}/sucursales/${idSucursal}/home`);
    //                 break;
    //             case 'ADMIN':
    //                 dispatch(setLogged(true))
    //                 navigate(`/${idEmpresa}/sucursales/${idSucursal}/home`);
    //                 break;
    //             case 'SUPERADMIN':
    //                 dispatch(setLogged(true))
    //                 navigate(`/`);
    //                 break;
    //             default:
    //                 navigate('/');
    //                 break;
    //         }
    //     }
    //     // else {
    //     //     switch (rol) {
    //     //         case 'CAJERO':
    //     //             dispatch(setLogged(true))
    //     //             navigate(`/notLogged`);
    //     //             break;
    //     //         case 'COCINERO':
    //     //             dispatch(setLogged(true))
    //     //             navigate(`/notLogged`);
    //     //             break;
    //     //         case 'DELIVERY':
    //     //             dispatch(setLogged(true))
    //     //             navigate(`/notLogged`);
    //     //             break;
    //     //         case 'ADMIN':
    //     //             dispatch(setLogged(true))
    //     //             navigate(`/notLogged`);
    //     //             break;
    //     //         case 'SUPERADMIN':
    //     //             dispatch(setLogged(true))
    //     //             navigate(`/empresas`);
    //     //             break;
    //     //         default:
    //     //             navigate('/');
    //     //             break;
    //     //     }
    //     // }

    // }, [empleado, rol]);
    

    return (
        <div className='h-auto min-h-screen flex flex-col justify-center  items-center space-y-20 '>
            <h1 className='text-2xl font-Roboto flex flex-col items-center'>El Buen Sabor
                <span className='text-red-600 text-4xl'>DASHBOARD</span>
            </h1>
            <img src="/assets/img/Icon.svg" alt="icono-buen-sas" className='size-72' />
            <LoginButton />
            <div className='flex flex-row border p-5 rounded-xl space-x-5'>  <LogoutButton /></div>
          
         
        </div>
    )
}

export default LogInScreen