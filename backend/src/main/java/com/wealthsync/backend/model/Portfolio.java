package com.wealthsync.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.util.List;

@Table("portfolios")
public class Portfolio {

    @Id
    private Long id;
    private Long userId;  // Reference to the User who owns the portfolio
    private String name;  // Name of the portfolio (e.g., "Retirement Fund", "Short-Term Investments")

    // Constructors, Getters, and Setters
    public Portfolio() {}

    public Portfolio(Long userId, String name) {
        this.userId = userId;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
