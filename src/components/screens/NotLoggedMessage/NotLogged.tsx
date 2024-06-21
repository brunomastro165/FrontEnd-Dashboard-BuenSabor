import React, { useEffect } from 'react'
import LogoutButton from '../../auth0/LogIn/LogoutButton'
import { useAppDispatch } from '../../../hooks/redux'
import { setLogged } from '../../../redux/slices/logged'

const NotLogged = () => {

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(setLogged(false))
    }, [])

    return (
        <div>
            <LogoutButton />
        </div>
    )
}

export default NotLogged