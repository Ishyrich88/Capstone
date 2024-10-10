package com.wealthsync.backend;

import com.wealthsync.backend.common.AssetRepository;
import com.wealthsync.backend.model.Asset;
import com.wealthsync.backend.model.AssetType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class AssetRepositoryTest {

    @Autowired
    private AssetRepository assetRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private Asset testAsset;

    @BeforeEach
    void setUp() {
        // Clear the assets table before each test to ensure a clean state
        jdbcTemplate.execute("DELETE FROM assets");

        // Clear the users table and insert a test user with the correct columns
        jdbcTemplate.execute("DELETE FROM users");
        jdbcTemplate.update("INSERT INTO users (id, first_name, last_name, email) VALUES (?, ?, ?, ?)",
                1L, "John", "Doe", "john.doe@example.com");

        // Create a test asset object
        testAsset = new Asset();
        testAsset.setUserId(1L);
        testAsset.setPortfolioId(1L);
        testAsset.setAssetType(AssetType.CRYPTO);
        testAsset.setAssetName("Bitcoin");
        testAsset.setSymbol("BTC");
        testAsset.setValue(new BigDecimal("50000.00"));
        testAsset.setIsRealTimeTracked(true);
        testAsset.setLastUpdated(LocalDate.now());

        // Save the test asset to the database
        assetRepository.save(testAsset);
    }

    @Test
    public void testFindByUserId() {
        List<Asset> assets = assetRepository.findByUserId(1L);
        assertNotNull(assets);
        assertEquals(1, assets.size());
        assertEquals("Bitcoin", assets.get(0).getAssetName());
    }

    @Test
    public void testFindByPortfolioId() {
        List<Asset> assets = assetRepository.findByPortfolioId(1L);
        assertNotNull(assets);
        assertEquals(1, assets.size());
        assertEquals("BTC", assets.get(0).getSymbol());
    }

    @Test
    public void testFindAllAssets() {
        List<Asset> assets = assetRepository.findAllAssets();
        assertNotNull(assets);
        assertEquals(1, assets.size());
        assertEquals("Bitcoin", assets.get(0).getAssetName());
    }

    @Test
    public void testFindByIsRealTimeTracked() {
        List<Asset> assets = assetRepository.findByIsRealTimeTracked(true);
        assertNotNull(assets);
        assertEquals(1, assets.size());
        assertTrue(assets.get(0).getIsRealTimeTracked());
    }

    @Test
    public void testUpdate() {
        testAsset.setValue(new BigDecimal("60000.00"));
        Asset updatedAsset = assetRepository.update(testAsset);
        assertNotNull(updatedAsset);
        assertEquals(new BigDecimal("60000.00"), updatedAsset.getValue());
    }

    @Test
    public void testDeleteById() {
        assetRepository.deleteById(testAsset.getId());
        Optional<Asset> deletedAsset = assetRepository.findById(testAsset.getId());
        assertTrue(deletedAsset.isEmpty());
    }
}
