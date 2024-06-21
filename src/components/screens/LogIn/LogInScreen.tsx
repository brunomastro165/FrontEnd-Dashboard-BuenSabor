import React from 'react'
import LoginButton from '../../auth0/LogIn/LoginButton'
import LogoutButton from '../../auth0/LogIn/LogoutButton'

const LogInScreen = () => {
    return (
        <div className='h-screen flex flex-col justify-center  items-center space-y-20 '>
            <h1 className='text-2xl font-Roboto flex flex-col items-center'>El Buen Sabor
                <span className='text-red-600 text-4xl'>DASHBOARD</span>
            </h1>
            <img src="/assets/img/Icon.svg" alt="icono-buen-sas" className='size-72' />
            <LoginButton />
            <LogoutButton />
        </div>
    )
}

export default LogInScreen