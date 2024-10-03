import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { fetchPortfoliosByUserId, addPortfolio, deletePortfolio } from '../services/portfolioService';
import { addAsset, fetchAssets } from '../services/assetService';
import { addDebt, fetchDebts } from '../services/debtService';

const PortfolioManagement = () => {
  // State variables
  const [portfolios, setPortfolios] = useState([]);
  const [newPortfolioName, setNewPortfolioName] = useState('');
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [expandedPortfolioId, setExpandedPortfolioId] = useState(null); // Track the expanded portfolio
  const [userId, setUserId] = useState(null);
  const [assets, setAssets] = useState([]);
  const [debts, setDebts] = useState([]);
  const [showDebt, setShowDebt] = useState(false); // Toggle debt list

  // State for manual asset entry
  const [manualAssetName, setManualAssetName] = useState('');
  const [manualAssetValue, setManualAssetValue] = useState('');

  // State for real-time tracked asset entry
  const [realTimeAssetName, setRealTimeAssetName] = useState('');
  const [realTimeAssetSymbol, setRealTimeAssetSymbol] = useState('');
  const [realTimeAssetType, setRealTimeAssetType] = useState('STOCK');

  // State for debt form entry
  const [debtName, setDebtName] = useState('');
  const [debtValue, setDebtValue] = useState('');

  // Fetch user ID from backend
  const fetchUserId = async () => {
    try {
      const response = await api.get('/auth/userinfo');
      setUserId(response.data.id);
      console.log('User ID fetched successfully:', response.data.id);
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };

  // Load portfolios, assets, and debts when userId changes
  useEffect(() => {
    if (userId) {
      loadPortfolios(userId);
      loadAssets(userId);
      loadDebts(userId);
    }
  }, [userId]);

  // Fetch user ID on component mount
  useEffect(() => {
    fetchUserId();
  }, []);

  // Fetch portfolios based on user ID
  const loadPortfolios = async (userId) => {
    try {
      const data = await fetchPortfoliosByUserId(userId);
      setPortfolios(data);
      console.log('Portfolios loaded successfully:', data);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
    }
  };

  // Fetch all assets for the user
  const loadAssets = async (userId) => {
    try {
      const data = await fetchAssets(userId);
      setAssets(data);
      console.log('Assets loaded successfully:', data);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  // Fetch all debts for the user
  const loadDebts = async (userId) => {
    try {
      const data = await fetchDebts(userId);
      setDebts(data);
      console.log('Debts loaded successfully:', data);
    } catch (error) {
      console.error('Error fetching debts:', error);
    }
  };

  // Handle adding a new portfolio
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

  // Handle selecting a portfolio
  const handleSelectPortfolio = (portfolio) => {
    setSelectedPortfolio(portfolio);
    setExpandedPortfolioId(expandedPortfolioId === portfolio.id ? null : portfolio.id);
  };

  // Handle adding a new manual asset to the selected portfolio
  const handleAddManualAsset = async () => {
    if (!selectedPortfolio) return alert('Please select a portfolio.');
    if (!manualAssetName.trim() || !manualAssetValue.trim() || isNaN(parseFloat(manualAssetValue))) {
      return alert('Manual asset name and value are required.');
    }

    const newAsset = {
      userId,
      portfolioId: selectedPortfolio.id,
      assetType: 'MANUAL',
      assetName: manualAssetName.trim(),
      value: parseFloat(manualAssetValue),
      isRealTimeTracked: false,
    };

    try {
      await addAsset(newAsset);
      alert('Manual asset added successfully');
      setManualAssetName('');
      setManualAssetValue('');
      loadAssets(userId); // Reload assets after adding
    } catch (error) {
      console.error('Error adding manual asset:', error);
    }
  };

  // Handle adding a new real-time tracked asset to the selected portfolio
  const handleAddRealTimeAsset = async () => {
    if (!selectedPortfolio) return alert('Please select a portfolio.');
    if (!realTimeAssetName.trim() || !realTimeAssetSymbol.trim()) {
      return alert('Real-time asset name and symbol are required.');
    }

    const newAsset = {
      userId,
      portfolioId: selectedPortfolio.id,
      assetType: realTimeAssetType,
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
      loadAssets(userId); // Reload assets after adding
    } catch (error) {
      console.error('Error adding real-time asset:', error);
    }
  };

  // Handle adding a new debt for the user
  const handleAddDebt = async () => {
    if (!debtName.trim() || !debtValue.trim() || isNaN(parseFloat(debtValue))) {
      return alert('Debt name and value are required.');
    }

    const newDebt = {
      userId,
      debtName: debtName.trim(),
      amount: parseFloat(debtValue),
    };

    try {
      await addDebt(newDebt);
      alert('Debt added successfully');
      setDebtName('');
      setDebtValue('');
      loadDebts(userId); // Reload debts after adding
    } catch (error) {
      console.error('Error adding debt:', error);
    }
  };

  // Toggle debt list visibility
  const handleToggleDebtList = () => {
    setShowDebt(!showDebt);
  };

  // Handle deleting a portfolio
  const handleDeletePortfolio = async (portfolioId) => {
    if (!window.confirm('Are you sure you want to delete this portfolio?')) return;

    try {
      await deletePortfolio(portfolioId);
      setPortfolios(portfolios.filter((portfolio) => portfolio.id !== portfolioId));
      setSelectedPortfolio(null);
    } catch (error) {
      console.error('Error deleting portfolio:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-body-bg text-primary-text font-roboto">
      <h1 className="text-3xl font-bold mb-4 text-center">Portfolio Management</h1>

      {/* Portfolio Section */}
      <div className="mb-8 border rounded p-4 bg-gray-100">
        <h2 className="text-2xl font-bold text-center mb-4">Your Portfolios</h2>
        {/* Portfolio List */}
        <ul className="mb-4">
          {portfolios.length > 0 ? (
            portfolios.map((portfolio) => (
              <li key={portfolio.id} className="mb-2 border rounded p-2">
                <div
                  className={`flex justify-between items-center cursor-pointer bg-gray-200 hover:bg-gray-300 p-2 rounded ${
                    expandedPortfolioId === portfolio.id ? 'bg-accent' : ''
                  }`}
                  onClick={() => handleSelectPortfolio(portfolio)}
                >
                  <span className="font-medium">
                    {portfolio.name} - Total Value: $
                    {assets
                      .filter((asset) => asset.portfolioId === portfolio.id)
                      .reduce((acc, asset) => acc + asset.value, 0)
                      .toFixed(2)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePortfolio(portfolio.id);
                    }}
                    className="bg-red-500 text-white p-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
                {/* Collapsible portfolio content */}
                {expandedPortfolioId === portfolio.id && (
                  <div className="p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Assets:</h3>
                    {assets
                      .filter((asset) => asset.portfolioId === portfolio.id)
                      .map((asset) => (
                        <div key={asset.id} className="flex justify-between items-center p-2 border-b">
                          <span>
                            {asset.assetName} - ${asset.value.toFixed(2)}
                          </span>
                          <button
                            onClick={() => handleDeleteAsset(asset.id)}
                            className="bg-red-500 text-white p-1 rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    {assets.filter((asset) => asset.portfolioId === portfolio.id).length === 0 && (
                      <p>No assets available in this portfolio.</p>
                    )}
                  </div>
                )}
              </li>
            ))
          ) : (
            <p>No portfolios available.</p>
          )}
        </ul>

        {/* New Portfolio Input */}
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="New Portfolio Name"
            value={newPortfolioName}
            onChange={(e) => setNewPortfolioName(e.target.value)}
            className="p-2 mb-2 w-full border rounded text-black"
          />
          <button onClick={handleAddPortfolio} className="bg-blue-500 text-white p-2 rounded w-full">
            Create Portfolio
          </button>
        </div>
      </div>

      {/* Add Manual Asset Section */}
      <div className="mb-8 border rounded p-4 bg-gray-100">
        <h2 className="text-2xl font-bold text-center mb-4">Add Manual Asset</h2>
        <div className="flex flex-col items-center">
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
          <button onClick={handleAddManualAsset} className="bg-green-500 text-white p-2 rounded w-full">
            Add Manual Asset
          </button>
        </div>
      </div>

      {/* Add Real-Time Asset Section */}
      <div className="mb-8 border rounded p-4 bg-gray-100">
        <h2 className="text-2xl font-bold text-center mb-4">Add Your Cryptocurrency and Stock</h2>
        <div className="flex flex-col items-center">
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
          <select
            value={realTimeAssetType}
            onChange={(e) => setRealTimeAssetType(e.target.value)}
            className="p-2 mb-2 w-full border rounded text-black"
          >
            <option value="STOCK">Stock</option>
            <option value="CRYPTO">Crypto</option>
          </select>
          <button onClick={handleAddRealTimeAsset} className="bg-green-500 text-white p-2 rounded w-full">
            Add Real-Time Asset
          </button>
        </div>
      </div>

      {/* Add Debt Section */}
      <div className="mb-8 border rounded p-4 bg-gray-100">
        <h2 className="text-2xl font-bold text-center mb-4">Manage Debts</h2>
        <h3 className="text-lg font-semibold text-center">Add New Debt</h3>
        <div className="flex flex-col items-center">
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
          <button onClick={handleAddDebt} className="bg-red-500 text-white p-2 rounded w-full">
            Add Debt
          </button>
        </div>

        {/* Collapsible Debts List */}
        <div className="mt-4 border rounded p-2">
          <div
            className="cursor-pointer bg-gray-200 hover:bg-gray-300 p-2 rounded"
            onClick={handleToggleDebtList}
          >
            <h3 className="text-lg font-semibold">Your Debts {showDebt ? '▲' : '▼'} - Total Value: ${debts.reduce((acc, debt) => acc + debt.amount, 0).toFixed(2)}</h3>
          </div>
          {showDebt && (
            <div className="p-4 bg-gray-50">
              {debts.length > 0 ? (
                debts.map((debt) => (
                  <div key={debt.id} className="flex justify-between items-center p-2 border-b">
                    <span>
                      {debt.debtName} - ${debt.amount.toFixed(2)}
                    </span>
                  </div>
                ))
              ) : (
                <p>No debts available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioManagement;




      










 