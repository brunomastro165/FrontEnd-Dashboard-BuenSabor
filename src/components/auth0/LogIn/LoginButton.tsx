import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { IEmpleado } from "../../../types/Empleado";
import { BackendMethods } from "../../../services/BackendClient";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setGlobalEmpleado } from "../../../redux/slices/empleadoCompleto";
import { useNavigate } from "react-router-dom";
import { setLogged } from "../../../redux/slices/logged";
import { errorGenerico } from "../../toasts/ToastAlerts";
import { setRol } from "../../../redux/slices/rol";
import { TbBrandAuth0 } from "react-icons/tb";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

    const backend = new BackendMethods();

    const dispatch = useAppDispatch();

    const empledo = useAppSelector((state) => state.GlobalEmpleado.empleado)

    const navigate = useNavigate();

    const logged = useAppSelector((state) => state.logged.logged)

    const rol = useAppSelector((state) => state.GlobalRol.rol)

    useEffect(() => {
        const traerEmpleado = () => {

            if (user?.email) {

                //TRAER EL ROL DESDE AUTH0
                async function traerRol() {
                    try {
                        const res: any = await backend.getById(`${import.meta.env.VITE_LOCAL}empleado/role`, getAccessTokenSilently);
                        dispatch(setRol(res.role))
                        console.log(res.role);
                    } catch (error) {
                        console.error(error)
                        errorGenerico('Error al traer los datos desde auth0')
                    }
                }
                traerRol();

                //TRAER LOS DATOS DEL EMPLEADO GUARDADOS LOCALMENTE
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
                        errorGenerico("Porfavor, asegurese de crear el usuario en la sección 'usuarios'")
                    }

                }
                postRequest()
            }
        }
        traerEmpleado();
    }, [isAuthenticated, user])


    useEffect(() => {
        if (!logged) {
            if (empledo.email !== '') {
                //@ts-ignore
                const idEmpresa = empledo.sucursal.empresa.id;
                const idSucursal = empledo.sucursal.id
                switch (empledo.tipoEmpleado) {
                    case 'CAJERO':
                        dispatch(setLogged(true))
                        navigate(`/${idEmpresa}/sucursales/${idSucursal}/home`);
                        break;
                    case 'COCINERO':
                        dispatch(setLogged(true))
                        navigate(`/${idEmpresa}/sucursales/${idSucursal}/home`);
                        break;
                    case 'DELIVERY':
                        dispatch(setLogged(true))
                        navigate(`/${idEmpresa}/sucursales/${idSucursal}/home`);
                        break;
                    case 'ADMIN':
                        dispatch(setLogged(true))
                        navigate(`/${idEmpresa}/sucursales/${idSucursal}/home`);
                        break;
                    case 'SUPERADMIN':
                        dispatch(setLogged(true))
                        navigate(`/empresas`);
                        break;
                    default:
                        navigate('/');
                        break;
                }
            }
            else {
                switch (rol) {
                    case 'CAJERO':
                        dispatch(setLogged(true))
                        navigate(`/notLogged`);
                        break;
                    case 'COCINERO':
                        dispatch(setLogged(true))
                        navigate(`/notLogged`);
                        break;
                    case 'DELIVERY':
                        dispatch(setLogged(true))
                        navigate(`/notLogged`);
                        break;
                    case 'ADMIN':
                        dispatch(setLogged(true))
                        navigate(`/notLogged`);
                        break;
                    case 'SUPERADMIN':
                        dispatch(setLogged(true))
                        navigate(`/empresas`);
                        break;
                    default:
                        navigate('/');
                        break;
                }
            }
        }
    }, [empledo, rol]);

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
                    className="btn btn-outline border-2 text-black btn-wide"
                    onClick={() =>
                        loginWithRedirect({

                        })
                    }
                >
                    Ingresar con Auth0 <span><TbBrandAuth0 className="text-2xl" /></span>
                </button>
            )

    );
};

export default LoginButton;
