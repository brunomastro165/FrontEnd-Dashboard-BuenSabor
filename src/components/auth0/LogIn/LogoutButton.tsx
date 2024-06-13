import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch } from "../../../hooks/redux";
import { setLogged } from "../../../redux/slices/logged";

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
                className="btn btn-error text-white"
            >
                Log Out
            </button>
        )
    );
};

export default LogoutButton;
