export const genericInput = (name: string, type: string, value, handleChange) => {
    return (
        <div className="my-4">
            {/* <h1 className='font-Roboto text-xl first-letter:uppercase'>{name}</h1> */}
            <label htmlFor={name} className="font-Roboto text-xl first-letter:uppercase" >
                <h1 className="first-letter:uppercase">{name}</h1>
            </label>
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={handleChange}
                required
                placeholder=""
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer 
                transition-colors" />

        </div>
    )
}


export const fileInput = (key: string, handleFileChange) => {
    return (
        <>
            <h1 className='font-Roboto text-xl mb-4'>Imágenes:</h1>
            <div className="relative w-24 h-24 ">
                <input
                    className="absolute opacity-0 w-full h-full cursor-pointer"
                    multiple
                    type="file"
                    name={key}
                    id={key}
                    onChange={handleFileChange}
                    required
                />
                <label htmlFor={key} className="w-full h-full border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-400">
                    <span className="text-3xl">+</span>
                </label>
            </div>
            {/* <input type="file" className="file-input w-full max-w-xs" /> */}
        </>
    )
}

export const booleanInput = (name: string, type: string, value, handleChange) => {
    return (
        <div className="my-4">
            <label htmlFor={name} className="font-Roboto text-xl first-letter:uppercase">
                <h1 className="first-letter:uppercase">{name}</h1>
            </label>
            <div className="flex flex-col space-y-4">
                <label className={`btn font-Roboto text-lg ${document.getElementById(`${name}-true`)?.checked ? 'bg-green-500 text-white' : ''}`}>
                    Si, es para elaborar
                    <input
                        className="hidden"
                        type="radio"
                        name={name}
                        id={`${name}-true`}
                        value='true'
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className={`btn font-Roboto text-lg ${document.getElementById(`${name}-false`)?.checked ? 'bg-red-500 text-white' : ''}`}>
                    No, no es para elaborar
                    <input
                        className="hidden"
                        type="radio"
                        name={name}
                        id={`${name}-false`}
                        value='false'
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
        </div>
    );
}