import React, { useEffect } from 'react'
import { useState } from 'react';

import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { TiTags } from "react-icons/ti";
import { GoFileDirectory } from "react-icons/go";
import UserSection from './UserSection';
import { IButton } from '../../../types/Button';
import ButtonContainer from './Button/ButtonContainer';
import { TbCategory2 } from "react-icons/tb";
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import ResponsiveButton from './ResponsiveButton/ResponsiveButton';
import { LiaBalanceScaleRightSolid } from "react-icons/lia";
import { FaRegBuilding } from "react-icons/fa6";
import { TbSquarePercentage } from "react-icons/tb";
import { setIdEmpresa } from '../../../redux/slices/idEmpresa';
import { HiOutlineTicket } from "react-icons/hi2";
import { GrTable } from "react-icons/gr";

const SideBar = () => {

    const [active, setActive] = useState("Home");
    console.log(active)

    //const { idEmpresa, idSucursales } = useParams()

    //const [url, setUrl] = useState<string>(`/${idEmpresa}/sucursales/${idSucursales}`)
    // const [idEmpresa, setIdEmpresa] = useState<number>(1)
    //const [idSucursales, setIdSucursales] = useState<number>(1)

    const url = useAppSelector((state) => state.globalUrl.url);

    console.log(url);

    const idEmpresa = useAppSelector((state) => state.GlobalIdEmpresa.idEmpresa);

    const empleado = useAppSelector((state) => state.GlobalEmpleado.empleado);

    const [filteredButtons, setFilteredButtons] = useState<IButton[]>([]);

    //Hice todo para que modificando este JSON se modifiquen directamente los botones de la sidebar con sus configuraciones 
    const Buttons: IButton[] = [
        { Icon: IoHomeOutline, text: "Inicio", link: `${url}/home`, active: active, setActive: setActive, subButton: null, child: false, roles: ['SUPERADMIN', 'ADMIN', 'COCINERO', 'CAJERO', 'DELIVERY'] },
        { Icon: TiTags, text: "Categorías", link: `${url}/categorias`, active: active, setActive: setActive, subButton: null, child: false, roles: ['SUPERADMIN', 'ADMIN', 'COCINERO', 'CAJERO'] },
        //El ícono de productos va a tener otros dos dentro
        {
            Icon: MdOutlineShoppingBag, text: "Productos", link: "", active: active, setActive: setActive, roles: ['SUPERADMIN', 'ADMIN', 'COCINERO', 'CAJERO'],
            subButton: [
                { Icon: MdOutlineShoppingBag, text: "Manufacturados", link: `${url}/manufacturados`, active: active, setActive: setActive, subButton: null, child: true, roles: ['SUPERADMIN', 'ADMIN', 'COCINERO', 'CAJERO'] },
                { Icon: MdOutlineShoppingBag, text: "Insumos", link: `${url}/insumos`, active: active, setActive: setActive, subButton: null, child: true, roles: ['SUPERADMIN', 'ADMIN', 'COCINERO', 'CAJERO'] }],
            child: false,
        },
        { Icon: TbSquarePercentage, text: "Promociones", link: `${url}/promociones`, active: active, setActive: setActive, subButton: null, child: false, roles: ['SUPERADMIN', 'ADMIN', 'COCINERO', 'CAJERO'] },
        { Icon: FaRegBuilding, text: "Sucursales", link: `${idEmpresa}/sucursales`, active: active, setActive: setActive, subButton: null, child: false, roles: ['SUPERADMIN', 'ADMIN'] },
        { Icon: FaRegUser, text: "Usuarios", link: `${url}/usuarios`, active: active, setActive: setActive, subButton: null, child: false, roles: ['SUPERADMIN', 'ADMIN'] },
        { Icon: LiaBalanceScaleRightSolid, text: "Unidades de medida", link: `${url}/unidadesDeMedida`, active: active, setActive: setActive, subButton: null, child: false, roles: ['SUPERADMIN', 'ADMIN'] },
        { Icon: HiOutlineTicket, text: "Pedidos", link: `${url}/pedidos`, active: active, setActive: setActive, subButton: null, child: false, roles: ['SUPERADMIN', 'ADMIN', 'COCINERO', 'CAJERO', 'DELIVERY'] },
        { Icon: GrTable, text: "Grilla de pedidos ", link: `${url}/pedidosCajero`, active: active, setActive: setActive, subButton: null, child: false, roles: ['SUPERADMIN', 'ADMIN', 'COCINERO', 'CAJERO', 'DELIVERY'] },
    ];

    //Con esto filtro los botones de la sidebar por el rol del empleado
    const filtrarBotonesPorRol = (buttons: IButton[]) => {
        const botonesFiltrados: IButton[] = buttons.filter((button) => button.roles.includes(empleado.tipoEmpleado));
        setFilteredButtons(botonesFiltrados);
    }

    useEffect(() => {
        filtrarBotonesPorRol(Buttons);
    }, [url, active])

    return (
        <>
            <div className=' hidden md:flex w-72 border-r h-screen  flex-col justify-around fixed z-50 bg-white '>

                <div className='space-y-0 md:space-y-4 top-20 fixed'>
                    <UserSection />
                </div>

                <div className='w-full'>
                    {filteredButtons.map((button: IButton) => (
                        <ButtonContainer Icon={button.Icon} text={button.text}
                            link={button.link} active={button.active} setActive={button.setActive} subButton={button.subButton}
                            child={button.child} roles={button.roles} />
                    ))}
                </div>

            </div>
            {/* 
            <div className='md:hidden w-full  fixed bottom-0 inset-x-0 z-50 h-24 flex justify-end items-end '>

                <div className='w-full bg-white  flex flex-row justify-center items-center overflow-x-scroll   shadow-black'>
                    {ResponsiveButtons.map((button: IButton) => (
                        <ResponsiveButton Icon={button.Icon} text={button.text}
                            link={button.link} active={button.active} setActive={button.setActive} subButton={button.subButton}
                            child={button.child} />
                    ))}
                </div>

            </div> */}
        </>
    )
}

export default SideBar