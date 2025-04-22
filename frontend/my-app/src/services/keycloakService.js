import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8081/',
  realm: 'demo',            
  clientId: 'my-app',
});

export default keycloak;