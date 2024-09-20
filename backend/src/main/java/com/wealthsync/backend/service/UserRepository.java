package com.wealthsync.backend.service;

import com.wealthsync.backend.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    // Find a user by their email address
    User findByEmail(String email);
}
