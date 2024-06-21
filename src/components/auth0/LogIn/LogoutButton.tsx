import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setLogged } from "../../../redux/slices/logged";
import { SiAuth0 } from "react-icons/si";


const LogoutButton = () => {
    const { logout, isAuthenticated, user } = useAuth0();

    const dispatch = useAppDispatch();

    const rol = useAppSelector((state) => state.GlobalRol.rol)

    return (
        isAuthenticated && (
            <>
                <div className="flex items-center space-x-2  rounded">
                    <img src={user?.picture} alt="" className="size-10 rounded-full" />
                    <div>
                        <h1 className="bg-red-500 text-white px-1 rounded">{rol}</h1>
                        <h2>{user?.nickname}</h2>
                    </div>
                </div>
                <button
                    onClick={() => {
                        dispatch(setLogged(false))
                        logout({ logoutParams: { returnTo: window.location.origin } })
                    }
                    }
                    className="btn btn-outline text-black"
                >
                    <span className="flex flex-row ">Salir <SiAuth0 className="ml-2" /></span>
                </button>
            </>
        )
    );
};

export default LogoutButton;
