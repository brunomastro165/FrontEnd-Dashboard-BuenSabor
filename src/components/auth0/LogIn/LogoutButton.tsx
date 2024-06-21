import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch } from "../../../hooks/redux";
import { setLogged } from "../../../redux/slices/logged";
import { SiAuth0 } from "react-icons/si";


const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();

    const dispatch = useAppDispatch();

    return (
        isAuthenticated && (
            <button
                onClick={() => {
                    dispatch(setLogged(false))
                    logout({ logoutParams: { returnTo: window.location.origin } })
                }
                }
                className="btn btn-outline text-black"
            >
                <span className="flex flex-row ">Salir <SiAuth0 className="ml-2"/></span>
            </button>
        )
    );
};

export default LogoutButton;
