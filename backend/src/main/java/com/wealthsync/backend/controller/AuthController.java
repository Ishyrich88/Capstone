package com.wealthsync.backend.controller;

import com.wealthsync.backend.controller.dto.UserRegistrationRequest;
import com.wealthsync.backend.model.User;
import com.wealthsync.backend.security.JwtRequest;
import com.wealthsync.backend.security.JwtResponse;
import com.wealthsync.backend.security.JwtUtil;
import com.wealthsync.backend.service.UserDetailsServiceImpl;
import com.wealthsync.backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

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
        logger.info("Attempting to authenticate user: {}", authRequest.getEmail());

        try {
            // Manually log details of the authentication request
            logger.debug("Received login request: {}", authRequest);

            // AuthenticationManager will attempt to authenticate the user based on the provided email and password
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword(), Collections.emptyList())
            );

            // If successful, log and retrieve user details
            logger.info("Authentication successful for user: {}", authRequest.getEmail());
            UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getEmail());

            // Generate JWT token
            final String jwt = jwtUtil.generateToken(userDetails);
            logger.info("Generated JWT token for user: {}", authRequest.getEmail());

            // Return JWT token in the response
            return ResponseEntity.ok(new JwtResponse(jwt));

        } catch (BadCredentialsException e) {
            logger.warn("Invalid credentials for user: {}", authRequest.getEmail());
            return ResponseEntity.status(401).body("Invalid username or password.");
        } catch (Exception e) {
            logger.error("An error occurred during login for user: {}. Error: {}", authRequest.getEmail(), e.getMessage());
            return ResponseEntity.status(500).body("An error occurred during login: " + e.getMessage());
        }
    }

    // Register endpoint
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegistrationRequest request) {
        logger.info("Registering new user: {}", request.getEmail());

        try {
            // Register the new user
            User newUser = userService.registerUser(
                    request.getFirstName(),
                    request.getLastName(),
                    request.getEmail(),
                    request.getPassword()
            );

            logger.info("Successfully registered user with ID: {}", newUser.getId());
            return ResponseEntity.ok(newUser);

        } catch (IllegalArgumentException e) {
            logger.warn("User registration failed due to invalid input: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Invalid input: " + e.getMessage());
        } catch (Exception e) {
            logger.error("An error occurred during registration: {}", e.getMessage());
            return ResponseEntity.status(500).body("An error occurred during registration: " + e.getMessage());
        }
    }
}


