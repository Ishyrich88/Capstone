package com.wealthsync.backend.service;

import com.wealthsync.backend.common.AssetRepository;
import com.wealthsync.backend.model.Asset;
import com.wealthsync.backend.model.AssetType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class AssetUpdateService {

    private static final Logger logger = LoggerFactory.getLogger(AssetUpdateService.class);

    private final AssetRepository assetRepository;
    private final CryptoService cryptoService;
    private final StockService stockService;

    public AssetUpdateService(AssetRepository assetRepository, CryptoService cryptoService, StockService stockService) {
        this.assetRepository = assetRepository;
        this.cryptoService = cryptoService;
        this.stockService = stockService;
    }

    // Scheduled to run every 2 hours
    @Scheduled(fixedRate = 7200000)
    public void updateAssetPrices() {
        List<Asset> assets = assetRepository.findByIsRealTimeTracked(true); // Fetch real-time tracked assets

        for (Asset asset : assets) {
            BigDecimal newPrice = BigDecimal.ZERO;

            try {
                // Fetch price based on asset type
                if (asset.getAssetType() == AssetType.CRYPTO) {
                    newPrice = cryptoService.getCryptoPrice(asset.getSymbol());
                } else if (asset.getAssetType() == AssetType.STOCK) {
                    newPrice = stockService.getStockPrice(asset.getSymbol());
                }

                // If a valid price is fetched, update the asset
                if (newPrice.compareTo(BigDecimal.ZERO) > 0) {
                    asset.setValue(newPrice);
                    asset.setLastUpdated(LocalDate.now());  // Updated to use LocalDate instead of LocalDateTime
                    assetRepository.save(asset); // Update the asset in the database
                    logger.info("Updated asset price for {}: {}", asset.getAssetName(), newPrice);
                } else {
                    logger.warn("Failed to fetch valid price for asset: {}", asset.getAssetName());
                }
            } catch (Exception e) {
                logger.error("Error updating price for asset {}: {}", asset.getAssetName(), e.getMessage());
            }
        }
    }
}

