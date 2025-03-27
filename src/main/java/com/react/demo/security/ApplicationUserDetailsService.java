package com.react.demo.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ApplicationUserDetailsService implements UserDetailsService {
    private final PasswordEncoder passwordEncoder;

    public ApplicationUserDetailsService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // In a real application, you would fetch the user from your database
        if ("testuser".equals(username)) {
            return new User("testuser", passwordEncoder.encode("password"), new ArrayList<>());
        } else {
            throw new UsernameNotFoundException("User not found: " + username);
        }
    }
}
