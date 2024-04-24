import React, { FC } from 'react'
import { IContainerCards } from '../../../types/ContainerCards/ContainerCards'
import CardEmpresa from '../Cards/CardEmpresa'

const ContainerCards: FC<IContainerCards> = ({ data }) => {

    console.log(data)
    return (
        <div className=' mt-24 m-5 flex flex-wrap justify-center items-center'>
            {data.map((d) => (
                <CardEmpresa nombre={d.nombre}
                    cuil={d.cuil}
                    id={d.id}
                    razonSocial={d.razonSocial}
                    sucursales={d.sucursales}
                    key={d.id} />
            ))}
        </div>
    )
}

export default ContainerCards