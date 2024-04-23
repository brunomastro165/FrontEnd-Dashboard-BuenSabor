import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { IButton } from '../../../../types/Button'
import { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import Button from './Button';
import ChildButton from './ChildButton';

const ButtonContainer: FC<IButton> = ({ Icon, link, text, active, setActive, subButton, child }) => {

    const [subActive, setSubActive] = useState(false);

    function deployButtons() {
        if (subButton) {
            return (
                <>
                    <div onClick={() => setSubActive(currentState => !currentState)}>
                        <div className='w-full'>
                            <Link to={link} onClick={() => setActive(text)} className=' w-full'>
                                <div className={`flex text-start items-center text-xl text-gray-800 rounded-md transition-all hover:bg-[#edf2f4] active:scale-95 mx-5 
                                    ${active === text ? 'text-red-600 border-red-600 bg-[#edf2f4]' : 'bg-white'}`}>
                                    <div className='mx-4 text-2xl '>
                                        <Icon />
                                    </div>
                                    <button className='font-Roboto p-4 text-start  w-full '>
                                        {text}
                                    </button>
                                    <div className={`${subActive && 'rotate-180'} mx-4 text-xl `}>
                                        <IoIosArrowDown />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {subActive &&
                        <>
                            <div className='ml-4 space-y-14 '>
                                {subButton.map((button, id) =>
                                (<Button
                                    Icon={button.Icon}
                                    active={button.active}
                                    link={button.link}
                                    setActive={button.setActive}
                                    subButton={button.subButton}
                                    text={button.text}
                                    key={button.text}
                                    child={true} />)
                                )}
                            </div>
                            <div className='mb-28'></div>
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