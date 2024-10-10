package com.wealthsync.backend.common;

import com.wealthsync.backend.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private User testUser;

    @BeforeEach
    void setUp() {
        // First, delete dependent records from all tables that have a foreign key referencing the `users` table
        jdbcTemplate.execute("DELETE FROM debts");
        jdbcTemplate.execute("DELETE FROM portfolios");

        // Now, delete all entries from the users table to ensure a clean state
        jdbcTemplate.execute("DELETE FROM users");

        // Create a test user and save it to the database before running each test
        testUser = new User();
        testUser.setFirstName("John");
        testUser.setLastName("Doe");
        testUser.setEmail("john.doe@example.com");
        testUser.setPassword("password123");

        // Save the test user to the repository
        userRepository.save(testUser);
    }

    @Test
    public void testFindByEmail() {
        // Call the repository method to find user by email
        User foundUser = userRepository.findByEmail("john.doe@example.com");

        // Assert that the returned user is not null and the email matches
        assertNotNull(foundUser, "User should not be null");
        assertEquals("john.doe@example.com", foundUser.getEmail(), "Email should match");
        assertEquals("John", foundUser.getFirstName(), "First name should match");
        assertEquals("Doe", foundUser.getLastName(), "Last name should match");
    }
}

