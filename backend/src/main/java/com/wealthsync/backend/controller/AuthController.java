package com.wealthsync.backend.controller;

import com.wealthsync.backend.controller.dto.UserRegistrationRequest;
import com.wealthsync.backend.security.JwtRequest;
import com.wealthsync.backend.security.JwtResponse;
import com.wealthsync.backend.model.User;
import com.wealthsync.backend.service.UserService;
import com.wealthsync.backend.service.UserDetailsServiceImpl;
import com.wealthsync.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody JwtRequest authRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Invalid username or password.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred during login: " + e.getMessage());
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(jwt));
    }

    // Register endpoint
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegistrationRequest request) {
        // Log the registration request
        System.out.println("Registering user: " + request.getEmail());

        // Register the new user
        try {
            User newUser = userService.registerUser(
                    request.getFirstName(),
                    request.getLastName(),
                    request.getEmail(),
                    request.getPassword()
            );

            // Respond with the newly created user's details
            return ResponseEntity.ok(newUser);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred during registration: " + e.getMessage());
        }
    }
}


