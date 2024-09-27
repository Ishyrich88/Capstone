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
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class AssetUpdateService {

    private static final Logger logger = LoggerFactory.getLogger(AssetUpdateService.class);

    private final AssetRepository assetRepository;
    private final CryptoService cryptoService;
    private final StockService stockService;

    private final Set<Long> updatedAssets = new HashSet<>();

    public AssetUpdateService(AssetRepository assetRepository, CryptoService cryptoService, StockService stockService) {
        this.assetRepository = assetRepository;
        this.cryptoService = cryptoService;
        this.stockService = stockService;
    }

    @Scheduled(fixedRate = 7200000, initialDelay = 5000) // Run every 2 hours with a delay of 5 seconds
    public void updateAssetPrices() {
        logger.info("Starting asset price update process...");

        synchronized (this) {
            List<Asset> assets = assetRepository.findByIsRealTimeTracked(true);
            logger.info("Fetched {} assets for price update.", assets.size());

            for (Asset asset : assets) {
                if (updatedAssets.contains(asset.getId())) {
                    logger.info("Skipping already updated asset: {}", asset.getAssetName());
                    continue;
                }

                logger.debug("Updating asset: ID={}, Name={}, Type={}, Symbol={}",
                        asset.getId(), asset.getAssetName(), asset.getAssetType(), asset.getSymbol());

                BigDecimal newPrice = BigDecimal.ZERO;
                try {
                    if (asset.getAssetType() == AssetType.CRYPTO) {
                        newPrice = cryptoService.getCryptoPrice(asset.getSymbol());
                    } else if (asset.getAssetType() == AssetType.STOCK) {
                        newPrice = stockService.getStockPrice(asset.getSymbol());
                    }

                    if (newPrice.compareTo(BigDecimal.ZERO) > 0) {
                        logger.info("Fetched new price for {}: {}", asset.getAssetName(), newPrice);
                        asset.setValue(newPrice);
                        asset.setLastUpdated(LocalDate.now());
                        assetRepository.update(asset);

                        logger.info("Successfully updated asset price for {}: {}", asset.getAssetName(), newPrice);
                        updatedAssets.add(asset.getId());
                    } else {
                        logger.warn("Failed to fetch valid price for asset: {}", asset.getAssetName());
                    }
                } catch (Exception e) {
                    logger.error("Error updating price for asset {}: {}", asset.getAssetName(), e.getMessage(), e);
                }
            }

            logger.info("Clearing updated assets set.");
            updatedAssets.clear(); // Ensure this clears at the end of each run to avoid unnecessary repeats.

            logger.info("Completed asset price update process.");
        }
    }
}









