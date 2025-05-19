package com.react.demo.service;

import com.react.demo.dto.UserRecord;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class KeycloakUserService {

    private final Keycloak keycloakAdminClient;
    private String keycloakRealm;

    public KeycloakUserService(
            @Value("${keycloak.auth-server-url}") String authServerUrl,
            @Value("${keycloak.realm}") String realm,
            @Value("${keycloak.resource}") String clientId,
            @Value("${keycloak.credentials.secret}") String clientSecret) {

        this.keycloakAdminClient = KeycloakBuilder.builder()
                .serverUrl(authServerUrl)
                .realm(realm)
                .clientId(clientId)
                .clientSecret(clientSecret)
                .grantType("client_credentials")
                .build();
        this.keycloakRealm = realm;
    }

    /**
     * Get user based on jwt and then updates the changes
     *
     * @param jwt         user jwt
     * @param updatedData changes from profile
     */
    public void updateUser(Jwt jwt, UserRecord updatedData) {
        RealmResource realmResource = keycloakAdminClient.realm(keycloakRealm);
        UserResource userResource = realmResource.users().get(jwt.getClaim("sub"));
        UserRepresentation userRepresentation = userResource.toRepresentation();

        if (updatedData.givenName() != null) {
            userRepresentation.setFirstName(updatedData.givenName());
        }

        if (updatedData.familyName() != null) {
            userRepresentation.setLastName(updatedData.familyName());
        }

        if (updatedData.phone() != null) {
            userRepresentation.getAttributes().put("phone", Collections.singletonList(updatedData.phone()));
        }

        if (updatedData.hsl() != null) {
            userRepresentation.getAttributes().put("hsl", Collections.singletonList(updatedData.hsl()));
        }

        if (updatedData.colorMode() != null) {
            userRepresentation.getAttributes().put("colorMode", Collections.singletonList(updatedData.colorMode()));
        }

        userResource.update(userRepresentation);
    }

}
