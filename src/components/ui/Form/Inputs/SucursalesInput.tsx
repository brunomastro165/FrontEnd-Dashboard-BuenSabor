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

const SucursalesInput: FC<ISucursalesInput> = ({ setValues, values, idEmpresa }) => {

    const backend = new BackendMethods();

    const {getAccessTokenSilently} = useAuth0()

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
        if (e.target.checked) {
            setValues((prevValues: any) => ({
                ...prevValues,
                idSucursales: [...prevValues.idSucursales, id]
            }));
        } else {
            setValues((prevValues: any) => ({
                ...prevValues,
                idSucursales: prevValues.idSucursales.filter((sucursalId: any) => sucursalId !== id)
            }));
        }
    }

    return (
        <>
            <div className='font-Roboto text-xl'>Sucursales dónde estará la promoción: </div>
            {sucursalesPorEmpresa.map((sucursal, index) => (
                <div key={index}>
                    <input
                        multiple
                        type="checkbox"
                        id={`sucursal${index}`}
                        name='idSucursales'
                        value={sucursal.nombre}
                        onChange={(e) => handleCheckboxChange(e, sucursal.id)}
                        checked={values.idSucursales.includes(sucursal.id)}
                    //onClick={() => setSelected(unidad.denominacion)}
                    //className={`peer ${selected === unidad.denominacion ? 'p-12' : ''}`}
                    //checked={medidaSeleccionada?.denominacion === unidad.denominacion}
                    />
                    <label htmlFor={`sucursales${index}`} className="ml-2">
                        {sucursal.nombre}
                    </label>
                </div>
            ))}
        </>
    )

}

export default SucursalesInput