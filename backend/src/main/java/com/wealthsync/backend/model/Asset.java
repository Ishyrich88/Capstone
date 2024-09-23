package com.wealthsync.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("assets")
public class Asset {

    @Id
    private Long id;
    private Long userId; // Reference to the User who owns this asset
    private String assetType; // Type of asset (e.g., crypto, stock, real estate)
    private String assetName; // Name of the asset (e.g., Bitcoin, Rolex)
    private Double value; // Current value of the asset
    private String purchaseDate; // Date asset was purchased
    private String lastUpdated; // Last time asset value was updated

    // Constructors, Getters, and Setters
    public Asset() {}

    public Asset(Long userId, String assetType, String assetName, Double value, String purchaseDate, String lastUpdated) {
        this.userId = userId;
        this.assetType = assetType;
        this.assetName = assetName;
        this.value = value;
        this.purchaseDate = purchaseDate;
        this.lastUpdated = lastUpdated;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getAssetType() {
        return assetType;
    }

    public void setAssetType(String assetType) {
        this.assetType = assetType;
    }

    public String getAssetName() {
        return assetName;
    }

    public void setAssetName(String assetName) {
        this.assetName = assetName;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public String getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(String purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public String getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(String lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}

