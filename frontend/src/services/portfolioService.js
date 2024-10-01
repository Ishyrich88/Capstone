import axios from 'axios';

// Base URL for the backend API
const BASE_URL = 'http://localhost:8080/api/portfolios';

// Function to get the Authorization header with JWT
const getAuthHeader = () => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    if (token) {
        return { headers: { Authorization: `Bearer ${token}` } };
    }
    return {};
};

// Fetch portfolios by user ID
export const fetchPortfoliosByUserId = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${userId}`, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error(`Error fetching portfolios for user ID ${userId}:`, error);
        throw error;
    }
};

// Add a new portfolio
export const addPortfolio = async (portfolio) => {
    try {
        const response = await axios.post(`${BASE_URL}`, portfolio, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error('Error adding portfolio:', error);
        throw error;
    }
};

// Delete a portfolio by ID
export const deletePortfolio = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`, getAuthHeader());
    } catch (error) {
        console.error(`Error deleting portfolio with ID ${id}:`, error);
        throw error;
    }
};


