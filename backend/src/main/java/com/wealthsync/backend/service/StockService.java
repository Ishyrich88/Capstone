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

    @Value("${alpha.vantage.api.key}")
    private String alphaVantageApiKey;

    private final String ALPHA_VANTAGE_URL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=";

    @Cacheable(value = "stockPrices", key = "#symbol")
    public BigDecimal getStockPrice(String symbol) {
        try {
            logger.debug("Fetching stock price for symbol: {}", symbol);

            RestTemplate restTemplate = new RestTemplate();
            String url = ALPHA_VANTAGE_URL + symbol + "&apikey=" + alphaVantageApiKey;
            String response = restTemplate.getForObject(url, String.class);

            logger.debug("Alpha Vantage response for symbol {}: {}", symbol, response);

            JSONObject json = new JSONObject(response);
            if (json.has("Global Quote") && json.getJSONObject("Global Quote").has("05. price")) {
                BigDecimal price = json.getJSONObject("Global Quote").getBigDecimal("05. price");
                logger.info("Fetched stock price for {}: {}", symbol, price);
                return price;
            } else {
                logger.warn("Invalid response structure or missing price data for symbol: {}", symbol);
                logger.warn("Response from Alpha Vantage: {}", json.toString(2)); // Pretty-print JSON for clarity
            }
        } catch (HttpClientErrorException e) {
            logger.error("Error fetching stock price for symbol {}: {}", symbol, e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error while fetching stock price for symbol {}: {}", symbol, e.getMessage());
        }

        return BigDecimal.ZERO;
    }
}








