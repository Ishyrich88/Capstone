import React, { useState } from 'react';

const AssetManagement = () => {
    const [assets, setAssets] = useState([]);
    const [assetName, setAssetName] = useState('');
    const [assetValue, setAssetValue] = useState('');
    
    const handleAddAsset = () => {
        setAssets([...assets, { name: assetName, value: assetValue }]);
        setAssetName('');
        setAssetValue('');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Manage Assets</h1>
            <div className="mb-4">
                <label>Asset Name</label>
                <input
                    type="text"
                    value={assetName}
                    onChange={(e) => setAssetName(e.target.value)}
                    className="p-2 border w-full"
                />
            </div>
            <div className="mb-4">
                <label>Asset Value</label>
                <input
                    type="text"
                    value={assetValue}
                    onChange={(e) => setAssetValue(e.target.value)}
                    className="p-2 border w-full"
                />
            </div>
            <button onClick={handleAddAsset} className="bg-green-500 text-white p-2 rounded">
                Add Asset
            </button>
            <div className="mt-6">
                <h2 className="text-2xl">Assets</h2>
                <ul>
                    {assets.map((asset, index) => (
                        <li key={index}>{asset.name}: {asset.value}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AssetManagement;
