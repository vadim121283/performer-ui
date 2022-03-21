import Keycloak from 'keycloak-js';

/* const keycloak: Keycloak.KeycloakInstance = new (Keycloak as any)(
  'https://pr.midav.pro/config/keycloak.json'
); */

const keycloak: Keycloak.KeycloakInstance = new (Keycloak as any)({
  url: 'https://pr.midav.pro',
  realm: 'performer-auth',
  clientId: 'react-client',
});

// const keycloak: Keycloak.KeycloakInstance = new (Keycloak as any)();

export default keycloak;
