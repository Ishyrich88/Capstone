package com.wealthsync.backend.controller;

import com.wealthsync.backend.model.User;
import com.wealthsync.backend.service.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Register a new user
    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        // Check if the email already exists
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return "Error: Email already registered!";
        }

        // Save the new user
        userRepository.save(user);
        return "User registered successfully!";
    }

    // Get all users (for testing purposes)
    @GetMapping("/users")
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by ID
    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }
}