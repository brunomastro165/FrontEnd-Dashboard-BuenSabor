import { ReactNode, useState } from "react";

import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

export const RutaPrivada = ({ children, roles }: { children: ReactNode, roles: string[] }) => {

    const empleado = useAppSelector((state) => state.GlobalEmpleado.empleado)

    const rol = useAppSelector((state) => state.GlobalRol.rol)

    //Si hay un usuario loggeado, entonces lo dejo pasar, sino, vuelve al inicio de la aplicación
    return roles.includes(rol) ? children : <Navigate to='/' />;

};