//@ts-nocheck
import React, { FC, useState } from 'react'
import { BarList, Card } from '@tremor/react';
import { IArticuloManufacturado } from '../../types/ArticuloManufacturado';
import { BiFoodMenu } from "react-icons/bi";

interface IBarList {
    articulos: IArticuloManufacturado[]
}

export const BarListVisitas: FC<IBarList> = ({ articulos }) => {


    const getRandom = () => {
        const NumRandom = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
        return NumRandom
    }

    //const [d, setD] = useState([])
    const data = (
        articulos.map((articulo: IArticuloManufacturado) => ({
            name: articulo.denominacion,
            value: getRandom(),
            href: '/',
            icon: function Icon() {
                return (
                    <BiFoodMenu className='text-xl mr-4' />
                );
            },
        })))

    return (
        <Card className="mx-auto max-w-lg">
            <h3 className="text-tremor-title text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">Stock de productos</h3>
            <p className="mt-4 text-tremor-default flex items-center justify-between text-tremor-content dark:text-dark-tremor-content">
                <span>Producto</span>
                <span>Stock</span>
            </p>
            <BarList data={data} className="mt-2" />
        </Card>
    );

}
