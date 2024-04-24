import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import { IForm } from '../../../types/Form';


const Form: FC<IForm> = ({ data, open, setOpen }) => {

    const [formData, setFormData] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        setFormData(data);
    }, [data]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form className='w-full flex flex-col items-center justify-center space-y-4 p-10'>
            <h1 className='flex text-end justify-end bg-red-600 rounded-full text-white px-2 py-1 text-xl cursor-pointer'
                onClick={() => setOpen(false)}>X</h1>
            {Object.keys(formData).map((key, index) => (
                <div key={index} className='w-full  flex justify-between items-center bg-white shadow-md rounded-lg p-4'>
                    <label className='font-semibold text-gray-700'>{key}</label>
                    <input
                        className='border-2 border-gray-300 bg-white h-10 px-2 rounded-lg text-sm focus:outline-none'
                        type="text"
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                    />
                </div>
            ))}

        </form>
    );
};

export default Form;