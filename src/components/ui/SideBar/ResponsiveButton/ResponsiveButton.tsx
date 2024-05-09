//@ts-nocheck
import React, { FC } from 'react'
import { IButton } from '../../../../types/Button'
import { Link } from 'react-router-dom'


const ResponsiveButton: FC<IButton> = ({ Icon, active, link, setActive, subButton, text, child }) => {
    return (
        <Link to={link} onClick={() => setActive(text)}>
            <div className={`flex text-start items-center 
                    text-xl text-gray-800 rounded-md transition-all
                  hover:bg-[#edf2f4] 
                    active:scale-95 
                     py-5 px-4    
                    ${active === text ? 'text-red-600 border-red-600 bg-[#edf2f4]' : 'bg-white'}`}>
                <div className=' text-2xl '>
                    <Icon />
                </div>
            </div>
        </Link>
    )
}

export default ResponsiveButton