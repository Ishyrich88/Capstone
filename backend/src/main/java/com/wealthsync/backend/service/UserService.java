package com.wealthsync.backend.service;

import com.wealthsync.backend.model.User;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    // Update this method to handle firstName, lastName, email, and password
    public User registerUser(String firstName, String lastName, String email, String password) {
        User newUser = new User();
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setEmail(email);

        // You should also hash the password before saving (use BCrypt)
        newUser.setPassword(password);

        // Logic to save the new user to the database (using UserRepository, for example)
        // userRepository.save(newUser);

        return newUser;
    }
}

