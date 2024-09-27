package com.wealthsync.backend.service;

import com.wealthsync.backend.common.AssetRepository;
import com.wealthsync.backend.model.Asset;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AssetService {

    private static final Logger logger = LoggerFactory.getLogger(AssetService.class);

    private final AssetRepository assetRepository;

    public AssetService(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
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

    // Get asset by ID
    public Optional<Asset> getAssetById(Long id) {
        logger.info("Fetching asset with ID: {}", id);
        return assetRepository.findById(id);
    }

    // Add a new asset with validation
    @Transactional
    public Asset addAsset(Asset asset) {
        logger.info("Adding a new asset: {}", asset.getAssetName());
        validateRealTimeAsset(asset);
        return assetRepository.save(asset);
    }

    // Update an existing asset
    @Transactional
    public Asset updateAsset(Long id, Asset asset) {
        logger.info("Updating asset with ID: {}", id);
        validateRealTimeAsset(asset);

        Asset assetToUpdate = assetRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Asset not found with ID: " + id));

        logger.info("Original Asset: {}, New Asset: {}", assetToUpdate, asset);

        // Update fields based on the new data
        assetToUpdate.setAssetName(asset.getAssetName());
        assetToUpdate.setAssetType(asset.getAssetType());
        assetToUpdate.setValue(asset.getValue());
        assetToUpdate.setSymbol(asset.getSymbol());
        assetToUpdate.setIsRealTimeTracked(asset.getIsRealTimeTracked());
        assetToUpdate.setPurchaseDate(asset.getPurchaseDate());
        assetToUpdate.setLastUpdated(asset.getLastUpdated());

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

    // Validation for real-time tracked assets
    private void validateRealTimeAsset(Asset asset) {
        if (asset.getIsRealTimeTracked()) {
            if (asset.getSymbol() == null || asset.getSymbol().isEmpty()) {
                throw new IllegalArgumentException("Real-time tracked assets must have a valid symbol.");
            }
            if (asset.getAssetType() == null) {
                throw new IllegalArgumentException("Real-time tracked assets must have a valid asset type.");
            }
        }
    }
}





