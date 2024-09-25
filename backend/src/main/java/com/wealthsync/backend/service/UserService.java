package com.wealthsync.backend.service;

import com.wealthsync.backend.model.User;
import com.wealthsync.backend.common.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Registering a new user with email uniqueness check
    public User registerUser(String email, String plainPassword) {
        // Check if a user with the provided email already exists
        if (userRepository.findByEmail(email) != null) {
            throw new IllegalArgumentException("Email already exists!");
        }

        // Encode the plain password
        String encodedPassword = passwordEncoder.encode(plainPassword);

        // Create a new user and save it in the database
        User user = new User();
        user.setEmail(email);
        user.setPassword(encodedPassword);
        return userRepository.save(user);
    }
}
