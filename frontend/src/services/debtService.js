import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

// Fetch all debts for a specific user
export const fetchDebts = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/debts/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching debts:', error);
        throw error;
    }
};

// Add a new debt
export const addDebt = async (debt) => {
    try {
        const response = await axios.post(`${BASE_URL}/debts`, debt);
        return response.data;
    } catch (error) {
        console.error('Error adding debt:', error);
        throw error;
    }
};

// Get debts by user ID
export const getDebtsByUserId = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/debts/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching debts for user ID ${userId}:`, error);
        throw error;
    }
};

// Delete a debt by debt ID
export const deleteDebt = async (debtId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/debts/${debtId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting debt with ID ${debtId}:`, error);
        throw error;
    }
};




