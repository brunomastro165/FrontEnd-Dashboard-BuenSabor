//@ts-nocheck
import { FC } from 'react'
import { INavBar } from '../../../types/NavBar';
import { MdFastfood } from "react-icons/md";
import LoginButton from '../../auth0/LogIn/LoginButton';
import LogoutButton from '../../auth0/LogIn/LogoutButton';


const NavBar: FC<INavBar> = ({ title }) => {

    return (
        <div className='w-full items-center flex justify-between bg-white p-4 fixed z-50 shadow-md'>
            <h1 className='font-Roboto text-2xl text-red-600 '>{title}</h1>

            <div className='flex items-center space-x-4'>
                <LoginButton />
                <LogoutButton />
            </div>

        </div>
    );

}

export default NavBar