import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Import the custom API instance
import { fetchPortfoliosByUserId, addPortfolio, deletePortfolio } from '../services/portfolioService';
import { addAsset } from '../services/assetService';
import { addDebt } from '../services/debtService';

const PortfolioManagement = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [newPortfolioName, setNewPortfolioName] = useState('');
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);
    const [userId, setUserId] = useState(null);

    // State for manual asset entry
    const [manualAssetName, setManualAssetName] = useState('');
    const [manualAssetValue, setManualAssetValue] = useState('');

    // State for real-time tracked asset entry
    const [realTimeAssetName, setRealTimeAssetName] = useState('');
    const [realTimeAssetSymbol, setRealTimeAssetSymbol] = useState('');
    const [realTimeAssetType, setRealTimeAssetType] = useState('STOCK'); // New state for asset type selection

    // Debt form state
    const [debtName, setDebtName] = useState('');
    const [debtValue, setDebtValue] = useState('');

    // Function to fetch user details from the backend
    const fetchUserId = async () => {
        try {
            const response = await api.get('/auth/userinfo'); // Use the imported `api` instance
            setUserId(response.data.id);
            console.log('User ID fetched successfully:', response.data.id);
        } catch (error) {
            console.error('Error fetching user information:', error.response ? error.response.data : error.message);
        }
    };

    // Fetch user information when component mounts
    useEffect(() => {
        fetchUserId();
    }, []);

    // Fetch portfolios when userId changes
    useEffect(() => {
        if (userId) {
            console.log('User ID is available, loading portfolios:', userId);
            loadPortfolios(userId);
        } else {
            console.error('User ID is not found. Cannot load portfolios.');
        }
    }, [userId]);

    // Function to fetch portfolios based on userId
    const loadPortfolios = async (userId) => {
        try {
            const data = await fetchPortfoliosByUserId(userId);
            setPortfolios(data);
            console.log('Portfolios loaded successfully:', data);
        } catch (error) {
            console.error('Error fetching portfolios:', error);
        }
    };

    // Function to handle creating a new portfolio
    const handleAddPortfolio = async () => {
        if (!newPortfolioName.trim()) return;

        const newPortfolio = {
            userId,
            name: newPortfolioName.trim(),
        };

        try {
            const addedPortfolio = await addPortfolio(newPortfolio);
            setPortfolios([...portfolios, addedPortfolio]);
            setNewPortfolioName('');
            console.log('New portfolio added successfully:', addedPortfolio);
        } catch (error) {
            console.error('Error adding portfolio:', error);
        }
    };

    // Function to handle deleting a portfolio
    const handleDeletePortfolio = async (portfolioId) => {
        if (!window.confirm('Are you sure you want to delete this portfolio?')) return;

        try {
            await deletePortfolio(portfolioId);
            setPortfolios(portfolios.filter((portfolio) => portfolio.id !== portfolioId));
            setSelectedPortfolio(null);
            console.log(`Portfolio with ID ${portfolioId} deleted successfully.`);
        } catch (error) {
            console.error('Error deleting portfolio:', error);
        }
    };

    // Function to handle adding a new manual asset to the selected portfolio
    const handleAddManualAsset = async () => {
        if (!selectedPortfolio) return alert('Please select a portfolio.');
        if (!manualAssetName.trim() || !manualAssetValue.trim() || isNaN(parseFloat(manualAssetValue))) {
            return alert('Manual asset name and value are required.');
        }

        const newAsset = {
            userId,
            portfolioId: selectedPortfolio.id,
            assetType: 'MANUAL', // Set asset type as MANUAL
            assetName: manualAssetName.trim(),
            value: parseFloat(manualAssetValue),
            isRealTimeTracked: false,
        };

        try {
            await addAsset(newAsset);
            alert('Manual asset added successfully');
            setManualAssetName('');
            setManualAssetValue('');
            console.log('Manual asset added successfully:', newAsset);
        } catch (error) {
            console.error('Error adding manual asset:', error);
        }
    };

    // Function to handle adding a new real-time tracked asset to the selected portfolio
    const handleAddRealTimeAsset = async () => {
        if (!selectedPortfolio) return alert('Please select a portfolio.');
        if (!realTimeAssetName.trim() || !realTimeAssetSymbol.trim()) {
            return alert('Real-time asset name and symbol are required.');
        }

        const newAsset = {
            userId,
            portfolioId: selectedPortfolio.id,
            assetType: realTimeAssetType, // Set the asset type dynamically (STOCK or CRYPTO)
            assetName: realTimeAssetName.trim(),
            symbol: realTimeAssetSymbol.trim(),
            isRealTimeTracked: true,
            value: 0,
        };

        try {
            await addAsset(newAsset);
            alert('Real-time asset added successfully');
            setRealTimeAssetName('');
            setRealTimeAssetSymbol('');
            console.log('Real-time asset added successfully:', newAsset);
        } catch (error) {
            console.error('Error adding real-time asset:', error);
        }
    };

    // Function to handle adding a new debt to the selected portfolio
    const handleAddDebt = async () => {
        if (!selectedPortfolio) return alert('Please select a portfolio.');
        if (!debtName.trim() || !debtValue.trim() || isNaN(parseFloat(debtValue))) {
            return alert('Debt name and value are required.');
        }

        const newDebt = {
            userId,
            debtName: debtName.trim(),
            amount: parseFloat(debtValue),
        };

        console.log(newDebt)
        try {
            await addDebt(newDebt);
            alert('Debt added successfully');
            setDebtName('');
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
                    {/* Dropdown to select asset type: STOCK or CRYPTO */}
                    <select
                        value={realTimeAssetType}
                        onChange={(e) => setRealTimeAssetType(e.target.value)}
                        className="p-2 mb-2 w-full border rounded text-black"
                    >
                        <option value="STOCK">Stock</option>
                        <option value="CRYPTO">Crypto</option>
                    </select>
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












