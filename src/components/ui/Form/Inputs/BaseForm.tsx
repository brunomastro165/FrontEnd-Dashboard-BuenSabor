//@ts-nocheck
import React from 'react'

const BaseForm = ({ handleSubmit }) => {
    return (
        <div className='w-full flex flex-col items-center justify-center space-y-4 p-10 '
            onSubmit={handleSubmit}
        >
            <div className='w-full flex justify-end '>
                <h1 className='flex text-end justify-end bg-red-600 btn btn-error rounded-full text-white text-xl cursor-pointer w-min'
                    onClick={() => { setOpen(false), resetForm() }}>X</h1>
            </div>

            <h2 className='text-3xl font-Roboto'>Agrega tu sucursal</h2>
            {/*Mapeo los objetos que traigo al formulario, dependiendo de cada objeto, genero un input distinto */}

            <div className='w-full'>

                <div className="relative z-0 w-full mb-5 group">
                    {/* Podría mapear acá */}
                </div>

            </div>

            <button className='bg-red-600 text-white px-4 py-2 rounded-md active:scale-95 transition-all'
                onClick={handleSubmit}>Enviar</button>
        </div>
    )
}

export default BaseForm