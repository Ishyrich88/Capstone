import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { fetchPortfoliosByUserId, addPortfolio, deletePortfolio } from '../services/portfolioService';
import { addAsset, fetchAssets, deleteAsset } from '../services/assetService';
import { addDebt, fetchDebts, deleteDebt } from '../services/debtService'; // Import deleteDebt function

const PortfolioManagement = () => {
  const [portfolios, setPortfolios] = useState([]); // Initialize portfolios as an empty array
  const [newPortfolioName, setNewPortfolioName] = useState('');
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [expandedPortfolioId, setExpandedPortfolioId] = useState(null); // Track the expanded portfolio
  const [isPortfolioSectionExpanded, setIsPortfolioSectionExpanded] = useState(true); // Track if the "Your Portfolios" section is expanded
  const [userId, setUserId] = useState(null); // userId should be null initially
  const [assets, setAssets] = useState([]); // Initialize assets as an empty array
  const [debts, setDebts] = useState([]); // Initialize debts as an empty array
  const [expandedDebt, setExpandedDebt] = useState(false);

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
      const jwtToken = localStorage.getItem('token');
      if (!jwtToken) {
        console.error('JWT token not found in local storage');
        return;
      }

      const response = await api.get('/auth/userinfo', {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
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

  const loadPortfolios = async (userId) => {
    try {
      const data = await fetchPortfoliosByUserId(userId);
      setPortfolios(Array.isArray(data) ? data : []); // Ensure portfolios is an array
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      setPortfolios([]); // Fallback to empty array on error
    }
  };

  const loadAssets = async (userId) => {
    try {
      const data = await fetchAssets(userId);
      setAssets(Array.isArray(data) ? data : []); // Ensure assets is an array
    } catch (error) {
      console.error('Error fetching assets:', error);
      setAssets([]); // Fallback to empty array on error
    }
  };

  const loadDebts = async (userId) => {
    try {
      const data = await fetchDebts(userId);
      setDebts(Array.isArray(data) ? data : []); // Ensure debts is an array
    } catch (error) {
      console.error('Error fetching debts:', error);
      setDebts([]); // Fallback to empty array on error
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
    } catch (error) {
      console.error('Error adding portfolio:', error);
    }
  };

  const handleSelectPortfolio = (portfolio) => {
    setSelectedPortfolio(portfolio);
    setExpandedPortfolioId(expandedPortfolioId === portfolio.id ? null : portfolio.id);
  };

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
      loadAssets(userId);
    } catch (error) {
      console.error('Error adding manual asset:', error);
    }
  };

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
      loadAssets(userId);
    } catch (error) {
      console.error('Error adding real-time asset:', error);
    }
  };

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
      loadDebts(userId);
    } catch (error) {
      console.error('Error adding debt:', error);
    }
  };

  // Handle deleting a debt
  const handleDeleteDebt = async (debtId) => {
    if (!window.confirm('Are you sure you want to delete this debt?')) return;

    try {
      await deleteDebt(debtId);
      setDebts(debts.filter((debt) => debt.id !== debtId)); // Remove deleted debt from the state
      alert('Debt deleted successfully');
    } catch (error) {
      console.error('Error deleting debt:', error);
    }
  };

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

  const handleDeleteAsset = async (assetId) => {
    if (!selectedPortfolio) return alert('Please select a portfolio.');
    if (!window.confirm('Are you sure you want to delete this asset?')) return;

    try {
      await deleteAsset(assetId);
      loadAssets(userId);
      alert('Asset deleted successfully');
    } catch (error) {
      console.error('Error deleting asset:', error);
    }
  };

  // Update totalPortfolioValue calculation to include error handling for empty states
  const totalPortfolioValue = portfolios.reduce((total, portfolio) => {
    const portfolioAssets = Array.isArray(assets) ? assets.filter((asset) => asset.portfolioId === portfolio.id) : [];
    const portfolioDebts = Array.isArray(debts) ? debts.filter((debt) => debt.portfolioId === portfolio.id) : [];

    // Sum of asset values
    const totalAssetValue = portfolioAssets.reduce((sum, asset) => sum + asset.value, 0);

    // Sum of debt values
    const totalDebtValue = portfolioDebts.reduce((sum, debt) => sum + debt.amount, 0);

    // Subtract debts from assets for each portfolio
    return total + totalAssetValue - totalDebtValue;
  }, 0);


  return (
    <div className="mx-auto p-4 text-primary-text font-roboto text-sm w-full min-h-screen" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Portfolio Management</h1>
  
      {/* Collapsible Portfolio Selection and Creation */}
      <div className="mb-6 p-6 rounded-lg shadow-sm text-sm w-full sm:w-full md:w-full lg:w-1/3 lg:mx-auto bg-opacity-70" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
        <h2
          className="text-xl font-bold mb-3 text-center cursor-pointer text-white"
          onClick={() => setIsPortfolioSectionExpanded(!isPortfolioSectionExpanded)}
        >
          Your Portfolios {isPortfolioSectionExpanded ? '▲' : '▼'} - Total Value: ${totalPortfolioValue.toFixed(2)}
        </h2>
        {isPortfolioSectionExpanded && (
          <ul className="mb-4">
            {portfolios.length > 0 ? (
              portfolios.map((portfolio) => (
                <li key={portfolio.id} className="mb-2 border-b">
                  <div
                    className={`flex justify-between items-center cursor-pointer p-2 hover:bg-blue-700 hover:text-white rounded-sm ${
                      expandedPortfolioId === portfolio.id ? 'bg-light-blue-500 text-white' : 'bg-gray-900'
                    }`}
                    onClick={() => handleSelectPortfolio(portfolio)}
                  >
                    <span className="font-semibold text-white">
                      {portfolio.name} {expandedPortfolioId === portfolio.id ? '▲' : '▼'}
                    </span>
                    <span className="font-semibold text-white">
                      Total: $
                      {assets
                        .filter((asset) => asset.portfolioId === portfolio.id)
                        .reduce((total, asset) => total + asset.value, 0)
                        .toFixed(2)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePortfolio(portfolio.id);
                      }}
                      className="bg-light-blue-500 text-white font-bold p-2 rounded hover:bg-blue-700 transition duration-200 ease-in-out"
                    >
                      Delete
                    </button>
                  </div>
  
                  {/* Expanded portfolio content */}
                  {expandedPortfolioId === portfolio.id && (
                    <div className="p-3 rounded-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
                      <h3 className="text-lg font-bold mb-2 text-white">Assets:</h3>
                      {assets
                        .filter((asset) => asset.portfolioId === portfolio.id)
                        .map((asset) => (
                          <div key={asset.id} className="flex justify-between items-center p-2 border-b bg-white rounded-sm">
                            <span className="font-semibold text-black">{asset.assetName} - ${asset.value.toFixed(2)}</span>
                            <button
                              onClick={() => handleDeleteAsset(asset.id)}
                              className="bg-light-blue-500 text-white font-bold p-2 rounded hover:bg-blue-700 transition duration-200 ease-in-out"
                            >
                              Delete
                            </button>
                          </div>
                        ))}
                    </div>
                  )}
                </li>
              ))
            ) : (
              <p className="font-semibold text-white">No portfolios available.</p>
            )}
          </ul>
        )}
  
        <input
          type="text"
          placeholder="New Portfolio Name"
          value={newPortfolioName}
          onChange={(e) => setNewPortfolioName(e.target.value)}
          className="p-3 mb-2 w-full border rounded text-black bg-white border-gray-500 font-semibold"
        />
        <button onClick={handleAddPortfolio} className="bg-light-blue-500 text-white font-bold p-3 rounded w-full hover:bg-blue-700 transition duration-200 ease-in-out">
          Create Portfolio
        </button>
      </div>
  
      {/* Add Manual Asset Section */}
      <div className="mb-6 p-6 rounded-lg shadow-sm text-sm w-full sm:w-full md:w-full lg:w-1/3 lg:mx-auto bg-opacity-70" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
        <h2 className="text-xl font-bold mb-3 text-center text-white">Enter Your Investments</h2>
        <div>
          <input
            type="text"
            placeholder="Asset Name"
            value={manualAssetName}
            onChange={(e) => setManualAssetName(e.target.value)}
            className="p-3 mb-2 w-full border rounded text-black bg-white border-gray-500 font-semibold"
          />
          <input
            type="number"
            placeholder="Asset Value"
            value={manualAssetValue}
            onChange={(e) => setManualAssetValue(e.target.value)}
            className="p-3 mb-2 w-full border rounded text-black bg-white border-gray-500 font-semibold"
          />
          <button onClick={handleAddManualAsset} className="bg-light-blue-500 text-white font-bold p-3 rounded w-full hover:bg-blue-700 transition duration-200 ease-in-out">
            Enter Investments
          </button>
        </div>
      </div>
  
      {/* Add Real-Time Asset Section */}
      <div className="mb-6 p-6 rounded-lg shadow-sm text-sm w-full sm:w-full md:w-full lg:w-1/3 lg:mx-auto bg-opacity-70" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
        <h2 className="text-xl font-bold mb-3 text-center text-white">Enter Your Crypto & Stock</h2>
        <div>
          <input
            type="text"
            placeholder="Real-Time Asset Name"
            value={realTimeAssetName}
            onChange={(e) => setRealTimeAssetName(e.target.value)}
            className="p-3 mb-2 w-full border rounded text-black bg-white border-gray-500 font-semibold"
          />
          <input
            type="text"
            placeholder="Asset Symbol (e.g., AAPL)"
            value={realTimeAssetSymbol}
            onChange={(e) => setRealTimeAssetSymbol(e.target.value)}
            className="p-3 mb-2 w-full border rounded text-black bg-white border-gray-500 font-semibold"
          />
          <select
            value={realTimeAssetType}
            onChange={(e) => setRealTimeAssetType(e.target.value)}
            className="p-3 mb-2 w-full border rounded text-black bg-white border-gray-500 font-semibold"
          >
            <option value="STOCK">Stock</option>
            <option value="CRYPTO">Crypto</option>
          </select>
          <button onClick={handleAddRealTimeAsset} className="bg-light-blue-500 text-white font-bold p-3 rounded w-full hover:bg-blue-700 transition duration-200 ease-in-out">
            Enter Stock or Crypto
          </button>
        </div>
      </div>
  
      {/* Add Debt Section */}
      <div className="mb-6 p-6 rounded-lg shadow-sm text-sm w-full sm:w-full md:w-full lg:w-1/3 lg:mx-auto bg-opacity-70" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
        <div
          className="cursor-pointer p-3 rounded flex justify-between text-primary-text bg-light-blue-500 hover:bg-blue-700 hover:text-white hover:shadow-lg hover:shadow-blue-300"
          onClick={() => setExpandedDebt(!expandedDebt)}
        >
          <span className="font-bold text-white">Manage Debts {expandedDebt ? '▲' : '▼'}</span>
          <span className="font-semibold text-white">
            Total Debt: ${debts.reduce((total, debt) => total + debt.amount, 0).toFixed(2)}
          </span>
        </div>
  
        {expandedDebt && (
          <div className="mt-4">
            {debts.length > 0 ? (
              debts.map((debt) => (
                <div key={debt.id} className="flex justify-between items-center p-2 border-b bg-white rounded-sm">
                  <span className="font-semibold text-black">{debt.debtName} - ${debt.amount.toFixed(2)}</span>
                  <button
                    onClick={() => handleDeleteDebt(debt.id)}
                    className="bg-light-blue-500 text-white font-bold p-2 rounded hover:bg-blue-700 transition duration-200 ease-in-out"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="font-semibold text-white">No debts available.</p>
            )}
            <div className="mt-4">
              <h3 className="text-lg font-bold text-white">Add New Debt</h3>
              <input
                type="text"
                placeholder="Debt Name"
                value={debtName}
                onChange={(e) => setDebtName(e.target.value)}
                className="p-3 mb-2 w-full border rounded text-black bg-white border-gray-500 font-semibold"
              />
              <input
                type="number"
                placeholder="Debt Value"
                value={debtValue}
                onChange={(e) => setDebtValue(e.target.value)}
                className="p-3 mb-2 w-full border rounded text-black bg-white border-gray-500 font-semibold"
              />
              <button onClick={handleAddDebt} className="bg-light-blue-500 text-white font-bold p-3 rounded w-full hover:bg-blue-700 transition duration-200 ease-in-out">
                Add Debt
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
  
};

export default PortfolioManagement;












      










 