package com.react.demo.controller;

import com.react.demo.dto.UserRecord;
import com.react.demo.service.KeycloakUserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    KeycloakUserService keycloakUserService;

    @Autowired
    public UserController(KeycloakUserService keycloakUserService) {
        this.keycloakUserService = keycloakUserService;
    }

    @GetMapping("/user/details")
    public ResponseEntity getUser(@AuthenticationPrincipal Jwt jwt) {
        if (jwt != null) {
            UserRecord user = new UserRecord(jwt.getClaim("given_name"), jwt.getClaim("family_name"),jwt.getClaim("phone"));
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            //TODO get from userDetails or remove custom auth
            UserRecord user = new UserRecord("tset1", "test2","");
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
    }

    @PutMapping("/user/details")
    public ResponseEntity updateUser(@RequestBody @Valid UserRecord userRecord, @AuthenticationPrincipal Jwt jwt) {
        this.keycloakUserService.updateUser(jwt, userRecord);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
