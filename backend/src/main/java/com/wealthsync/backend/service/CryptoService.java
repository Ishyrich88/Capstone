package com.wealthsync.backend.service;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.HashMap;  // Import HashMap
import java.util.Map;      // Import Map

@Service
public class CryptoService {

    private static final Logger logger = LoggerFactory.getLogger(CryptoService.class);
    private final String COINGECKO_URL = "https://api.coingecko.com/api/v3/simple/price?ids=";

    // Mapping of symbols to CoinGecko IDs
    private static final Map<String, String> symbolToIdMap = new HashMap<>();

    static {
        symbolToIdMap.put("BTC", "bitcoin");
        symbolToIdMap.put("ETH", "ethereum");
        // Add other crypto mappings here if needed
    }

    @Cacheable(value = "cryptoPrices", key = "#symbol") // Simplified cache key
    public BigDecimal getCryptoPrice(String symbol) {
        String coinId = symbolToIdMap.get(symbol.toUpperCase());

        // If coin is not in the map, assume the symbol matches the CoinGecko ID (for flexibility)
        if (coinId == null) {
            coinId = symbol.toLowerCase(); // Fall back to using symbol as CoinGecko ID
        }

        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = COINGECKO_URL + coinId + "&vs_currencies=usd";
            String response = restTemplate.getForObject(url, String.class);

            // Parse JSON response
            JSONObject json = new JSONObject(response);
            return json.getJSONObject(coinId).getBigDecimal("usd");

        } catch (HttpClientErrorException e) {
            logger.error("Error fetching price from CoinGecko API for {}: {}", symbol, e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error while fetching price for {}: {}", symbol, e.getMessage());
        }

        // Return default value if there was any issue
        return BigDecimal.ZERO;
    }
}







