import React from 'react';
import { useParams } from 'react-router-dom';

const Portfolio = () => {
    const { id } = useParams();
    const portfolios = {
        1: {
            name: 'Retirement Fund',
            assets: [
                { name: 'Bitcoin', value: '$40,000', type: 'Crypto' },
                { name: 'Apple Stock', value: '$10,000', type: 'Stock' }
            ]
        },
        2: {
            name: 'Short-Term Investments',
            assets: [
                { name: 'Tesla Stock', value: '$30,000', type: 'Stock' },
                { name: 'Ethereum', value: '$20,000', type: 'Crypto' }
            ]
        }
    };

    const portfolio = portfolios[id];

    return (
        <div className="container mx-auto p-4">
            <h1>{portfolio.name}</h1>
            <div className="grid grid-cols-1 gap-6">
                {portfolio.assets.map((asset, index) => (
                    <div key={index} className="p-4 bg-white rounded shadow-md">
                        <h2>{asset.name}</h2>
                        <p>Type: {asset.type}</p>
                        <p>Value: {asset.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Portfolio;
