import { useCallback, useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';

/**
 * Returns the auth info and some auth strategies.
 *
 */
export const useAuth = () => {
  const { keycloak, initialized } = useKeycloak();

  const [user, setUser] = useState({});

  // fetch user profile
  useEffect(() => {
    if (!initialized) {
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const userProfile = await keycloak.loadUserProfile();

        setUser({
          ...userProfile,
          fullName: `${userProfile.firstName} ${userProfile.lastName}`,
        });
      } catch (err) {}
    };

    if (keycloak.authenticated) {
      fetchUserInfo();
    }
  }, [keycloak, initialized]);

  return {
    isAuthenticated: !!keycloak.authenticated,
    initialized,
    meta: {
      keycloak,
    },
    token: keycloak.token,
    user,
    roles: keycloak.realmAccess,
    login: useCallback(() => {
      keycloak.login();
    }, [keycloak]),
    logout: useCallback(() => {
      keycloak.logout();
    }, [keycloak]),
    register: useCallback(() => {
      keycloak.register();
    }, [keycloak]),
  };
};
