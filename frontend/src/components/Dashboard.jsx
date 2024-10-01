// src/components/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Add axios for making API calls
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [netWorth, setNetWorth] = useState(0);
    const navigate = useNavigate();

    // Retrieve user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Fetch net worth based on user ID
        const fetchNetWorth = async () => {
            if (!user || !user.id) {
                console.error('User ID not found.');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/api/networth/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Assuming the response has the net worth value in a field named `netWorth`
                setNetWorth(response.data.netWorth);
            } catch (error) {
                console.error('Error fetching net worth:', error);
            }
        };

        fetchNetWorth();
    }, [user, token]);

    const handlePortfolioNavigation = () => {
        navigate('/portfolioManagement'); // Redirect to the Portfolio Management page
    };

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <button onClick={handlePortfolioNavigation} className="bg-blue-500 text-white p-2 rounded">
                Manage Portfolios
            </button>
            <div className="net-worth-display">
                <h2>Net Worth: ${netWorth.toFixed(2)}</h2>
            </div>
        </div>
    );
};

export default Dashboard;















                    

