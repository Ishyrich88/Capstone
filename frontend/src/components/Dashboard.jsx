// src/components/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchAssets } from '../services/assetService';
import { fetchDebts } from '../services/debtService';
import { getUserId } from '../services/utils'; // Import getUserId utility function

const Dashboard = () => {
    const [netWorth, setNetWorth] = useState(0);
    const [totalAssets, setTotalAssets] = useState(0);
    const [totalDebts, setTotalDebts] = useState(0);
    const [goal, setGoal] = useState(0);
    const [progress, setProgress] = useState(0);
    const [userId, setUserId] = useState(null); // State for userId

    const navigate = useNavigate();

    // Fetch User ID
    const fetchUserId = async () => {
        const storedUserId = getUserId(); // Check if userId is stored in localStorage
        if (storedUserId) {
            setUserId(storedUserId);
            console.log(`User ID retrieved from localStorage: ${storedUserId}`);
        } else {
            try {
                const jwtToken = localStorage.getItem('token');
                if (!jwtToken) {
                    console.error('JWT token not found in local storage');
                    return;
                }

                // Fetch user information from the backend
                const response = await axios.get('http://localhost:8080/auth/userinfo', {
                    headers: { Authorization: `Bearer ${jwtToken}` },
                });
                setUserId(response.data.id);
                console.log('User ID fetched from API:', response.data.id);
            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        }
    };

    useEffect(() => {
        fetchUserId();
    }, []);

    useEffect(() => {
        if (userId) {
            // Fetch assets and debts and calculate net worth
            fetchUserData(userId);
        } else {
            console.error('User ID not found. Data fetching will not be performed.');
        }
    }, [userId]);

    // Fetch assets and debts data for the user
    const fetchUserData = async (userId) => {
        try {
            const assets = await fetchAssets(userId);
            const debts = await fetchDebts(userId);

            // Calculate total assets and total debts
            const totalAssetsValue = assets.reduce((sum, asset) => sum + asset.value, 0);
            const totalDebtsValue = debts.reduce((sum, debt) => sum + debt.amount, 0);

            // Calculate net worth
            const calculatedNetWorth = totalAssetsValue - totalDebtsValue;

            setTotalAssets(totalAssetsValue);
            setTotalDebts(totalDebtsValue);
            setNetWorth(calculatedNetWorth);

            // Calculate progress towards goal
            if (goal > 0) {
                const progressPercentage = ((calculatedNetWorth / goal) * 100).toFixed(2);
                setProgress(Math.min(progressPercentage, 100)); // Limit progress to 100%
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    // Handle setting a new goal
    const handleSetGoal = (e) => {
        e.preventDefault();
        if (goal > 0) {
            const progressPercentage = ((netWorth / goal) * 100).toFixed(2);
            setProgress(Math.min(progressPercentage, 100)); // Limit progress to 100%
        }
    };

    const handlePortfolioNavigation = () => {
        navigate('/portfolioManagement');
    };

    return (
        <div className="dashboard container mx-auto p-4 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
            <button onClick={handlePortfolioNavigation} className="bg-blue-500 text-white p-2 rounded mb-4">
                Manage Portfolios
            </button>

            {/* Net Worth Display */}
            <div className="net-worth-display mb-6 p-4 bg-white rounded-lg shadow-md text-center">
                <h2 className="text-xl font-semibold mb-2">Net Worth: ${netWorth.toFixed(2)}</h2>
                <p>Total Assets: ${totalAssets.toFixed(2)}</p>
                <p>Total Debts: ${totalDebts.toFixed(2)}</p>
            </div>

            {/* Set Net Worth Goal */}
            <div className="set-goal mb-6 p-4 bg-white rounded-lg shadow-md text-center">
                <h3 className="text-lg font-semibold mb-3">Set Your Net Worth Goal</h3>
                <form onSubmit={handleSetGoal}>
                    <input
                        type="number"
                        placeholder="Enter your net worth goal"
                        value={goal || ''}
                        onChange={(e) => setGoal(parseFloat(e.target.value))}
                        className="p-2 border w-full mb-4 rounded"
                    />
                    <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">
                        Set Goal
                    </button>
                </form>
            </div>

            {/* Progress Bar */}
            <div className="progress-bar-container p-4 bg-white rounded-lg shadow-md text-center">
                <h3 className="text-lg font-semibold mb-3">Progress Towards Your Goal</h3>
                <div className="progress-bar w-full bg-gray-300 rounded h-6">
                    <div
                        className="bg-green-500 h-6 rounded text-white flex items-center justify-center"
                        style={{ width: `${progress}%` }}
                    >
                        {progress > 0 ? `${progress}%` : '0%'}
                    </div>
                </div>
                {goal > 0 && (
                    <p className="mt-2">
                        You have achieved {progress}% of your goal. Keep going!
                    </p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
























                    

