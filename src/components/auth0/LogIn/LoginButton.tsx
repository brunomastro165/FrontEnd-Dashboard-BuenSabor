import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();

    return (
        isAuthenticated ? (
            <div className="flex items-end space-x-2 border p-2 rounded">
                <img src={user?.picture} alt="" className="size-10" />
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
