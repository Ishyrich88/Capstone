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
        <div className="mx-auto p-4 text-primary-text font-roboto text-sm w-full min-h-screen" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Dashboard</h1>
      
          <button onClick={handlePortfolioNavigation} className="bg-light-blue-500 text-white font-bold p-3 rounded mb-6 hover:bg-blue-700 transition duration-200 ease-in-out">
            Manage Portfolios
          </button>
      
          {/* Net Worth Display */}
          <div className="net-worth-display mb-6 p-6 rounded-lg shadow-md text-center w-full sm:w-full md:w-full lg:w-1/3 lg:mx-auto" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
            <h2 className="text-xl font-bold mb-2 text-white">Net Worth: ${netWorth.toFixed(2)}</h2>
            <p className="text-white font-semibold">Total Assets: ${totalAssets.toFixed(2)}</p>
            <p className="text-white font-semibold">Total Debts: ${totalDebts.toFixed(2)}</p>
          </div>
      
          {/* Set Net Worth Goal */}
          <div className="set-goal mb-6 p-6 rounded-lg shadow-md text-center w-full sm:w-full md:w-full lg:w-1/3 lg:mx-auto" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
            <h3 className="text-lg font-bold mb-3 text-white">Set Your Net Worth Goal</h3>
            <form onSubmit={handleSetGoal}>
              <input
                type="number"
                placeholder="Enter your net worth goal"
                value={goal || ''}
                onChange={(e) => setGoal(parseFloat(e.target.value))}
                className="p-3 mb-4 w-full border rounded text-black bg-white border-gray-500 font-semibold"
              />
              <button type="submit" className="bg-light-blue-500 text-white font-bold p-3 rounded w-full hover:bg-blue-700 transition duration-200 ease-in-out">
                Set Goal
              </button>
            </form>
          </div>
      
          {/* Progress Bar */}
          <div className="progress-bar-container p-6 rounded-lg shadow-md text-center w-full sm:w-full md:w-full lg:w-1/3 lg:mx-auto" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
            <h3 className="text-lg font-bold mb-3 text-white">Progress Towards Your Goal</h3>
            <div className="progress-bar w-full bg-gray-300 rounded h-6">
              <div
                className="h-6 rounded text-white flex items-center justify-center"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, red 0%, yellow 50%, green 100%)`,
                }}
              >
                {progress > 0 ? `${progress}%` : '0%'}
              </div>
            </div>
            {goal > 0 && (
              <p className="mt-2 text-white">
                You have achieved {progress}% of your goal. Keep going!
              </p>
            )}
          </div>
        </div>
      );
};

export default Dashboard;
























                    

