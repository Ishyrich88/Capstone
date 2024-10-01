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

    // Get portfolios by user ID
    @GetMapping("/{userId}")
    public List<Portfolio> getPortfoliosByUser(@PathVariable Long userId) {
        return portfolioService.getPortfoliosByUser(userId);
    }

    // Create a new portfolio
    @PostMapping
    public ResponseEntity<Portfolio> createPortfolio(@RequestBody Portfolio portfolio) {
        Portfolio newPortfolio = portfolioService.createPortfolio(portfolio.getUserId(), portfolio.getName());
        return ResponseEntity.ok(newPortfolio);
    }

    // Delete a portfolio by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePortfolio(@PathVariable Long id) {
        portfolioService.deletePortfolio(id);
        return ResponseEntity.noContent().build();
    }
}



