package com.wealthsync.backend.service;

import com.wealthsync.backend.common.DebtRepository;
import com.wealthsync.backend.model.Debt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class DebtServiceImpl implements DebtService {

    private static final Logger logger = LoggerFactory.getLogger(DebtServiceImpl.class);
    private final DebtRepository debtRepository;

    // Constructor-based dependency injection for better immutability and testing
    public DebtServiceImpl(DebtRepository debtRepository) {
        this.debtRepository = debtRepository;
    }

    @Override
    public List<Debt> getDebtsByUserId(Long userId) {
        logger.info("Fetching debts for user ID: {}", userId);
        return debtRepository.findByUserId(userId);
    }

    @Override
    public Optional<Debt> findById(Long id) {
        logger.info("Fetching debt with ID: {}", id);
        return debtRepository.findById(id);
    }

    @Override
    @Transactional  // Ensure atomic operation
    public Debt addDebt(Debt debt) {
        logger.info("Adding new debt: {}", debt.getDebtName());
        validateDebt(debt);
        return debtRepository.save(debt);
    }

    @Override
    @Transactional  // Ensure atomic operation
    public Debt updateDebt(Long id, Debt debt) {
        logger.info("Updating debt with ID: {}", id);
        validateDebt(debt);

        Debt existingDebt = debtRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Debt not found with ID: " + id));

        existingDebt.setUserId(debt.getUserId());
        existingDebt.setDebtName(debt.getDebtName());
        existingDebt.setAmount(debt.getAmount());

        return debtRepository.update(existingDebt);
    }

    @Override
    @Transactional  // Ensure atomic operation
    public void deleteDebt(Long id) {
        logger.info("Deleting debt with ID: {}", id);
        debtRepository.findById(id).ifPresentOrElse(
                debt -> debtRepository.deleteById(id),
                () -> {
                    throw new IllegalArgumentException("Debt not found with ID: " + id);
                }
        );
    }

    // Method to validate Debt fields before saving or updating
    private void validateDebt(Debt debt) {
        if (debt.getDebtName() == null || debt.getDebtName().isEmpty()) {
            throw new IllegalArgumentException("Debt name cannot be null or empty.");
        }
        if (debt.getAmount() == null || debt.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Debt amount must be a positive value.");
        }
    }
}
