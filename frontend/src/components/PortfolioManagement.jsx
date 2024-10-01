import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Import the custom API instance
import { fetchPortfoliosByUserId, addPortfolio, deletePortfolio } from '../services/portfolioService';
import { addAsset } from '../services/assetService';
import { addDebt } from '../services/debtService';

const PortfolioManagement = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [newPortfolioName, setNewPortfolioName] = useState('');
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);
    const [userId, setUserId] = useState(null); // State for userId

    // State for manual asset entry
    const [manualAssetName, setManualAssetName] = useState('');
    const [manualAssetValue, setManualAssetValue] = useState('');

    // State for real-time tracked asset entry
    const [realTimeAssetName, setRealTimeAssetName] = useState('');
    const [realTimeAssetSymbol, setRealTimeAssetSymbol] = useState('');

    // Debt form state
    const [debtName, setDebtName] = useState('');
    const [debtValue, setDebtValue] = useState('');

    // Function to fetch user details from the backend
    const fetchUserId = async () => {
        try {
            const response = await api.get('/auth/userinfo'); // Use the imported `api` instance
            setUserId(response.data.id); // Set the userId from the response
            console.log('User ID fetched successfully:', response.data.id); // Log the user ID to verify
        } catch (error) {
            console.error('Error fetching user information:', error.response ? error.response.data : error.message);
        }
    };

    // Fetch user information when component mounts
    useEffect(() => {
        fetchUserId(); // Call the function to fetch user ID
    }, []); // Empty dependency array to run only once

    // Fetch portfolios when userId changes
    useEffect(() => {
        if (userId) {
            console.log('User ID is available, loading portfolios:', userId);
            loadPortfolios(userId); // Load portfolios once userId is available
        } else {
            console.error('User ID is not found. Cannot load portfolios.'); // Error handling for missing user ID
        }
    }, [userId]); // Dependency array with userId to re-run when it changes

    // Function to fetch portfolios based on userId
    const loadPortfolios = async (userId) => {
        try {
            const data = await fetchPortfoliosByUserId(userId); // API call to fetch portfolios
            setPortfolios(data); // Set the portfolios state with fetched data
            console.log('Portfolios loaded successfully:', data);
        } catch (error) {
            console.error('Error fetching portfolios:', error);
        }
    };

    // Function to handle creating a new portfolio
    const handleAddPortfolio = async () => {
        if (!newPortfolioName.trim()) return; // Return if name is empty

        const newPortfolio = {
            userId, // Include userId in the new portfolio object
            name: newPortfolioName.trim(),
        };

        try {
            const addedPortfolio = await addPortfolio(newPortfolio); // API call to add a new portfolio
            setPortfolios([...portfolios, addedPortfolio]); // Update the portfolios state
            setNewPortfolioName(''); // Reset the newPortfolioName state
            console.log('New portfolio added successfully:', addedPortfolio);
        } catch (error) {
            console.error('Error adding portfolio:', error);
        }
    };

    // Function to handle deleting a portfolio
    const handleDeletePortfolio = async (portfolioId) => {
        if (!window.confirm('Are you sure you want to delete this portfolio?')) return;

        try {
            await deletePortfolio(portfolioId); // API call to delete a portfolio
            setPortfolios(portfolios.filter((portfolio) => portfolio.id !== portfolioId)); // Remove the portfolio from UI
            setSelectedPortfolio(null); // Deselect portfolio if deleted
            console.log(`Portfolio with ID ${portfolioId} deleted successfully.`);
        } catch (error) {
            console.error('Error deleting portfolio:', error);
        }
    };

    // Function to handle adding a new manual asset to the selected portfolio
    const handleAddManualAsset = async () => {
        if (!selectedPortfolio) return alert('Please select a portfolio.'); // Return if no portfolio is selected
        if (!manualAssetName.trim() || !manualAssetValue.trim() || isNaN(parseFloat(manualAssetValue))) {
            return alert('Manual asset name and value are required.'); // Validation for asset fields
        }

        const newAsset = {
            userId, // Include userId in the new asset object
            portfolioId: selectedPortfolio.id, // Link asset to the selected portfolio
            assetName: manualAssetName.trim(),
            value: parseFloat(manualAssetValue),
            isRealTimeTracked: false, // Indicate it's a manual asset
        };

        console.log('Adding Manual Asset:', newAsset);

        try {
            await addAsset(newAsset); // API call to add a new asset
            alert('Manual asset added successfully');
            setManualAssetName(''); // Reset manual asset fields
            setManualAssetValue('');
            console.log('Manual asset added successfully:', newAsset);
        } catch (error) {
            console.error('Error adding manual asset:', error);
        }
    };

    // Function to handle adding a new real-time tracked asset to the selected portfolio
    const handleAddRealTimeAsset = async () => {
        if (!selectedPortfolio) return alert('Please select a portfolio.'); // Return if no portfolio is selected
        if (!realTimeAssetName.trim() || !realTimeAssetSymbol.trim()) {
            return alert('Real-time asset name and symbol are required.'); // Validation for asset fields
        }

        const newAsset = {
            userId, // Include userId in the new asset object
            portfolioId: selectedPortfolio.id, // Link asset to the selected portfolio
            assetName: realTimeAssetName.trim(),
            symbol: realTimeAssetSymbol.trim(),
            isRealTimeTracked: true, // Indicate it's a real-time tracked asset
            value: 0, // Initial value will be zero until updated in real-time
        };

        console.log('Adding Real-Time Asset:', newAsset);

        try {
            await addAsset(newAsset); // API call to add a new real-time asset
            alert('Real-time asset added successfully');
            setRealTimeAssetName(''); // Reset real-time asset fields
            setRealTimeAssetSymbol('');
            console.log('Real-time asset added successfully:', newAsset);
        } catch (error) {
            console.error('Error adding real-time asset:', error);
        }
    };

    // Function to handle adding a new debt to the selected portfolio
    const handleAddDebt = async () => {
        if (!selectedPortfolio) return alert('Please select a portfolio.'); // Return if no portfolio is selected
        if (!debtName.trim() || !debtValue.trim() || isNaN(parseFloat(debtValue))) {
            return alert('Debt name and value are required.'); // Validation for debt fields
        }

        const newDebt = {
            userId, // Include userId in the new debt object
            portfolioId: selectedPortfolio.id, // Link debt to the selected portfolio
            debtName: debtName.trim(),
            value: parseFloat(debtValue),
        };

        console.log('Adding Debt:', newDebt);

        try {
            await addDebt(newDebt); // API call to add a new debt
            alert('Debt added successfully');
            setDebtName(''); // Reset debt fields
            setDebtValue('');
            console.log('Debt added successfully:', newDebt);
        } catch (error) {
            console.error('Error adding debt:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Portfolio Management</h1>

            {/* Portfolio Selection and Creation */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold">Your Portfolios</h2>
                <ul className="list-disc pl-5 mb-4">
                    {portfolios.length > 0 ? (
                        portfolios.map((portfolio) => (
                            <li key={portfolio.id} className="flex justify-between items-center cursor-pointer">
                                <span onClick={() => setSelectedPortfolio(portfolio)}>
                                    {portfolio.name} {selectedPortfolio && selectedPortfolio.id === portfolio.id ? '(Selected)' : ''}
                                </span>
                                <button
                                    onClick={() => handleDeletePortfolio(portfolio.id)}
                                    className="bg-red-500 text-white p-1 rounded ml-4 hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </li>
                        ))
                    ) : (
                        <p>No portfolios available.</p>
                    )}
                </ul>

                <input
                    type="text"
                    placeholder="New Portfolio Name"
                    value={newPortfolioName}
                    onChange={(e) => setNewPortfolioName(e.target.value)}
                    className="p-2 mb-2 w-full border rounded text-black"
                />
                <button onClick={handleAddPortfolio} className="bg-blue-500 text-white p-2 rounded">
                    Create Portfolio
                </button>
            </div>

            {/* Add Manual Asset Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold">Add Manual Asset</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Manual Asset Name"
                        value={manualAssetName}
                        onChange={(e) => setManualAssetName(e.target.value)}
                        className="p-2 mb-2 w-full border rounded text-black"
                    />
                    <input
                        type="number"
                        placeholder="Manual Asset Value"
                        value={manualAssetValue}
                        onChange={(e) => setManualAssetValue(e.target.value)}
                        className="p-2 mb-2 w-full border rounded text-black"
                    />
                    <button onClick={handleAddManualAsset} className="bg-green-500 text-white p-2 rounded mt-2">
                        Add Manual Asset
                    </button>
                </div>
            </div>

            {/* Add Real-Time Asset Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold">Add Real-Time Asset</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Real-Time Asset Name"
                        value={realTimeAssetName}
                        onChange={(e) => setRealTimeAssetName(e.target.value)}
                        className="p-2 mb-2 w-full border rounded text-black"
                    />
                    <input
                        type="text"
                        placeholder="Asset Symbol (e.g., AAPL)"
                        value={realTimeAssetSymbol}
                        onChange={(e) => setRealTimeAssetSymbol(e.target.value)}
                        className="p-2 mb-2 w-full border rounded text-black"
                    />
                    <button onClick={handleAddRealTimeAsset} className="bg-green-500 text-white p-2 rounded mt-2">
                        Add Real-Time Asset
                    </button>
                </div>
            </div>

            {/* Add Debt Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold">Add Debt</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Debt Name"
                        value={debtName}
                        onChange={(e) => setDebtName(e.target.value)}
                        className="p-2 mb-2 w-full border rounded text-black"
                    />
                    <input
                        type="number"
                        placeholder="Debt Value"
                        value={debtValue}
                        onChange={(e) => setDebtValue(e.target.value)}
                        className="p-2 mb-2 w-full border rounded text-black"
                    />
                    <button onClick={handleAddDebt} className="bg-red-500 text-white p-2 rounded mt-2">
                        Add Debt
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PortfolioManagement;











