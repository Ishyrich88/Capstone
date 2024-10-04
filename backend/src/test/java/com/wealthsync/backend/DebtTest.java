package com.wealthsync.backend;

import com.wealthsync.backend.model.Debt;
import org.junit.jupiter.api.Test;
import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

class DebtTest {

    @Test
    void testDebtCreation() {
        // Arrange
        Long expectedId = 1L;
        Long expectedUserId = 123L;
        String expectedDebtName = "Credit Card";
        BigDecimal expectedAmount = new BigDecimal("5000.00");

        // Act
        Debt debt = new Debt();
        debt.setId(expectedId);
        debt.setUserId(expectedUserId);
        debt.setDebtName(expectedDebtName);
        debt.setAmount(expectedAmount);

        // Assert
        assertEquals(expectedId, debt.getId());
        assertEquals(expectedUserId, debt.getUserId());
        assertEquals(expectedDebtName, debt.getDebtName());
        assertEquals(expectedAmount, debt.getAmount());
    }
}
