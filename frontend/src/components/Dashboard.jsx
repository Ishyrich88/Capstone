import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPortfoliosByUserId, addPortfolio } from '../services/portfolioService';
import { fetchAssets, addAsset } from '../services/assetService';
import { fetchDebts, addDebt } from '../services/debtService';

const Dashboard = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [assets, setAssets] = useState([]);
    const [debts, setDebts] = useState([]);
    const [netWorth, setNetWorth] = useState(0);
    const [newPortfolioName, setNewPortfolioName] = useState('');
    const [assetName, setAssetName] = useState('');
    const [assetValue, setAssetValue] = useState('');  
    const [debtName, setDebtName] = useState('');
    const [debtValue, setDebtValue] = useState('');  
    const [assetSymbol, setAssetSymbol] = useState('');
    const [isRealTimeTracked, setIsRealTimeTracked] = useState(false);

    // Simulated userId for now
    const userId = 1;

    // Fetch portfolios, assets, and debts on component mount
    useEffect(() => {
        loadPortfolios();
        loadAssets();
        loadDebts();
    }, []);

    // Fetch portfolios using service
    const loadPortfolios = async () => {
        try {
            const portfoliosData = await fetchPortfoliosByUserId(userId);
            setPortfolios(portfoliosData);
        } catch (error) {
            console.error('Error loading portfolios:', error);
        }
    };

    // Add a new portfolio using service
    const handleAddPortfolio = async () => {
        if (!newPortfolioName.trim()) return;

        const newPortfolio = {
            userId: userId,
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

    // Fetch assets using service
    const loadAssets = async () => {
        try {
            const assetsData = await fetchAssets(userId); 
            setAssets(assetsData);
        } catch (error) {
            console.error('Error loading assets:', error);
        }
    };

    // Add an asset using service
    const handleAddAsset = async () => {
        // Validate input based on real-time tracking
        if (isRealTimeTracked) {
            if (!assetSymbol.trim()) {
                console.error('Symbol is required for real-time tracked assets');
                return;
            }
        } else {
            if (!assetName.trim() || !assetValue.trim() || isNaN(parseFloat(assetValue)) || parseFloat(assetValue) <= 0) {
                console.error('Asset value must be a positive number');
                return;
            }
        }

        // Construct asset object based on tracking type
        const newAsset = {
            userId: userId,
            assetName: assetName.trim(),
            value: isRealTimeTracked ? 0 : parseFloat(assetValue),  // Set value to 0 for real-time tracked assets
            symbol: isRealTimeTracked ? assetSymbol.trim() : null,  // Use symbol only for real-time tracked assets
            isRealTimeTracked,
        };

        try {
            const addedAsset = await addAsset(newAsset);
            setAssets([...assets, addedAsset]);
            // Reset state after adding the asset
            setAssetName('');
            setAssetValue('');
            setAssetSymbol('');
            setIsRealTimeTracked(false);
        } catch (error) {
            console.error('Error adding asset:', error);
        }
    };

    // Fetch debts using service
    const loadDebts = async () => {
        try {
            const debtsData = await fetchDebts(userId);  
            setDebts(debtsData);
        } catch (error) {
            console.error('Error loading debts:', error);
        }
    };

    // Add a debt using service
    const handleAddDebt = async () => {
        if (!debtName.trim() || !debtValue.trim() || isNaN(parseFloat(debtValue)) || parseFloat(debtValue) <= 0) {
            console.error('Debt value must be a positive number');
            return;
        }

        const newDebt = {
            userId: userId,
            debtName: debtName.trim(),
            value: parseFloat(debtValue) || 0,  
        };

        try {
            const addedDebt = await addDebt(newDebt);
            setDebts([...debts, addedDebt]);
            setDebtName('');
            setDebtValue('');
        } catch (error) {
            console.error('Error adding debt:', error);
        }
    };

    // Calculate net worth
    useEffect(() => {
        const totalAssets = assets.reduce((acc, asset) => acc + (isNaN(asset.value) ? 0 : asset.value), 0);
        const totalDebts = debts.reduce((acc, debt) => acc + (isNaN(debt.value) ? 0 : debt.value), 0);
        setNetWorth(totalAssets - totalDebts);
    }, [assets, debts]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-dark-start to-dark-end p-4 text-white">
            <h1 className="text-3xl font-bold mb-6 text-center">My Portfolios</h1>

            {/* Portfolio Management */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold">Create Portfolio</h2>
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Portfolio Name"
                        value={newPortfolioName}
                        onChange={(e) => setNewPortfolioName(e.target.value)}
                        className="p-2 mb-2 w-full border rounded text-black"
                    />
                    <button onClick={handleAddPortfolio} className="bg-accent text-white p-2 rounded">
                        Create Portfolio
                    </button>
                </div>

                {/* Display portfolios */}
                <h3 className="text-xl font-bold mt-6">Your Portfolios</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {portfolios.length > 0 ? portfolios.map((portfolio) => (
                        <div key={portfolio.id} className="p-6 bg-secondary rounded shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-2xl font-bold mb-2">{portfolio.name}</h2>
                            <Link to={`/portfolio/${portfolio.id}`} className="text-accent hover:underline mt-4 inline-block">
                                View Portfolio
                            </Link>
                        </div>
                    )) : <p>No portfolios available.</p>}
                </div>
            </div>

            {/* Asset Management */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold">Add Asset</h2>
                <input
                    type="text"
                    placeholder="Asset Name"
                    value={assetName}
                    onChange={(e) => setAssetName(e.target.value)}
                    className="p-2 mb-2 w-full border rounded text-black"
                />
                {!isRealTimeTracked && (
                    <input
                        type="number"
                        placeholder="Asset Value"
                        value={assetValue}
                        onChange={(e) => setAssetValue(e.target.value)}
                        className="p-2 mb-2 w-full border rounded text-black"
                    />
                )}
                {isRealTimeTracked && (
                    <input
                        type="text"
                        placeholder="Asset Symbol (e.g., AAPL)"
                        value={assetSymbol}
                        onChange={(e) => setAssetSymbol(e.target.value)}
                        className="p-2 mb-2 w-full border rounded text-black"
                    />
                )}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={isRealTimeTracked}
                        onChange={() => setIsRealTimeTracked(!isRealTimeTracked)}
                    />
                    <label className="ml-2">Track in Real-Time</label>
                </div>
                <button onClick={handleAddAsset} className="bg-accent text-white p-2 rounded mt-2">
                    Add Asset
                </button>

                <h3 className="text-xl font-bold mt-6">Assets</h3>
                <ul>
                    {assets.map(asset => (
                        <li key={asset.id}>
                            {asset.assetName}: ${asset.value ? asset.value.toFixed(2) : 0} {asset.isRealTimeTracked ? '(Real-Time)' : ''}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Debt Management */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold">Add Debt</h2>
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
                <button onClick={handleAddDebt} className="bg-accent text-white p-2 rounded mt-2">
                    Add Debt
                </button>

                <h3 className="text-xl font-bold mt-6">Debts</h3>
                <ul>
                    {debts.map(debt => (
                        <li key={debt.id}>
                            {debt.debtName}: ${debt.value ? debt.value.toFixed(2) : 0}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Net Worth */}
            <div className="mt-8">
                <h2 className="text-3xl font-bold">Net Worth: ${isNaN(netWorth) ? 0 : netWorth.toFixed(2)}</h2>
            </div>
        </div>
    );
};

export default Dashboard;


                    

