package com.wealthsync.backend.loader;

import com.wealthsync.backend.model.Asset;
import com.wealthsync.backend.model.AssetType;
import com.wealthsync.backend.common.AssetRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
public class DataLoader implements CommandLineRunner {

    private final AssetRepository assetRepository;

    public DataLoader(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Date formatter for parsing date strings
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        // Cryptocurrencies (tracked via CoinGecko)
        assetRepository.save(new Asset(1L, AssetType.CRYPTO, "Bitcoin", "BTC", true));
        assetRepository.save(new Asset(1L, AssetType.CRYPTO, "Ethereum", "ETH", true));

        // Stocks (tracked via Alpha Vantage)
        assetRepository.save(new Asset(1L, AssetType.STOCK, "Apple", "AAPL", true));
        assetRepository.save(new Asset(1L, AssetType.STOCK, "Tesla", "TSLA", true));

        // Manually entered assets (use BigDecimal for value, LocalDate for dates)
        assetRepository.save(new Asset(
                1L,
                AssetType.MANUAL,
                "Real Estate",
                new BigDecimal("500000"),
                LocalDate.parse("2022-01-01", formatter),
                LocalDate.parse("2022-12-31", formatter)
        ));

        assetRepository.save(new Asset(
                1L,
                AssetType.MANUAL,
                "Luxury Watch",
                new BigDecimal("15000"),
                LocalDate.parse("2021-06-15", formatter),
                LocalDate.parse("2023-01-01", formatter)
        ));
    }
}


