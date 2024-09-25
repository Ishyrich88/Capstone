package com.wealthsync.backend.service;

import com.wealthsync.backend.common.PortfolioRepository;
import com.wealthsync.backend.model.Portfolio;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;

    public PortfolioService(PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;
    }

    public List<Portfolio> getPortfoliosByUser(Long userId) {
        return portfolioRepository.findByUserId(userId);
    }

    public Portfolio createPortfolio(Long userId, String name) {
        Portfolio portfolio = new Portfolio(userId, name);
        return portfolioRepository.save(portfolio);
    }

    public void deletePortfolio(Long portfolioId) {
        portfolioRepository.deleteById(portfolioId);
    }
}

