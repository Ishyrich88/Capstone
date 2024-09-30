package com.wealthsync.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.math.BigDecimal;
import java.time.LocalDate;

@Table("assets")  // Ensure this matches your table name in the database
public class Asset {

    @Id
    @Column("id")
    private Long id;

    @Column("user_id")
    private Long userId;  // Reference to the User who owns this asset

    @Column("asset_type")
    private AssetType assetType;  // Enum for type of asset (CRYPTO, STOCK, MANUAL)

    @Column("asset_name")
    private String assetName;  // Name of the asset (e.g., Bitcoin, Rolex)

    @Column("symbol")
    private String symbol;  // Symbol for real-time tracked assets (e.g., BTC, AAPL)

    @Column("value")
    private BigDecimal value;  // Current value of the asset

    @Column("is_real_time_tracked")
    private Boolean isRealTimeTracked;  // Indicates if the asset is tracked in real-time

    @Column("last_updated")
    private LocalDate lastUpdated;  // Last updated date, only for real-time tracked assets

    // Default constructor
    public Asset() {}

    // Constructor for real-time tracked assets (CRYPTO, STOCK)
    public Asset(Long userId, AssetType assetType, String assetName, String symbol, Boolean isRealTimeTracked) {
        this.userId = userId;
        this.assetType = assetType;
        this.assetName = assetName;
        this.symbol = symbol;  // Symbol required for real-time tracked assets
        this.isRealTimeTracked = isRealTimeTracked;
        this.value = BigDecimal.ZERO;  // Default initial value for real-time tracked assets
        if (isRealTimeTracked) {
            this.lastUpdated = LocalDate.now();  // Only set lastUpdated for real-time tracked assets
        }
    }

    // Constructor for manual assets
    public Asset(Long userId, AssetType assetType, String assetName, BigDecimal value) {
        this.userId = userId;
        this.assetType = assetType;
        this.assetName = assetName;
        this.value = value;
        this.isRealTimeTracked = false;  // Manual assets are not tracked in real-time
        this.symbol = null;  // No symbol required for manual assets
        this.lastUpdated = null;  // No need to update lastUpdated for manual assets
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

    public LocalDate getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDate lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    @Override
    public String toString() {
        return "Asset{" +
                "id=" + id +
                ", userId=" + userId +
                ", assetType=" + assetType +
                ", assetName='" + assetName + '\'' +
                ", symbol='" + symbol + '\'' +
                ", value=" + value +
                ", isRealTimeTracked=" + isRealTimeTracked +
                ", lastUpdated=" + lastUpdated +
                '}';
    }
}







