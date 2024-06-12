import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { IEmpleado } from "../../../types/Empleado";
import { BackendMethods } from "../../../services/BackendClient";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setGlobalEmpleado } from "../../../redux/slices/empleadoCompleto";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

    const backend = new BackendMethods();

    const dispatch = useAppDispatch();

    const empledo = useAppSelector((state) => state.GlobalEmpleado.empleado)

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

    // useEffect(() => {
    //     if (empledo.email !== '') {
    //         switch (empledo.tipoEmpleado) {
    //             case 'COCINERO':

    //                 break;

    //             default:
    //                 break;
    //         }
    //     }
    // }, [empledo])


    return (
        isAuthenticated ? (
            <div className="flex items-end space-x-2  rounded">
                <img src={user?.picture} alt="" className="size-10 rounded-full" />
                <div>
                    <h1>Bienvenido</h1>
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
