import { useEffect, useState } from "react";
import { IEmpresa } from "../../../types/Empresa";
import { BackendClient } from "../../../services/BackendClient";
import NavBar from "../../ui/NavBar/NavBar";
import ContainerCards from "../../ui/CointainerCards/ContainerCards";
import { ISucursal } from "../../../types/Sucursal";
import { IPromos } from "../../../types/Promos";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setGlobalUpdated } from "../../../redux/slices/globalUpdate";
import { useAuth0 } from "@auth0/auth0-react";
import { errorGenerico } from "../../toasts/ToastAlerts";
import { setLogged } from "../../../redux/slices/logged";


//@ts-ignore
class Backend extends BackendClient<T> { }

const Inicio = () => {

    const backend = new Backend();

    const { getAccessTokenSilently } = useAuth0();

    const [empresas, setEmpresas] = useState<IEmpresa[]>([]);

    const [loaded, setLoaded] = useState<boolean>(false);

    const updated = useAppSelector((state) => state.GlobalUpdated.updated);

    const dispatch = useAppDispatch();

    const getEmpresas = async () => {
        try {
            const res: IEmpresa[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}empresa/noEliminados`, getAccessTokenSilently);
            setEmpresas(res);
        } catch (error) {
            errorGenerico('Debe loguearse para poder tener acceso al sistema')
            console.error(error)
        }
    }

    const traerGetters = async () => {
        getEmpresas();
        setLoaded(true);
    }

    useEffect(() => {
        dispatch(setLogged(false))
        traerGetters();
        setLoaded(false)
        dispatch(setGlobalUpdated(false));
    }, [loaded, updated])


    return (
        <>
            <NavBar title='Empresas' />
            <div className='mt-24'>
                <ContainerCards data={empresas} />
            </div>
        </>
    )
}

export default Inicio