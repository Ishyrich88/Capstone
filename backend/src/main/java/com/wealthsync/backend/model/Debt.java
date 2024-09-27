package com.wealthsync.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.math.BigDecimal;

@Table("debts")  // Map this model to the "debts" table in your database
public class Debt {

    @Id
    private Long id;  // Primary key
    private Long userId;  // Reference to the User who owns this debt
    private String debtName;  // Name of the debt (e.g., Credit Card, Student Loan)
    private BigDecimal amount;  // Amount owed

    // Constructors
    public Debt() {}

    public Debt(Long userId, String debtName, BigDecimal amount) {
        this.userId = userId;
        this.debtName = debtName;
        this.amount = amount;
    }

    // Getters and Setters
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

    public String getDebtName() {
        return debtName;
    }

    public void setDebtName(String debtName) {
        this.debtName = debtName;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}


