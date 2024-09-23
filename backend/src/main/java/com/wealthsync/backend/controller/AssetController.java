package com.wealthsync.backend.controller;

import com.wealthsync.backend.model.Asset;
import com.wealthsync.backend.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/assets")
public class AssetController {

    @Autowired
    private AssetService assetService;

    // Get all assets for a specific user
    @GetMapping("/user/{userId}")
    public List<Asset> getAssetsByUserId(@PathVariable Long userId) {
        return assetService.getAssetsByUserId(userId);
    }

    // Add a new asset
    @PostMapping("/add")
    public Asset addAsset(@RequestBody Asset asset) {
        return assetService.addAsset(asset);
    }

    // Update an asset
    @PutMapping("/update/{id}")
    public Asset updateAsset(@PathVariable Long id, @RequestBody Asset asset) {
        asset.setId(id);
        return assetService.updateAsset(asset);
    }

    // Delete an asset by ID
    @DeleteMapping("/delete/{id}")
    public void deleteAsset(@PathVariable Long id) {
        assetService.deleteAsset(id);
    }
}
