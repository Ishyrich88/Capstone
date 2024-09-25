package com.wealthsync.backend.controller;

import com.wealthsync.backend.controller.dto.UserRegistrationRequest;
import com.wealthsync.backend.security.JwtRequest;
import com.wealthsync.backend.security.JwtResponse;
import com.wealthsync.backend.model.User;
import com.wealthsync.backend.service.UserService;
import com.wealthsync.backend.service.UserDetailsServiceImpl;
import com.wealthsync.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
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
    private UserService userService;  // Inject UserService for registration

    @Autowired
    private JwtUtil jwtUtil;

    // Login endpoint
    @PostMapping("/login")
    public JwtResponse login(@RequestBody JwtRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );
        } catch (Exception e) {
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);

        return new JwtResponse(jwt);
    }

    // Register endpoint
    @PostMapping("/register")
    public String register(@RequestBody UserRegistrationRequest request) {
        System.out.println("Registering user: " + request.getEmail());
        User newUser = userService.registerUser(request.getEmail(), request.getPassword());
        return "User registered successfully!";
    }
}
