package com.wealthsync.backend.service;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;

@Service
public class StockService {

    private static final Logger logger = LoggerFactory.getLogger(StockService.class);

    @Value("${alpha.vantage.api.key}") // Inject API key from properties
    private String alphaVantageApiKey;

    private final String ALPHA_VANTAGE_URL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=";

    @Cacheable(value = "stockPrices", key = "#symbol") // Simplified cache key
    public BigDecimal getStockPrice(String symbol) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = ALPHA_VANTAGE_URL + symbol + "&apikey=" + alphaVantageApiKey;
            String response = restTemplate.getForObject(url, String.class);

            // Parse JSON response
            JSONObject json = new JSONObject(response);
            if (json.has("Global Quote")) {
                return json.getJSONObject("Global Quote").getBigDecimal("05. price");
            }

        } catch (HttpClientErrorException e) {
            logger.error("Error fetching price from Alpha Vantage API for {}: {}", symbol, e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error while fetching stock price for {}: {}", symbol, e.getMessage());
        }

        // Return default value if there was an issue
        return BigDecimal.ZERO;
    }
}





