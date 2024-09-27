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

// Add a new asset
export const addAsset = async (asset) => {
    try {
        const response = await axios.post(`${BASE_URL}/assets`, asset);
        return response.data;
    } catch (error) {
        console.error('Error adding asset:', error);
        throw error;
    }
};

