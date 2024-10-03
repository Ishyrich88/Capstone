package com.wealthsync.backend.controller;

import com.wealthsync.backend.model.Portfolio;
import com.wealthsync.backend.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolios")
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;

    // Get all portfolios by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Portfolio>> getPortfoliosByUser(@PathVariable Long userId) {
        try {
            List<Portfolio> portfolios = portfolioService.getPortfoliosByUser(userId);
            if (portfolios.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(portfolios);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Get a specific portfolio by its ID
    @GetMapping("/{id}")
    public ResponseEntity<Portfolio> getPortfolioById(@PathVariable Long id) {
        try {
            Portfolio portfolio = portfolioService.getPortfolioById(id);
            if (portfolio == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(portfolio);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Create a new portfolio
    @PostMapping
    public ResponseEntity<Portfolio> createPortfolio(@RequestBody Portfolio portfolio) {
        try {
            Portfolio newPortfolio = portfolioService.createPortfolio(portfolio.getUserId(), portfolio.getName());
            return ResponseEntity.ok(newPortfolio);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Delete a portfolio by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePortfolio(@PathVariable Long id) {
        try {
            portfolioService.deletePortfolio(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}



