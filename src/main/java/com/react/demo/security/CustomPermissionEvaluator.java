package com.react.demo.security;

import com.react.demo.model.Documentation;
import com.react.demo.repository.DocumentationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Component
public class CustomPermissionEvaluator implements PermissionEvaluator {

    private final DocumentationRepository documentationRepository;

    @Autowired
    public CustomPermissionEvaluator(DocumentationRepository documentationRepository) {
        this.documentationRepository = documentationRepository;
    }


    @Override
    public boolean hasPermission(Authentication auth, Object targetDomainObject, Object permission) {
        if (!checkAuth(auth, permission)){
            return false;
        }

        String permissionName = (String) permission;
        Object principal = auth.getPrincipal();

        if (checkJwt(principal)) {
            return false;
        }

        Jwt jwt = (Jwt) principal;
        if (targetDomainObject == null && permissionName.equalsIgnoreCase("READ")) {
            boolean test = canReadDocument(null, jwt);
            return test;
        } else if (targetDomainObject instanceof Documentation) {
            Documentation document = (Documentation) targetDomainObject;//split to type spesific services

            switch (permissionName.toUpperCase()) {
                case "READ":
                    return canReadDocument(document, jwt);
                case "EDIT":
                    return canEditDocument(document, jwt);
                case "DELETE":
                    return canDeleteDocument(document, jwt);
                default:
                    return false;
            }
        }
        return false;
    }

    private static boolean checkJwt(Object principal) {
        if (!(principal instanceof Jwt)) {
            return true;
        }
        return false;
    }

    private boolean checkAuth(Authentication auth, Object permission) {
        if ((auth == null) || !(permission instanceof String)) {
            return false;
        }
        return true;
    }

    @Override
    public boolean hasPermission(Authentication auth, Serializable targetId, String targetType, Object permission) {
        if (!checkAuth(auth, permission) || targetId == null){
            return false;
        }

        String permissionName = (String) permission;
        Object principal = auth.getPrincipal();

        if (checkJwt(principal)) {
            return false;
        }

        Jwt jwt = (Jwt) principal;

        if(targetType.equalsIgnoreCase("Documentation")) {
            Documentation document = documentationRepository.findById((Long) targetId).orElse(null);

            if (document != null) {
                switch (permissionName.toUpperCase()) {
                    case "READ":
                        return canReadDocument(document, jwt);
                    case "EDIT":
                        return canEditDocument(document, jwt);
                    case "DELETE":
                        return canDeleteDocument(document, jwt);
                    default:
                        return false;
                }
            }
        }

        return false;
    }

    private boolean canReadDocument(Documentation document, Jwt user) {
        // owner etc should always be possible but for now admin
        return isRoleAdmin(user) || document != null && user.getClaim("sub").equals(document.getCreatorUuid());
    }

    private boolean canEditDocument(Documentation document, Jwt user) {
        // for now admin but owner could be nice too
        return isRoleAdmin(user);
    }

    private boolean canDeleteDocument(Documentation document, Jwt user) {
        //for now only admin can delete
        return isRoleAdmin(user);
    }

    private boolean isRoleAdmin(Jwt user) {
        return getRealmRoles(user).contains("admin");
    }


    private List<String> getRealmRoles(Jwt jwt) {
        Map<String, Object> realmAccess = jwt.getClaim("realm_access");
        if (realmAccess == null) {
            return null;
        }

        List<String> roles = (List<String>) realmAccess.get("roles");
        if (roles == null) {
            return null;
        }
        return roles;
    }
}
