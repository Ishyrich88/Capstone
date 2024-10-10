package com.wealthsync.backend.service;

import com.wealthsync.backend.common.AssetRepository;
import com.wealthsync.backend.model.Asset;
import com.wealthsync.backend.model.AssetType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AssetServiceTest {

    @Mock // Mock the AssetRepository to avoid real database calls
    private AssetRepository assetRepository;

    @Mock // Mock the CryptoService and StockService
    private CryptoService cryptoService;

    @Mock
    private StockService stockService;

    @InjectMocks // Inject all mocks into the service under test
    private AssetService assetService;

    private Asset testAsset;

    @BeforeEach
    void setUp() {
        // Create a mock asset object to be used in tests
        testAsset = new Asset();
        testAsset.setId(1L);
        testAsset.setUserId(1L);
        testAsset.setPortfolioId(1L);
        testAsset.setAssetType(AssetType.CRYPTO);
        testAsset.setAssetName("Bitcoin");
        testAsset.setSymbol("BTC");
        testAsset.setValue(new BigDecimal("50000.00"));
        testAsset.setIsRealTimeTracked(true);
        testAsset.setLastUpdated(LocalDate.now());
    }

    @Test
    void testGetAssetsByUserId() {
        // Mock the repository's findByUserId method
        when(assetRepository.findByUserId(1L)).thenReturn(Arrays.asList(testAsset));

        // Call the service method
        List<Asset> assets = assetService.getAssetsByUserId(1L);

        // Assertions to verify the expected behavior
        assertNotNull(assets); // Check if the returned list is not null
        assertEquals(1, assets.size()); // Check if the returned list has one asset
        assertEquals("Bitcoin", assets.get(0).getAssetName()); // Check if the asset name is "Bitcoin"

        // Verify that the findByUserId method was called exactly once
        verify(assetRepository, times(1)).findByUserId(1L);
    }
}

