import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { IEmpresa } from '../../../../types/Empresa';
import { ISucursal } from '../../../../types/Sucursal';
import { BackendMethods } from '../../../../services/BackendClient';
import { useAuth0 } from '@auth0/auth0-react';

interface ISucursalesInput {
    values: any,
    setValues: any,
    idEmpresa: string | undefined,
}

const SucursalIndividualInput: FC<ISucursalesInput> = ({ setValues, values, idEmpresa }) => {

    const backend = new BackendMethods();

    const { getAccessTokenSilently } = useAuth0()

    const [sucursalesPorEmpresa, setSucursalesPorEmpresa] = useState<ISucursal[]>([]);

    const [sucursalesSeleccionadas, setSucursalesSeleccionadas] = useState<ISucursal[]>([]);

    const getSucursalesPorEmpresa = async () => {
        const res: IEmpresa = await backend.getById(`${import.meta.env.VITE_LOCAL}empresa/sucursales/${idEmpresa}`, getAccessTokenSilently) as IEmpresa
        setSucursalesPorEmpresa(res.sucursales);
    }

    useEffect(() => {
        getSucursalesPorEmpresa();
    }, [])

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
        setValues((prevValues: any) => ({
            ...prevValues,
            idSucursal: id
        }));
    }

    return (
        <>
            <div className='font-Roboto text-xl'>Sucursales dónde estará la promoción: </div>
            {sucursalesPorEmpresa.map((sucursal, index) => (
                <div key={index}>
                    <input
                        type="checkbox"
                        id={`sucursal${index}`}
                        name='idSucursales'
                        value={sucursal.nombre}
                        onChange={(e) => handleCheckboxChange(e, sucursal.id)}
                        checked={values.idSucursal === sucursal.id}
                    />
                    <label htmlFor={`sucursales${index}`} className="ml-2">
                        {sucursal.nombre}
                    </label>
                </div>
            ))}
        </>
    )

}

export default SucursalIndividualInput