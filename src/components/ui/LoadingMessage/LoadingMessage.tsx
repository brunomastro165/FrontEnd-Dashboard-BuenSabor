import React, { FC } from 'react'

interface ILoading {
    titulo: string,
}

const LoadingMessage: FC<ILoading> = ({ titulo }) => {
    return (
        <div className='flex flex-col h-96 justify-center items-center font-Roboto space-y-4'>
            <h1 className='font-Roboto text-xl'>{titulo}</h1>
            <span className="loading loading-spinner text-error"></span>
        </div>
    )
}

export default LoadingMessage