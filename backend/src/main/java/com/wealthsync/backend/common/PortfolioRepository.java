package com.wealthsync.backend.common;

import com.wealthsync.backend.model.Portfolio;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PortfolioRepository extends CrudRepository<Portfolio, Long> {

    // Find all portfolios by a specific user
    List<Portfolio> findByUserId(Long userId);
}
