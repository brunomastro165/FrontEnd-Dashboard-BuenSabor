import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { IEmpleado } from "../../../types/Empleado";
import { BackendMethods } from "../../../services/BackendClient";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setGlobalEmpleado } from "../../../redux/slices/empleadoCompleto";
import { useNavigate } from "react-router-dom";
import { setLogged } from "../../../redux/slices/logged";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

    const backend = new BackendMethods();

    const dispatch = useAppDispatch();

    const empledo = useAppSelector((state) => state.GlobalEmpleado.empleado)

    const navigate = useNavigate();

    const logged = useAppSelector((state) => state.logged.logged)

    useEffect(() => {
        const traerEmpleado = async () => {
            if (user?.email) {
                try { //No me dejaba usar el post genérico, asi que tuve que usar uno normal
                    async function postRequest() {
                        const url = `${import.meta.env.VITE_LOCAL}empleado/getPorMail`;
                        const data = user?.email;
                        try {
                            const response = await fetch(url, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'text/plain'
                                },
                                body: data
                            });

                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }

                            const empleado = await response.json() as IEmpleado;
                            dispatch(setGlobalEmpleado({ empleado: empleado }))
                            console.log("Empleado traído de la bd:", empleado);
                        } catch (error) {
                            console.error('Error:', error);
                        }
                    }
                    postRequest()
                } catch (error) {
                    console.error(error)
                }
            }
        }
        traerEmpleado();
    }, [isAuthenticated, user])


    useEffect(() => {
        if (!logged) {
            if (empledo.email !== '') {
                const idEmpresa = empledo.sucursal.empresa.id;
                const idSucursal = empledo.sucursal.id
                switch (empledo.tipoEmpleado) {
                    case 'CAJERO':
                        dispatch(setLogged(true))
                        navigate(`/${idEmpresa}/sucursales/${idSucursal}/pedidos`);
                        break;
                    case 'COCINERO':
                        dispatch(setLogged(true))
                        navigate(`/${idEmpresa}/sucursales/${idSucursal}/pedidos`);
                        break;
                    case 'DELIVERY':
                        dispatch(setLogged(true))
                        navigate(`/${idEmpresa}/sucursales/${idSucursal}/home`);
                        break;
                    case 'ADMIN':
                        dispatch(setLogged(true))
                        navigate(`/${idEmpresa}/sucursales/`);
                        break;
                    default:
                        navigate('/ruta-default');
                        break;
                }
            }
        }
    }, [empledo]);

    return (
        isAuthenticated ? (
            <div className="flex items-center space-x-2  rounded">
                <img src={user?.picture} alt="" className="size-10 rounded-full" />
                <div>
                    <h1 className="bg-red-500 text-white px-1 rounded">{empledo.tipoEmpleado}</h1>
                    <h2>{user?.nickname}</h2>
                </div>
            </div>
        )
            :
            (
                <button
                    className="btn btn-error text-white"
                    onClick={() =>
                        loginWithRedirect({
                            appState: {
                                returnTo: window.location.pathname,
                            },
                        })
                    }
                >
                    Log In
                </button>
            )

    );
};

export default LoginButton;
