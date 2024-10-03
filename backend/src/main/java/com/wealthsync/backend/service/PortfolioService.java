package com.wealthsync.backend.service;

import com.wealthsync.backend.common.PortfolioRepository;
import com.wealthsync.backend.model.Portfolio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PortfolioService {

    private static final Logger logger = LoggerFactory.getLogger(PortfolioService.class);
    private final PortfolioRepository portfolioRepository;

    // Constructor-based dependency injection for immutability and testing
    public PortfolioService(PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;
    }

    /**
     * Retrieve all portfolios by user ID.
     *
     * @param userId the ID of the user
     * @return list of portfolios associated with the user
     */
    public List<Portfolio> getPortfoliosByUser(Long userId) {
        logger.info("Fetching portfolios for user ID: {}", userId);
        validateUserId(userId);
        return portfolioRepository.findByUserId(userId);
    }

    /**
     * Retrieve a specific portfolio by its ID.
     *
     * @param portfolioId the ID of the portfolio
     * @return the Portfolio object if found
     */
    public Portfolio getPortfolioById(Long portfolioId) {
        logger.info("Fetching portfolio with ID: {}", portfolioId);
        validatePortfolioId(portfolioId);
        return portfolioRepository.findById(portfolioId).orElse(null);
    }

    /**
     * Create a new portfolio for a user.
     *
     * @param userId the ID of the user
     * @param name   the name of the new portfolio
     * @return the created Portfolio object
     */
    @Transactional
    public Portfolio createPortfolio(Long userId, String name) {
        logger.info("Creating portfolio for user ID: {} with name: {}", userId, name);
        validateUserId(userId);
        validatePortfolioName(name);

        Portfolio portfolio = new Portfolio(userId, name);
        return portfolioRepository.save(portfolio);
    }

    /**
     * Delete a portfolio by its ID.
     *
     * @param portfolioId the ID of the portfolio to be deleted
     */
    @Transactional
    public void deletePortfolio(Long portfolioId) {
        logger.info("Deleting portfolio with ID: {}", portfolioId);

        portfolioRepository.findById(portfolioId).ifPresentOrElse(
                portfolio -> portfolioRepository.deleteById(portfolioId),
                () -> {
                    throw new IllegalArgumentException("Portfolio not found with ID: " + portfolioId);
                }
        );

        logger.info("Successfully deleted portfolio with ID: {}", portfolioId);
    }

    /**
     * Validate user ID to ensure it's not null or negative.
     *
     * @param userId the ID of the user
     */
    private void validateUserId(Long userId) {
        if (userId == null || userId <= 0) {
            throw new IllegalArgumentException("User ID must be a positive number.");
        }
    }

    /**
     * Validate portfolio ID to ensure it's not null or negative.
     *
     * @param portfolioId the ID of the portfolio
     */
    private void validatePortfolioId(Long portfolioId) {
        if (portfolioId == null || portfolioId <= 0) {
            throw new IllegalArgumentException("Portfolio ID must be a positive number.");
        }
    }

    /**
     * Validate portfolio name to ensure it's not null or empty.
     *
     * @param name the name of the portfolio
     */
    private void validatePortfolioName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Portfolio name cannot be null or empty.");
        }
    }
}




