package com.wealthsync.backend.controller;

import com.wealthsync.backend.model.Asset;
import com.wealthsync.backend.service.AssetService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assets")
public class AssetController {

    @Autowired
    private AssetService assetService;

    private static final Logger logger = LoggerFactory.getLogger(AssetController.class);

    // Get all assets for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Asset>> getAssetsByUserId(@PathVariable Long userId) {
        try {
            logger.info("Fetching assets for user ID: {}", userId);
            List<Asset> assets = assetService.getAssetsByUserId(userId);
            if (assets.isEmpty()) {
                logger.info("No assets found for user ID: {}", userId);
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(assets);
        } catch (Exception e) {
            logger.error("Error fetching assets for user ID: {}: {}", userId, e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    // Add a new asset
    @PostMapping
    public ResponseEntity<Asset> addAsset(@RequestBody Asset asset) {
        try {
            logger.info("Adding new asset: {}", asset);
            Asset newAsset = assetService.addAsset(asset);
            return ResponseEntity.ok(newAsset);
        } catch (Exception e) {
            logger.error("Error adding asset: {}: {}", asset, e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    // Update an asset by ID
    @PutMapping("/{id}")
    public ResponseEntity<Asset> updateAsset(@PathVariable Long id, @RequestBody Asset asset) {
        try {
            logger.info("Updating asset with ID: {}", id);
            Asset updatedAsset = assetService.updateAsset(id, asset); // Pass both ID and Asset object
            return ResponseEntity.ok(updatedAsset);
        } catch (IllegalArgumentException e) {
            logger.warn("Asset not found with ID: {}", id);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            logger.error("Error updating asset with ID: {}: {}", id, e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    // Delete an asset by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAsset(@PathVariable Long id) {
        try {
            logger.info("Deleting asset with ID: {}", id);
            assetService.deleteAsset(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            logger.error("Error deleting asset with ID: {}: {}", id, e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}





