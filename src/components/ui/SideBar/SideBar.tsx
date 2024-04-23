import React from 'react'
import { useState } from 'react';

import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { TiTags } from "react-icons/ti";
import { GoFileDirectory } from "react-icons/go";
import UserSection from './UserSection';
import { IButton } from '../../../types/Button';
import ButtonContainer from './Button/ButtonContainer';





const SideBar = () => {

    const [active, setActive] = useState("Home");


    //Hice todo para que modificando este JSON se modifiquen directamente los botones de la sidebar con sus configuraciones 
    const Buttons: IButton[] = [
        { Icon: IoHomeOutline, text: "Inicio", link: "/", active: active, setActive: setActive, subButton: null, child: false },

        //El ícono de productos va a tener otros dos dentro
        {
            Icon: MdOutlineShoppingBag, text: "Productos", link: "/generales", active: active, setActive: setActive,
            subButton: [
                { Icon: MdOutlineShoppingBag, text: "Manufacturados", link: "/manufacturados", active: active, setActive: setActive, subButton: null, child: true },
                { Icon: MdOutlineShoppingBag, text: "Insumos", link: "/insumos", active: active, setActive: setActive, subButton: null, child: true }],
            child: false,
        },

        { Icon: TiTags, text: "Promociones", link: "/promociones", active: active, setActive: setActive, subButton: null, child: false },
        { Icon: GoFileDirectory, text: "Empresa", link: "/empresa", active: active, setActive: setActive, subButton: null, child: false },
        { Icon: FaRegUser, text: "Usuarios", link: "/usuarios", active: active, setActive: setActive, subButton: null, child: false },
        
    ];

    return (
        <div className='w-72 bg- border-r h-screen flex flex-col justify-around fixed z-50 bg-white '>

            <div className='space-y-0 md:space-y-4 top-20 fixed'>
                <UserSection />
            </div>

            <div className='w-full'>
                {Buttons.map((button: IButton) => (
                    <ButtonContainer Icon={button.Icon} text={button.text}
                        link={button.link} active={button.active} setActive={button.setActive} subButton={button.subButton} />
                ))}
            </div>
        </div>
    )
}

export default SideBar