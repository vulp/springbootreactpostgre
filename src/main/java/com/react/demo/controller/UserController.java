package com.react.demo.controller;

import com.react.demo.dto.UserRecord;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/user/details")
    public ResponseEntity getUser(@AuthenticationPrincipal Jwt jwt) {
        if(jwt != null) {
            UserRecord user = new UserRecord(jwt.getClaim("given_name"), jwt.getClaim("family_name"));
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            //TODO get from userDetails
            UserRecord user = new UserRecord("tset1", "test2");
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
    }
}
