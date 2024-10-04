package com.wealthsync.backend.service;

import com.wealthsync.backend.common.UserRepository;
import com.wealthsync.backend.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Registers a new user with all fields populated.
     *
     * @param firstName User's first name.
     * @param lastName  User's last name.
     * @param email     User's email address.
     * @param password  User's plain-text password.
     * @return The registered User object.
     */
    public User registerUser(String firstName, String lastName, String email, String password) {
        logger.debug("Registering user with email: {}", email);

        // Validate input fields
        if (email == null || email.trim().isEmpty() || password == null || password.trim().isEmpty()) {
            throw new IllegalArgumentException("Email and password must be provided.");
        }

        if (userRepository.findByEmail(email) != null) {
            logger.warn("User with email {} already exists.", email);
            throw new IllegalArgumentException("User with this email already exists.");
        }

        // Create a new User object and populate its fields
        User newUser = new User();
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setEmail(email);

        // Save the password as plain text (no prefix or encoding)
        newUser.setPassword(password);

        // Save the new user to the database using the repository
        User savedUser = userRepository.save(newUser);
        logger.info("User successfully registered with ID: {}", savedUser.getId());

        return savedUser;
    }

    /**
     * Finds a user by email.
     *
     * @param email The email of the user to find.
     * @return The user object, if found.
     */
    public User findByEmail(String email) {
        logger.debug("Looking up user by email: {}", email);
        return userRepository.findByEmail(email);
    }
}






