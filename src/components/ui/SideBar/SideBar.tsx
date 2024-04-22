import React from 'react'
import { useState } from 'react';
import Button from './Button'
import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { TiTags } from "react-icons/ti";
import { GoFileDirectory } from "react-icons/go";
import UserSection from './UserSection';
import { IButton } from '../../../types/Button';





const SideBar = () => {

    const [active, setActive] = useState("Home");

    const Buttons = [
        { Icon: IoHomeOutline, text: "Inicio", link: "/", active: active, setActive: setActive },
        { Icon: MdOutlineShoppingBag, text: "Productos", link: "/productos", active: active, setActive: setActive },
        { Icon: TiTags, text: "Promociones", link: "/promociones", active: active, setActive: setActive },
        { Icon: GoFileDirectory, text: "Empresa", link: "/empresa", active: active, setActive: setActive },
        { Icon: FaRegUser, text: "Usuarios", link: "/usuarios", active: active, setActive: setActive }
    ];

    return (
        <div className='w-72 bg- border-r h-screen flex flex-col justify-around fixed z-50 bg-white '>

            <div className='space-y-0 md:space-y-4 w-full'>
                <UserSection />
            </div>

            <div className='w-full'>
                {Buttons.map((button: IButton) => (
                    <Button Icon={button.Icon} text={button.text}
                        link={button.link} active={button.active} setActive={button.setActive} />
                ))}
            </div>
        </div>
    )
}

export default SideBar