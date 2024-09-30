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
        // Validate that the asset name is not empty
        if (!asset.assetName || asset.assetName.trim() === '') {
            throw new Error('Asset name cannot be empty.');
        }

        // Validate that asset value is present and is a number
        if (!asset.value || isNaN(parseFloat(asset.value))) {
            throw new Error('Asset value must be a number.');
        }

        // If the asset is real-time tracked, ensure that a symbol is provided
        if (asset.isRealTimeTracked && (!asset.symbol || asset.symbol.trim() === '')) {
            throw new Error('Symbol is required for real-time tracked assets.');
        }

        // Make the API call to add the asset
        const response = await axios.post(`${BASE_URL}/assets`, asset);
        return response.data;
    } catch (error) {
        console.error('Error adding asset:', error);
        throw error;
    }
};

