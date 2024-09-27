package com.wealthsync.backend.controller;

import com.wealthsync.backend.model.Debt;
import com.wealthsync.backend.service.DebtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/debts")
public class DebtController {

    @Autowired
    private DebtService debtService;

    private static final Logger logger = LoggerFactory.getLogger(DebtController.class);

    // Get all debts for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Debt>> getDebtsByUserId(@PathVariable Long userId) {
        try {
            logger.info("Fetching debts for user ID: {}", userId);
            List<Debt> debts = debtService.getDebtsByUserId(userId);
            if (debts.isEmpty()) {
                logger.info("No debts found for user ID: {}", userId);
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(debts);
        } catch (Exception e) {
            logger.error("Error fetching debts for user ID: {}: {}", userId, e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    // Get a specific debt by its ID
    @GetMapping("/{id}")
    public ResponseEntity<Debt> getDebtById(@PathVariable Long id) {
        try {
            logger.info("Fetching debt with ID: {}", id);
            return debtService.findById(id)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> {
                        logger.warn("Debt not found with ID: {}", id);
                        return ResponseEntity.notFound().build();
                    });
        } catch (Exception e) {
            logger.error("Error fetching debt with ID: {}: {}", id, e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    // Add a new debt
    @PostMapping
    public ResponseEntity<Debt> addDebt(@RequestBody Debt debt) {
        try {
            logger.info("Adding new debt: {}", debt);
            Debt newDebt = debtService.addDebt(debt);
            return ResponseEntity.ok(newDebt);
        } catch (Exception e) {
            logger.error("Error adding debt: {}: {}", debt, e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    // Update a debt by its ID
    @PutMapping("/{id}")
    public ResponseEntity<Debt> updateDebt(@PathVariable Long id, @RequestBody Debt debt) {
        try {
            logger.info("Updating debt with ID: {}", id);
            Debt updatedDebt = debtService.updateDebt(id, debt);
            return ResponseEntity.ok(updatedDebt);
        } catch (IllegalArgumentException e) {
            logger.warn("Debt not found with ID: {}", id);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            logger.error("Error updating debt with ID: {}: {}", id, e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    // Delete a debt by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDebt(@PathVariable Long id) {
        try {
            logger.info("Deleting debt with ID: {}", id);
            debtService.deleteDebt(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            logger.error("Error deleting debt with ID: {}: {}", id, e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}








