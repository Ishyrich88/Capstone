package com.wealthsync.backend.common;

import com.wealthsync.backend.model.Asset;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class AssetRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Find all assets by user ID
    public List<Asset> findByUserId(Long userId) {
        String sql = "SELECT * FROM assets WHERE user_id = ?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Asset.class), userId);
    }

    // Find all assets by portfolio ID
    public List<Asset> findByPortfolioId(Long portfolioId) {
        String sql = "SELECT * FROM assets WHERE portfolio_id = ?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Asset.class), portfolioId);
    }

    // Find an asset by its ID
    public Optional<Asset> findById(Long id) {
        String sql = "SELECT * FROM assets WHERE id = ?";
        List<Asset> assets = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Asset.class), id);
        return assets.isEmpty() ? Optional.empty() : Optional.of(assets.get(0));
    }

    // Find all assets in the system
    public List<Asset> findAllAssets() {
        String sql = "SELECT * FROM assets";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Asset.class));
    }

    // Find assets tracked in real-time
    public List<Asset> findByIsRealTimeTracked(Boolean isRealTimeTracked) {
        String sql = "SELECT * FROM assets WHERE is_real_time_tracked = ?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Asset.class), isRealTimeTracked);
    }

    // Save a new asset
    public Asset save(Asset asset) {
        String sql = "INSERT INTO assets (user_id, portfolio_id, asset_type, asset_name, symbol, value, is_real_time_tracked, last_updated) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        jdbcTemplate.update(sql, asset.getUserId(), asset.getPortfolioId(), asset.getAssetType().toString(),
                asset.getAssetName(), asset.getSymbol(), asset.getValue(), asset.getIsRealTimeTracked(), asset.getLastUpdated());
        return asset;
    }

    // Update an existing asset
    public Asset update(Asset asset) {
        String sql = "UPDATE assets SET user_id = ?, portfolio_id = ?, asset_type = ?, asset_name = ?, symbol = ?, value = ?, " +
                "is_real_time_tracked = ?, last_updated = ? WHERE id = ?";

        jdbcTemplate.update(sql, asset.getUserId(), asset.getPortfolioId(), asset.getAssetType().toString(),
                asset.getAssetName(), asset.getSymbol(), asset.getValue(), asset.getIsRealTimeTracked(), asset.getLastUpdated(), asset.getId());
        return asset;
    }

    // Delete an asset by ID
    public void deleteById(Long id) {
        String sql = "DELETE FROM assets WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}








