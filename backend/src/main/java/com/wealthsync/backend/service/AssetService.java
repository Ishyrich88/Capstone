package com.wealthsync.backend.service;

import com.wealthsync.backend.common.AssetRepository;
import com.wealthsync.backend.model.Asset;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssetService {

    @Autowired
    private AssetRepository assetRepository;

    // Get all assets for a specific user
    public List<Asset> getAssetsByUserId(Long userId) {
        return assetRepository.findByUserId(userId);
    }

    // Add a new asset
    public Asset addAsset(Asset asset) {
        return assetRepository.save(asset);
    }

    // Update an asset
    public Asset updateAsset(Asset asset) {
        return assetRepository.save(asset);
    }

    // Delete an asset by ID
    public void deleteAsset(Long id) {
        assetRepository.deleteById(id);
    }
}

