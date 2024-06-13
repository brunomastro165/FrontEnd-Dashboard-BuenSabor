import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { IButton } from '../../../../types/Button'
import { useState, useEffect } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import Button from './Button';


const ButtonContainer: FC<IButton> = ({ Icon, link, text, active, setActive, subButton, child, roles }) => {

    const [subActive, setSubActive] = useState(false);

    //Este useEffect cierra los submenúes al clickear otro botón, además de encargarse de mantener activa
    //la sección padre de los submenúes al estar activos
    useEffect(() => {
        if ((active !== text) && (Array.isArray(subButton))) {
            subButton.forEach(button => {
                if (active === button.text) {
                    setActive(text)
                }
            });
            setSubActive(false);
        }
    }, [active])

    function deployButtons() {
        if (subButton) {
            return (
                <>
                    <div onClick={() => setSubActive(currentState => !currentState)}>
                        <div className='w-full'>
                            <button onClick={() => setActive(text)} className=' w-full'>
                                <div className={`flex text-start items-center text-xl text-gray-800 rounded-md transition-all hover:bg-[#edf2f4] active:scale-95 mx-5 
                                    ${active === text ? 'text-red-600 border-red-600 bg-[#edf2f4]' : 'bg-white'}`}>
                                    <div className='mx-4 text-2xl '>
                                        <Icon />
                                    </div>
                                    <button className='font-Roboto p-4 text-start  w-full '>
                                        {text}
                                    </button>
                                    <div className={`${subActive && 'rotate-180'} mx-4 text-xl transition-transform `}>
                                        <IoIosArrowDown />
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {subActive &&
                        <>
                            <div className='relative left-11 space-y-16 bg-black h-auto'>
                                {subButton.map((button, id) => {
                                    return (
                                        <Button
                                            Icon={button.Icon}
                                            active={button.active}
                                            link={button.link}
                                            setActive={button.setActive}
                                            subButton={button.subButton}
                                            text={button.text}
                                            key={button.text}
                                            child={true} 
                                            roles={button.roles}/>
                                    );
                                })}
                            </div>
                        </>
                    }
                </>
            )
        }
        else {
            return (
                <Button
                    Icon={Icon}
                    active={active}
                    link={link}
                    setActive={setActive}
                    subButton={subButton}
                    text={text}
                    child={false}
                    roles={roles}
                />
            )
        }
    }
    return (
        <>
            {deployButtons()}
        </>
    )
}

export default ButtonContainer