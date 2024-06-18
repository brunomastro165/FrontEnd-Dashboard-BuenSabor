import { useEffect, useState } from "react"
 {/*@ts-ignore */}
export const genericInput = (name, type, value, handleChange, errors) => {
    const [textColor, setTextColor] = useState('');

    useEffect(() => {
        if (errors?.[name]) {
            setTextColor('text-red-600');
            const timer = setTimeout(() => {
                setTextColor('text-black');
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    return (
        <div className="flex flex-col justify-center items-start w-full h-min">
            <div className="my-4 w-full">
                <label htmlFor={name} className="font-Roboto text-xl first-letter:uppercase">
                    <h1 className={`first-letter:uppercase transition-all duration-500 ${textColor}`}>{name}</h1>
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
                transition-colors"
                />
            </div>
            <h1 className={`font-Roboto h-5 mb-4 flex text-start justify-start text-red-600 transition-all duration-500 ${errors?.[name] || 'opacity-0'}`}>{errors?.[name]}</h1>
        </div>
    );
};


export const fileInput = (key: string, handleFileChange: any) => {
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

export const booleanInput = (name: string, type: string, value: any, handleChange: any, text1: string, text2: string, errors: any) => {
    return (
        <div className="">
            <label htmlFor={name} className="font-Roboto text-xl first-letter:uppercase">
                <h1 className="first-letter:uppercase">{name}</h1>
            </label>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:justify-around pt-4">
                {/*@ts-ignore */}
                <label className={`btn font-Roboto text-lg ${document.getElementById(`${name}-true`)?.checked ? 'bg-green-500 text-white' : ''}`}>
                    <h1>{text1}</h1>
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
                {/*@ts-ignore */}
                <label className={`btn font-Roboto text-lg ${document.getElementById(`${name}-false`)?.checked ? 'bg-red-500 text-white' : ''}`}>
                    <h1>{text2}</h1>
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

            <h1 className={`font-Roboto h-3 mb-2  flex text-start justify-start text-red-600 transition-all duration-500 ${errors?.[name] || 'opacity-0'}`}>{errors?.[name]}</h1>
        </div>
    );
}