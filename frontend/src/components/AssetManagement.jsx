import React, { useState } from 'react';

const AssetManagement = () => {
    const [assets, setAssets] = useState([]);
    const [debts, setDebts] = useState([]);
    const [assetName, setAssetName] = useState('');
    const [assetValue, setAssetValue] = useState('');
    const [debtName, setDebtName] = useState('');
    const [debtValue, setDebtValue] = useState('');
    const [editAssetIndex, setEditAssetIndex] = useState(null);
    const [editDebtIndex, setEditDebtIndex] = useState(null);
    const [editAssetData, setEditAssetData] = useState({ name: '', value: '' });
    const [editDebtData, setEditDebtData] = useState({ name: '', value: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Add asset function with validation
    const handleAddAsset = () => {
        if (!assetName || assetValue <= 0 || isNaN(assetValue)) {
            setError('Please provide a valid asset name and value');
            return;
        }

        setAssets([...assets, { name: assetName, value: parseFloat(assetValue) }]);
        setAssetName('');
        setAssetValue('');
        setError('');
        setSuccess('Asset added successfully!');
    };

    // Add debt function with validation
    const handleAddDebt = () => {
        if (!debtName || debtValue <= 0 || isNaN(debtValue)) {
            setError('Please provide a valid debt name and value');
            return;
        }

        setDebts([...debts, { name: debtName, value: parseFloat(debtValue) }]);
        setDebtName('');
        setDebtValue('');
        setError('');
        setSuccess('Debt added successfully!');
    };

    // Edit asset
    const handleEditAsset = (index) => {
        const asset = assets[index];
        setEditAssetIndex(index);
        setEditAssetData({ name: asset.name, value: asset.value });
    };

    const handleUpdateAsset = () => {
        if (!editAssetData.name || editAssetData.value <= 0 || isNaN(editAssetData.value)) {
            setError('Please provide valid asset details');
            return;
        }

        const updatedAssets = assets.map((asset, index) =>
            index === editAssetIndex ? { name: editAssetData.name, value: parseFloat(editAssetData.value) } : asset
        );
        setAssets(updatedAssets);
        setEditAssetIndex(null);
        setEditAssetData({ name: '', value: '' });
        setError('');
        setSuccess('Asset updated successfully!');
    };

    // Delete asset
    const handleDeleteAsset = (index) => {
        const updatedAssets = assets.filter((_, i) => i !== index);
        setAssets(updatedAssets);
        setSuccess('Asset deleted successfully!');
    };

    // Edit debt
    const handleEditDebt = (index) => {
        const debt = debts[index];
        setEditDebtIndex(index);
        setEditDebtData({ name: debt.name, value: debt.value });
    };

    const handleUpdateDebt = () => {
        if (!editDebtData.name || editDebtData.value <= 0 || isNaN(editDebtData.value)) {
            setError('Please provide valid debt details');
            return;
        }

        const updatedDebts = debts.map((debt, index) =>
            index === editDebtIndex ? { name: editDebtData.name, value: parseFloat(editDebtData.value) } : debt
        );
        setDebts(updatedDebts);
        setEditDebtIndex(null);
        setEditDebtData({ name: '', value: '' });
        setError('');
        setSuccess('Debt updated successfully!');
    };

    // Delete debt
    const handleDeleteDebt = (index) => {
        const updatedDebts = debts.filter((_, i) => i !== index);
        setDebts(updatedDebts);
        setSuccess('Debt deleted successfully!');
    };

    // Calculate total assets, debts, and net worth
    const totalAssets = assets.reduce((total, asset) => total + asset.value, 0);
    const totalDebts = debts.reduce((total, debt) => total + debt.value, 0);
    const netWorth = totalAssets - totalDebts;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Manage Assets & Debts</h1>

            {/* Error message */}
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            {/* Asset input section */}
            <div className="mb-4">
                <h2 className="text-2xl mb-4">Add Asset</h2>
                <label>Asset Name</label>
                <input
                    type="text"
                    value={assetName}
                    onChange={(e) => setAssetName(e.target.value)}
                    className="p-2 border w-full mb-2"
                />
                <label>Asset Value</label>
                <input
                    type="number"
                    value={assetValue}
                    onChange={(e) => setAssetValue(e.target.value)}
                    className="p-2 border w-full mb-4"
                    min="0"
                />
                <button onClick={handleAddAsset} className="bg-green-500 text-white p-2 rounded mr-4">
                    Add Asset
                </button>
            </div>

            {/* Debt input section */}
            <div className="mb-4">
                <h2 className="text-2xl mb-4">Add Debt</h2>
                <p>Enter all your debt like student loans, credit cards, etc.</p>
                <label>Debt Name</label>
                <input
                    type="text"
                    value={debtName}
                    onChange={(e) => setDebtName(e.target.value)}
                    className="p-2 border w-full mb-2"
                />
                <label>Debt Value</label>
                <input
                    type="number"
                    value={debtValue}
                    onChange={(e) => setDebtValue(e.target.value)}
                    className="p-2 border w-full mb-4"
                    min="0"
                />
                <button onClick={handleAddDebt} className="bg-red-500 text-white p-2 rounded">
                    Add Debt
                </button>
            </div>

            {/* List of assets and debts */}
            <div className="mt-6">
                <h2 className="text-2xl mb-4">Assets</h2>
                <ul>
                    {assets.map((asset, index) => (
                        <li key={index} className="mb-2 flex items-center justify-between">
                            {editAssetIndex === index ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editAssetData.name}
                                        onChange={(e) => setEditAssetData({ ...editAssetData, name: e.target.value })}
                                        className="p-2 border w-full mb-2"
                                    />
                                    <input
                                        type="number"
                                        value={editAssetData.value}
                                        onChange={(e) => setEditAssetData({ ...editAssetData, value: e.target.value })}
                                        className="p-2 border w-full mb-2"
                                    />
                                    <button onClick={handleUpdateAsset} className="bg-blue-500 text-white p-2 rounded">
                                        Update Asset
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <span>{asset.name}: ${asset.value.toFixed(2)}</span>
                                    <div>
                                        <button
                                            onClick={() => handleEditAsset(index)}
                                            className="bg-yellow-500 text-white p-2 rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteAsset(index)}
                                            className="bg-red-500 text-white p-2 rounded"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>

                <h2 className="text-2xl mb-4 mt-6">Debts</h2>
                <ul>
                    {debts.map((debt, index) => (
                        <li key={index} className="mb-2 flex justify-between">
                            {editDebtIndex === index ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editDebtData.name}
                                        onChange={(e) => setEditDebtData({ ...editDebtData, name: e.target.value })}
                                        className="p-2 border w-full mb-2"
                                    />
                                    <input
                                        type="number"
                                        value={editDebtData.value}
                                        onChange={(e) => setEditDebtData({ ...editDebtData, value: e.target.value })}
                                        className="p-2 border w-full mb-2"
                                    />
                                    <button onClick={handleUpdateDebt} className="bg-blue-500 text-white p-2 rounded">
                                        Update Debt
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <span>{debt.name}: ${debt.value.toFixed(2)}</span>
                                    <div>
                                        <button
                                            onClick={() => handleEditDebt(index)}
                                            className="bg-yellow-500 text-white p-2 rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteDebt(index)}
                                            className="bg-red-500 text-white p-2 rounded"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Display net worth */}
            <div className="mt-8">
                <h2 className="text-3xl font-bold">Net Worth</h2>
                <p className="text-xl">
                    Total Assets: ${totalAssets.toFixed(2)}<br />
                    Total Debts: ${totalDebts.toFixed(2)}<br />
                    <strong>Net Worth: ${netWorth.toFixed(2)}</strong>
                </p>
            </div>
        </div>
    );
};

export default AssetManagement;
