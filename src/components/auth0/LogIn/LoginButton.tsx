import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { IEmpleado } from "../../../types/Empleado";
import { BackendMethods } from "../../../services/BackendClient";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setGlobalEmpleado } from "../../../redux/slices/empleadoCompleto";
import { useNavigate } from "react-router-dom";
import { setLogged } from "../../../redux/slices/logged";
import { errorGenerico, succesGenerico } from "../../toasts/ToastAlerts";
import { setRol } from "../../../redux/slices/rol";
import { TbBrandAuth0 } from "react-icons/tb";
import { SiAuth0 } from "react-icons/si";
import { IoIosInformationCircle } from "react-icons/io";


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


    console.log("me voy a suicidar")
    console.log(rol)
    console.log(logged)

    useEffect(() => {


        //@ts-ignore
        const idEmpresa = empledo?.sucursal?.empresa?.id;
        const idSucursal = empledo?.sucursal.id
        switch (rol) {
            case 'CAJERO':
                if (idEmpresa !== undefined) {
                    dispatch(setLogged(true))
                    navigate(`/${idEmpresa}/sucursales/${idSucursal}/home`);
                }
                break;
            case 'COCINERO':
                if (idEmpresa !== undefined) {
                    dispatch(setLogged(true))
                    navigate(`/${idEmpresa}/sucursales/${idSucursal}/home`);
                }
                break;
            case 'DELIVERY':
                if (idEmpresa !== undefined) {
                    dispatch(setLogged(true))
                    navigate(`/${idEmpresa}/sucursales/${idSucursal}/home`);
                }
                break;
            case 'ADMIN':
                if (idEmpresa !== undefined) {
                    dispatch(setLogged(true))
                    navigate(`/${idEmpresa}/sucursales/${idSucursal}/home`);
                }
                break;
            case 'SUPERADMIN':
                if (idEmpresa !== undefined) {
                    dispatch(setLogged(true))
                    navigate(`/empresas`);
                }
                break;
            default:
                //navigate('/notLogged');
                break;
        }

        // else {
        //     switch (rol) {
        //         case 'CAJERO':
        //             dispatch(setLogged(true))
        //             navigate(`/`);
        //             break;
        //         case 'COCINERO':
        //             dispatch(setLogged(true))
        //             navigate(`/`);
        //             break;
        //         case 'DELIVERY':
        //             dispatch(setLogged(true))
        //             navigate(`/`);
        //             break;
        //         case 'ADMIN':
        //             dispatch(setLogged(true))
        //             navigate(`/`);
        //             break;
        //         case 'SUPERADMIN':
        //             dispatch(setLogged(true))
        //             navigate(`/`);
        //             break;
        //         default:
        //             navigate('/');
        //             break;
        //     }
        // }

        // setTimeout(() => {
        //     succesGenerico('Debe solicitar a un superior su registro en el sistema interno')
        // }, 8000);

    }, [empledo, rol]);

    return (
        isAuthenticated ? (
            <>
                {empledo.email === '' && (<div className="bg-blue-500 px-4 py-2 rounded text-white font-Roboto flex items-center ">Debe solicitar a un superior su registro en el sistema formal <IoIosInformationCircle className="text-2xl ml-4"/></div>)}
            </>
        )
            :
            (
                <>
                    <button
                        className="btn btn-outline border-2 text-black btn-wide"
                        onClick={() =>
                            loginWithRedirect({

                            })
                        }
                    >
                        Ingresar con Auth0 <span><SiAuth0 className="text-xl" /></span>
                    </button>
                </>
            )


    );
};

export default LoginButton;
