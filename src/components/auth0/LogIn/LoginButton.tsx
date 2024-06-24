//@ts-nocheck
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
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
import LoadingMessage from "../../ui/LoadingMessage/LoadingMessage";


const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

    const backend = new BackendMethods();

    const dispatch = useAppDispatch();

    const empledo = useAppSelector((state) => state.GlobalEmpleado.empleado)

    const navigate = useNavigate();

    const logged = useAppSelector((state) => state.logged.logged)

    const rol = useAppSelector((state) => state.GlobalRol.rol)

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const traerEmpleado = () => {
            setLoading(true);
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
            setLoading(false);
        }
        traerEmpleado();
    }, [isAuthenticated, user])

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

                dispatch(setLogged(true))
                navigate(`/empresas`);

                break;
            default:
                //navigate('/notLogged');
                break;
        }
        setLoading(false);

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
        <>
            {isAuthenticated ? (
                <>
                    {empledo.email === '' && (
                        <div
                            className="bg-blue-500 px-4 py-2 rounded text-white font-Roboto flex items-center cursor-pointer"
                            onClick={() => document.getElementById('my_modal_4')?.showModal()}
                        >Debe solicitar a un superior su registro en el sistema formal <IoIosInformationCircle className="text-2xl ml-4" />
                        </div>
                    )}
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
            }

            {loading && <LoadingMessage />}

            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-1/3 max-w-5xl font-Roboto">
                    <h3 className="font-bold text-lg bg-blue-500 w-max px-4 py-2 rounded text-white">Bienvenido!</h3>
                    <p className="py-4">Usted ya está registrado con Auth0, pero debe de solicitar su registro (a un <span className="font-bold">superadministrador</span>) en el dashboard del sistema para poder interactuar con su correspondiente empresa/sucursal.</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Entendido!</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default LoginButton;
