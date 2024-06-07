import React, { FC } from 'react'
import { IButton } from '../../../../types/Button'
import { Link } from 'react-router-dom'
import { setCategory } from '../../../../redux/slices/globalCategory';
import { useAppDispatch } from '../../../../hooks/redux';

const Button: FC<IButton> = ({ Icon, active, link, setActive, subButton, text, child }) => {

    const dispatch = useAppDispatch();

    return (
        <div className={`${child && 'absolute '} w-full`}>
            <div className=''>
                <Link to={link} onClick={() => { setActive(text), dispatch(setCategory({selected: 'Todos', id:0})) }}>
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