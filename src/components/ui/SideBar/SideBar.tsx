//@ts-nocheck
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
import { useAppSelector } from '../../../hooks/redux';
import ResponsiveButton from './ResponsiveButton/ResponsiveButton';
import { LiaBalanceScaleRightSolid } from "react-icons/lia";



const SideBar = () => {

    const [active, setActive] = useState("Home");

    const [idEmpresa, setIdEmpresa] = useState<number>(1)
    const [idSucursales, setIdSucursales] = useState<number>(1)

    //const {idEmpresa} = useParams()

    const url = useAppSelector((state) => state.globalUrl.url);


    //Hice todo para que modificando este JSON se modifiquen directamente los botones de la sidebar con sus configuraciones 
    const Buttons: IButton[] = [
        { Icon: IoHomeOutline, text: "Inicio", link: `${url}/home`, active: active, setActive: setActive, subButton: null, child: false },
        { Icon: TbCategory2, text: "Categorías", link: `${url}/categorias`, active: active, setActive: setActive, subButton: null, child: false },
        //El ícono de productos va a tener otros dos dentro
        {
            Icon: MdOutlineShoppingBag, text: "Productos", link: "", active: active, setActive: setActive,
            subButton: [
                { Icon: MdOutlineShoppingBag, text: "Manufacturados", link: `${url}/manufacturados`, active: active, setActive: setActive, subButton: null, child: true },
                { Icon: MdOutlineShoppingBag, text: "Insumos", link: `${url}/insumos`, active: active, setActive: setActive, subButton: null, child: true }],
            child: false,
        },
        { Icon: TiTags, text: "Promociones", link: `${url}/promociones`, active: active, setActive: setActive, subButton: null, child: false },
        { Icon: GoFileDirectory, text: "Empresa", link: `${url}/empresa`, active: active, setActive: setActive, subButton: null, child: false },
        { Icon: FaRegUser, text: "Usuarios", link: `${url}/usuarios`, active: active, setActive: setActive, subButton: null, child: false },
        { Icon: LiaBalanceScaleRightSolid, text: "Unidades de medida", link: `${url}/unidadesDeMedida`, active: active, setActive: setActive, subButton: null, child: false },
    ];


    const ResponsiveButtons: IButton[] = [
        { Icon: MdOutlineShoppingBag, text: "Insumos", link: `${url}/insumos`, active: active, setActive: setActive, subButton: null, child: false },
        { Icon: MdOutlineShoppingBag, text: "Manufacturados", link: `${url}/manufacturados`, active: active, setActive: setActive, subButton: null, child: false },
        { Icon: TiTags, text: "Promociones", link: `${url}/promociones`, active: active, setActive: setActive, subButton: null, child: false },
        { Icon: IoHomeOutline, text: "Inicio", link: `${url}/home`, active: active, setActive: setActive, subButton: null, child: false },
        { Icon: GoFileDirectory, text: "Empresa", link: `${url}/empresa`, active: active, setActive: setActive, subButton: null, child: false },
        { Icon: FaRegUser, text: "Usuarios", link: `${url}/usuarios`, active: active, setActive: setActive, subButton: null, child: false },
        { Icon: TbCategory2, text: "Categorías", link: `${url}/categorias`, active: active, setActive: setActive, subButton: null, child: false },
    ];

    return (
        <>
            <div className=' hidden md:flex w-72 border-r h-screen  flex-col justify-around fixed z-50 bg-white '>

                <div className='space-y-0 md:space-y-4 top-20 fixed'>
                    <UserSection />
                </div>

                <div className='w-full'>
                    {Buttons.map((button: IButton) => (
                        <ButtonContainer Icon={button.Icon} text={button.text}
                            link={button.link} active={button.active} setActive={button.setActive} subButton={button.subButton}
                            child={button.child} />
                    ))}
                </div>

            </div>

            <div className='md:hidden w-full  fixed bottom-0 inset-x-0 z-50 h-24 flex justify-end items-end '>

                <div className='w-full bg-white  flex flex-row justify-center items-center overflow-x-scroll   shadow-black'>
                    {ResponsiveButtons.map((button: IButton) => (
                        <ResponsiveButton Icon={button.Icon} text={button.text}
                            link={button.link} active={button.active} setActive={button.setActive} subButton={button.subButton}
                            child={button.child} />
                    ))}
                </div>

            </div>
        </>
    )
}

export default SideBar