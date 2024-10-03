package com.wealthsync.backend.service;

import com.wealthsync.backend.common.AssetRepository;
import com.wealthsync.backend.model.Asset;
import com.wealthsync.backend.model.AssetType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AssetService {

    private static final Logger logger = LoggerFactory.getLogger(AssetService.class);

    private final AssetRepository assetRepository;
    private final CryptoService cryptoService;
    private final StockService stockService;

    public AssetService(AssetRepository assetRepository, CryptoService cryptoService, StockService stockService) {
        this.assetRepository = assetRepository;
        this.cryptoService = cryptoService;
        this.stockService = stockService;
    }

    // Get all assets without filtering by user
    public List<Asset> getAllAssets() {
        logger.info("Fetching all assets from the database...");
        return assetRepository.findAllAssets();
    }

    // Get all assets for a specific user
    public List<Asset> getAssetsByUserId(Long userId) {
        logger.info("Fetching assets for user ID: {}", userId);
        return assetRepository.findByUserId(userId);
    }

    // Get assets by portfolio ID
    public List<Asset> getAssetsByPortfolioId(Long portfolioId) {
        logger.info("Fetching assets for portfolio ID: {}", portfolioId);
        return assetRepository.findByPortfolioId(portfolioId);
    }

    // Get asset by ID
    public Optional<Asset> getAssetById(Long id) {
        logger.info("Fetching asset with ID: {}", id);
        return assetRepository.findById(id);
    }

    // Add a new asset with validation and setting up initial values
    @Transactional
    public Asset addAsset(Asset asset) {
        logger.info("Adding a new asset: {}", asset.getAssetName());
        validateAsset(asset);

        // Set initial value for real-time tracked assets
        if (asset.getIsRealTimeTracked()) {
            BigDecimal initialValue = fetchRealTimePrice(asset);
            asset.setValue(initialValue != null ? initialValue : BigDecimal.ZERO); // Initial value fetched or set to 0
            asset.setLastUpdated(LocalDate.now()); // Set last updated date for real-time tracked assets
        } else {
            asset.setLastUpdated(null); // No need for last updated date for manual assets
        }

        return assetRepository.save(asset);
    }

    // Update an existing asset
    @Transactional
    public Asset updateAsset(Long id, Asset asset) {
        logger.info("Updating asset with ID: {}", id);
        validateAsset(asset);

        Asset assetToUpdate = assetRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Asset not found with ID: " + id));

        logger.info("Original Asset: {}, New Asset: {}", assetToUpdate, asset);

        // Update fields based on the new data
        assetToUpdate.setAssetName(asset.getAssetName());
        assetToUpdate.setAssetType(asset.getAssetType());
        assetToUpdate.setValue(asset.getValue());
        assetToUpdate.setSymbol(asset.getSymbol());
        assetToUpdate.setIsRealTimeTracked(asset.getIsRealTimeTracked());
        assetToUpdate.setPortfolioId(asset.getPortfolioId()); // Ensure portfolio ID is updated

        // Update lastUpdated date only if it's a real-time tracked asset
        if (asset.getIsRealTimeTracked()) {
            BigDecimal updatedPrice = fetchRealTimePrice(assetToUpdate); // Fetch latest price if needed
            assetToUpdate.setValue(updatedPrice != null ? updatedPrice : assetToUpdate.getValue());
            assetToUpdate.setLastUpdated(LocalDate.now());
        } else {
            assetToUpdate.setLastUpdated(null);
        }

        logger.info("Updated Asset: {}", assetToUpdate);

        return assetRepository.update(assetToUpdate);
    }

    // Delete an asset by ID
    @Transactional
    public void deleteAsset(Long id) {
        logger.info("Deleting asset with ID: {}", id);
        assetRepository.findById(id).ifPresentOrElse(
                asset -> {
                    logger.info("Asset found. Proceeding with deletion: {}", asset);
                    assetRepository.deleteById(id);
                },
                () -> {
                    throw new IllegalArgumentException("Asset not found with ID: " + id);
                });
    }

    // Get all assets that are tracked in real-time
    public List<Asset> getRealTimeTrackedAssets() {
        logger.info("Fetching all real-time tracked assets...");
        return assetRepository.findByIsRealTimeTracked(true);
    }

    // General validation for assets
    private void validateAsset(Asset asset) {
        if (asset.getAssetName() == null || asset.getAssetName().isEmpty()) {
            throw new IllegalArgumentException("Asset name cannot be empty.");
        }

        // Validation for real-time tracked assets
        if (asset.getIsRealTimeTracked()) {
            if (asset.getSymbol() == null || asset.getSymbol().isEmpty()) {
                throw new IllegalArgumentException("Real-time tracked assets must have a valid symbol.");
            }
            if (asset.getAssetType() == null || !(asset.getAssetType() == AssetType.CRYPTO || asset.getAssetType() == AssetType.STOCK)) {
                throw new IllegalArgumentException("Real-time tracked assets must have a valid asset type (CRYPTO or STOCK).");
            }
        } else {
            // Validation for manual assets
            if (asset.getValue() == null || asset.getValue().compareTo(BigDecimal.ZERO) < 0) {
                throw new IllegalArgumentException("Manual assets must have a valid value greater than or equal to 0.");
            }
        }
    }

    // Fetch initial or real-time price for a real-time tracked asset (CRYPTO or STOCK)
    private BigDecimal fetchRealTimePrice(Asset asset) {
        BigDecimal price = BigDecimal.ZERO;

        try {
            if (asset.getAssetType() == AssetType.CRYPTO) {
                price = cryptoService.getCryptoPrice(asset.getSymbol());
            } else if (asset.getAssetType() == AssetType.STOCK) {
                price = stockService.getStockPrice(asset.getSymbol());
            }
            logger.info("Fetched real-time price for asset {}: {}", asset.getAssetName(), price);
        } catch (Exception e) {
            logger.error("Error fetching real-time price for asset {}: {}", asset.getAssetName(), e.getMessage());
        }

        return price;
    }
}









