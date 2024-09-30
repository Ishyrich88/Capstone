package com.wealthsync.backend.service;

import com.wealthsync.backend.common.UserRepository;
import com.wealthsync.backend.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        logger.debug("Attempting to find user by email: {}", email);
        User user = userRepository.findByEmail(email);
        if (user == null) {
            logger.error("User not found with email: {}", email);
            throw new UsernameNotFoundException("User not found");
        }
        logger.debug("User found: {}", user.getEmail());
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(), // The password should be stored as {noop}plainTextPassword
                new ArrayList<>()
        );
    }
}




