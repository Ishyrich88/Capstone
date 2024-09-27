package com.wealthsync.backend.common;

import com.wealthsync.backend.model.Debt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class DebtRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Find all debts by user ID
    public List<Debt> findByUserId(Long userId) {
        String sql = "SELECT * FROM debts WHERE user_id = ?";
        return jdbcTemplate.query(sql, new Object[]{userId}, new BeanPropertyRowMapper<>(Debt.class));
    }

    // Find a debt by its ID
    public Optional<Debt> findById(Long id) {
        String sql = "SELECT * FROM debts WHERE id = ?";
        List<Debt> debts = jdbcTemplate.query(sql, new Object[]{id}, new BeanPropertyRowMapper<>(Debt.class));
        return debts.isEmpty() ? Optional.empty() : Optional.of(debts.get(0));
    }

    // Find all debts in the system
    public List<Debt> findAllDebts() {
        String sql = "SELECT * FROM debts";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Debt.class));
    }

    // Save a new debt
    public Debt save(Debt debt) {
        String sql = "INSERT INTO debts (user_id, debt_name, amount) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, debt.getUserId(), debt.getDebtName(), debt.getAmount());
        return debt;
    }

    // Update an existing debt
    public Debt update(Debt debt) {
        String sql = "UPDATE debts SET user_id = ?, debt_name = ?, amount = ? WHERE id = ?";
        jdbcTemplate.update(sql, debt.getUserId(), debt.getDebtName(), debt.getAmount(), debt.getId());
        return debt;
    }

    // Delete a debt by ID
    public void deleteById(Long id) {
        String sql = "DELETE FROM debts WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}






