import React, { FC } from 'react'

interface IGenericWaiter {
    url: string,
    text: string,

}

const GenericWaiter: FC<IGenericWaiter> = ({ text, url }) => {
    return (
        <>
            <div className='w-full flex flex-col justify-center items-center'>
                <img src={`/assets/img/${url}`} alt="buscando..." className='size-96' />
                <h1 className='text-xl font-Roboto'>{text}</h1>
            </div>
        </>
    )
}

export default GenericWaiter