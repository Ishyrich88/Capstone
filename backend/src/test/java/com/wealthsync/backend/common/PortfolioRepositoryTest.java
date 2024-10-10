package com.wealthsync.backend.common;

import com.wealthsync.backend.model.Portfolio;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback
@TestInstance(TestInstance.Lifecycle.PER_CLASS) // Optional: To manage test instance lifecycle
public class PortfolioRepositoryTest {

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @BeforeEach
    void setUp() {
        // Clear the portfolios table to ensure a clean state before each test
        jdbcTemplate.execute("DELETE FROM portfolios");

        // Insert a test portfolio record into the portfolios table
        jdbcTemplate.update("INSERT INTO portfolios (user_id, name) VALUES (?, ?)", 1L, "Investment Portfolio");
    }

    @Test
    public void testFindByUserId() {
        // Retrieve portfolios by user ID
        List<Portfolio> portfolios = portfolioRepository.findByUserId(1L);

        // Assert that the result is not null and contains the expected data
        assertNotNull(portfolios, "Portfolios list should not be null");
        assertEquals(1, portfolios.size(), "The size of portfolios list should be 1");
        assertEquals("Investment Portfolio", portfolios.get(0).getName(), "The portfolio name should match 'Investment Portfolio'");
    }

    @Test
    public void testSavePortfolio() {
        // Create a new portfolio instance
        Portfolio newPortfolio = new Portfolio(1L, "Retirement Fund");

        // Save the portfolio using the repository
        String sql = "INSERT INTO portfolios (user_id, name) VALUES (?, ?)";
        jdbcTemplate.update(sql, newPortfolio.getUserId(), newPortfolio.getName());

        // Verify that the portfolio is saved by querying for it
        List<Portfolio> portfolios = portfolioRepository.findByUserId(1L);
        assertNotNull(portfolios);
        assertEquals(2, portfolios.size(), "There should be 2 portfolios after saving a new one");
    }

    @Test
    public void testDeletePortfolio() {
        // Insert another portfolio to ensure we have more than one record
        jdbcTemplate.update("INSERT INTO portfolios (user_id, name) VALUES (?, ?)", 1L, "Short-Term Investments");

        // Retrieve the existing portfolios and delete one of them
        List<Portfolio> portfolios = portfolioRepository.findByUserId(1L);
        assertEquals(2, portfolios.size(), "There should be 2 portfolios before deletion");

        // Delete the first portfolio
        jdbcTemplate.update("DELETE FROM portfolios WHERE id = ?", portfolios.get(0).getId());

        // Verify the deletion
        portfolios = portfolioRepository.findByUserId(1L);
        assertEquals(1, portfolios.size(), "There should be 1 portfolio after deletion");
    }

    @Test
    public void testUpdatePortfolioName() {
        // Retrieve the existing portfolio
        List<Portfolio> portfolios = portfolioRepository.findByUserId(1L);
        Portfolio portfolio = portfolios.get(0);

        // Update the name of the portfolio
        String newName = "Updated Investment Portfolio";
        jdbcTemplate.update("UPDATE portfolios SET name = ? WHERE id = ?", newName, portfolio.getId());

        // Retrieve the updated portfolio and verify the change
        Portfolio updatedPortfolio = portfolioRepository.findByUserId(1L).get(0);
        assertEquals(newName, updatedPortfolio.getName(), "The portfolio name should be updated to 'Updated Investment Portfolio'");
    }
}


