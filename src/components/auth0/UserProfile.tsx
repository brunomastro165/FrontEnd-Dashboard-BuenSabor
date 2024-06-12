import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import jwt_decode from 'jwt-decode'; // Importa jwt-decode

export const UserProfile = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [roles, setRoles] = React.useState([]);

  useEffect(() => {
    const getUserRoles = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const decodedToken = jwt_decode(accessToken); // Usa jwt_decode para decodificar el token
        const roles = decodedToken['https://your-app-namespace.com/roles'] || [];
        setRoles(roles);
      } catch (e) {
        console.error(e);
      }
    };

    getUserRoles();
  }, [getAccessTokenSilently]);

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Roles: {roles.join(', ')}</p>
    </div>
  );
};

