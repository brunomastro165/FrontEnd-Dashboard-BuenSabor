import { FC } from 'react'
import { INavBar } from '../../../types/NavBar';

const NavBar: FC<INavBar> = ({ title }) => {

    return (
        <div className='w-full items-center flex bg-white p-4 fixed z-50 shadow-md'>
            <h1 className='font-Roboto text-2xl text-red-600'>{title}</h1>
        </div>
    );

}

export default NavBar