package com.wealthsync.backend.service;

import com.wealthsync.backend.model.Debt;

import java.util.List;
import java.util.Optional;

public interface DebtService {

    // Get all debts for a specific user
    List<Debt> getDebtsByUserId(Long userId);

    // Get a debt by its ID
    Optional<Debt> findById(Long id);  // <-- Add this method

    // Add a new debt
    Debt addDebt(Debt debt);

    // Update an existing debt
    Debt updateDebt(Long id, Debt debt);

    // Delete a debt
    void deleteDebt(Long id);
}





