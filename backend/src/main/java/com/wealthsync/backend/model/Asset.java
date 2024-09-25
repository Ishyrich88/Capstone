package com.wealthsync.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;
import java.math.BigDecimal;
import java.time.LocalDate; // Change to LocalDate for date fields

@Table("assets")
public class Asset {

    @Id
    private Long id;
    private Long userId; // Reference to the User who owns this asset
    private AssetType assetType; // Enum for type of asset (CRYPTO, STOCK, MANUAL)
    private String assetName; // Name of the asset (e.g., Bitcoin, Rolex)
    private String symbol; // Symbol for real-time tracked assets (e.g., BTC, AAPL)
    private BigDecimal value; // Current value of the asset (using BigDecimal for precision)
    private Boolean isRealTimeTracked; // Indicates if the asset is tracked in real-time
    private LocalDate purchaseDate; // Change to LocalDate for the purchase date
    private LocalDate lastUpdated; // Change to LocalDate for the last updated date

    // Constructors, Getters, and Setters
    public Asset() {}

    // Constructor for real-time tracked assets (CRYPTO, STOCK)
    public Asset(Long userId, AssetType assetType, String assetName, String symbol, Boolean isRealTimeTracked) {
        this.userId = userId;
        this.assetType = assetType;
        this.assetName = assetName;
        this.symbol = symbol;
        this.isRealTimeTracked = isRealTimeTracked;
        this.value = BigDecimal.ZERO; // Default initial value (to be updated in real-time)
    }

    // Constructor for manual assets
    public Asset(Long userId, AssetType assetType, String assetName, BigDecimal value, LocalDate purchaseDate, LocalDate lastUpdated) {
        this.userId = userId;
        this.assetType = assetType;
        this.assetName = assetName;
        this.value = value;
        this.purchaseDate = purchaseDate;
        this.lastUpdated = lastUpdated;
        this.isRealTimeTracked = false; // Manual assets are not tracked in real-time
    }

    // Getters and Setters
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

    public AssetType getAssetType() {
        return assetType;
    }

    public void setAssetType(AssetType assetType) {
        this.assetType = assetType;
    }

    public String getAssetName() {
        return assetName;
    }

    public void setAssetName(String assetName) {
        this.assetName = assetName;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public BigDecimal getValue() {
        return value;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }

    public Boolean getIsRealTimeTracked() {
        return isRealTimeTracked;
    }

    public void setIsRealTimeTracked(Boolean isRealTimeTracked) {
        this.isRealTimeTracked = isRealTimeTracked;
    }

    public LocalDate getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(LocalDate purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public LocalDate getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDate lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}


