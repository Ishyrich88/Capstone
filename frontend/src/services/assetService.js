import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

// Fetch all assets for a specific user
export const fetchAssets = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/assets/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching assets:', error);
        throw error;
    }
};

// Add a new asset with validation
export const addAsset = async (asset) => {
    try {
        console.log("This is the asset in AS 19: ", asset);

        // Validate that the asset name is not empty
        if (!asset.assetName || asset.assetName.trim() === '') {
            throw new Error('Asset name cannot be empty.');
        }

        // Validate that asset value is present and is a number
        if (asset.value === undefined || isNaN(parseFloat(asset.value))) {
            throw new Error('Asset value must be a number.');
        }

        // Validate asset type
        if (!asset.assetType || !['MANUAL', 'STOCK', 'CRYPTO'].includes(asset.assetType)) {
            throw new Error('Asset type must be one of: MANUAL, STOCK, or CRYPTO.');
        }

        // Ensure that if the asset is real-time tracked, a symbol is provided
        if (asset.isRealTimeTracked && (!asset.symbol || asset.symbol.trim() === '')) {
            throw new Error('Symbol is required for real-time tracked assets.');
        }

        // Remove any unnecessary default values
        console.log("Validated asset:", asset);

        // Make the API call to add the asset
        const response = await axios.post(`${BASE_URL}/assets`, asset);
        return response.data;
    } catch (error) {
        console.error('Error adding asset:', error);
        throw error;
    }
};


