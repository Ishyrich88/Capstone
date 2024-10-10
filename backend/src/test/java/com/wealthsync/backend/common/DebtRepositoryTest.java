package com.wealthsync.backend.common;

import com.wealthsync.backend.model.Debt;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class DebtRepositoryTest {

    @Autowired
    private DebtRepository debtRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private Debt testDebt;

    @BeforeEach
    void setUp() {
        // Clean up the debts table before each test
        jdbcTemplate.execute("DELETE FROM debts");

        // Insert a test debt record into the debts table
        testDebt = new Debt();
        testDebt.setUserId(1L);
        testDebt.setDebtName("Student Loan");
        testDebt.setAmount(new BigDecimal("15000.00"));

        // Save the test debt using the repository
        debtRepository.save(testDebt);

        // Retrieve the ID of the saved debt and assign it back to the testDebt object
        Long debtId = jdbcTemplate.queryForObject("SELECT id FROM debts WHERE user_id = ? AND debt_name = ?",
                Long.class, testDebt.getUserId(), testDebt.getDebtName());
        testDebt.setId(debtId);

        System.out.println("Setup: Saved Debt ID = " + testDebt.getId());
    }

    @Test
    public void testFindByUserId() {
        List<Debt> debts = debtRepository.findByUserId(1L);
        System.out.println("testFindByUserId: Number of Debts = " + debts.size());

        assertNotNull(debts, "Debts list should not be null");
        assertEquals(1, debts.size(), "The size of debts list should be 1");
        assertEquals("Student Loan", debts.get(0).getDebtName(), "The debt name should match 'Student Loan'");
    }

    @Test
    public void testFindById() {
        // Retrieve the test debt by its ID
        Optional<Debt> debtOptional = debtRepository.findById(testDebt.getId());
        System.out.println("testFindById: Debt Found = " + debtOptional.isPresent());

        assertTrue(debtOptional.isPresent(), "Debt should be found by its ID");
        Debt debt = debtOptional.get();
        assertEquals("Student Loan", debt.getDebtName(), "Debt name should match 'Student Loan'");
        assertEquals(new BigDecimal("15000.00"), debt.getAmount(), "Debt amount should match 15000.00");
    }

    @Test
    public void testFindAllDebts() {
        List<Debt> debts = debtRepository.findAllDebts();
        System.out.println("testFindAllDebts: Number of Debts = " + debts.size());

        assertNotNull(debts, "Debts list should not be null");
        assertEquals(1, debts.size(), "The size of debts list should be 1");
        assertEquals("Student Loan", debts.get(0).getDebtName(), "The debt name should match 'Student Loan'");
    }

    @Test
    public void testSaveDebt() {
        Debt newDebt = new Debt();
        newDebt.setUserId(1L);
        newDebt.setDebtName("Car Loan");
        newDebt.setAmount(new BigDecimal("20000.00"));

        Debt savedDebt = debtRepository.save(newDebt);

        // Retrieve the ID of the saved debt and assign it back to the newDebt object
        Long debtId = jdbcTemplate.queryForObject("SELECT id FROM debts WHERE user_id = ? AND debt_name = ?",
                Long.class, newDebt.getUserId(), newDebt.getDebtName());
        newDebt.setId(debtId);

        assertNotNull(newDebt.getId(), "The saved debt should have a generated ID");
        System.out.println("testSaveDebt: Saved Debt ID = " + newDebt.getId());

        List<Debt> debts = debtRepository.findByUserId(1L);
        assertNotNull(debts);
        assertEquals(2, debts.size(), "There should be 2 debts after saving a new one");
        assertEquals("Car Loan", savedDebt.getDebtName(), "The new debt name should match 'Car Loan'");
    }

    @Test
    public void testUpdateDebt() {
        // Retrieve the existing debt and update its amount
        Optional<Debt> debtOptional = debtRepository.findById(testDebt.getId());
        assertTrue(debtOptional.isPresent(), "Debt should be found before update");

        Debt debt = debtOptional.get();
        debt.setAmount(new BigDecimal("16000.00"));
        debtRepository.update(debt);

        // Verify that the debt was updated
        Optional<Debt> updatedDebtOptional = debtRepository.findById(debt.getId());
        assertTrue(updatedDebtOptional.isPresent(), "Updated debt should be found");
        assertEquals(new BigDecimal("16000.00"), updatedDebtOptional.get().getAmount(), "The updated debt amount should be 16000.00");
    }

    @Test
    public void testDeleteById() {
        List<Debt> debtsBeforeDelete = debtRepository.findByUserId(1L);
        assertEquals(1, debtsBeforeDelete.size(), "There should be 1 debt before deletion");

        // Delete the debt by ID
        debtRepository.deleteById(testDebt.getId());

        // Retrieve the debts again after deletion
        List<Debt> debtsAfterDelete = debtRepository.findByUserId(1L);
        System.out.println("testDeleteById: Number of Debts After Deletion = " + debtsAfterDelete.size());
        assertEquals(0, debtsAfterDelete.size(), "There should be 0 debts after deletion");
    }
}



