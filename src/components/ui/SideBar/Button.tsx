import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { IButton } from '../../../types/Button'
import { useState } from 'react'

const Button: FC<IButton> = ({ Icon, link, text, active, setActive }) => {


    return (
        <div className=' w-full'>
            <div className=''>
                <Link to={link} onClick={() => setActive(text)}>
                    <div className={`flex text-start items-center 
                    text-xl text-gray-800 rounded-md transition-all
                  hover:bg-[#edf2f4] 
                    active:scale-95 
                    mx-5
                    ${active === text ? 'text-red-600 border-red-600 bg-[#edf2f4]' : 'bg-white'}`}>
                        <div className='mx-4 text-2xl '>
                            <Icon />
                        </div>
                        <button className='font-Roboto p-4 text-start  w-full '>
                            {text}
                        </button>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Button