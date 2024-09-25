import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const portfolios = [
        { id: 1, name: 'Retirement Fund', totalValue: '$100,000', assetsCount: 5 },
        { id: 2, name: 'Short-Term Investments', totalValue: '$50,000', assetsCount: 3 }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-dark-start to-dark-end p-4 text-white">
            <h1 className="text-3xl font-bold mb-6 text-center">My Portfolios</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {portfolios.map((portfolio) => (
                    <div key={portfolio.id} className="p-6 bg-secondary rounded shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-2xl font-bold mb-2">{portfolio.name}</h2>
                        <p className="text-textSecondary">Total Value: {portfolio.totalValue}</p>
                        <p className="text-textSecondary">Number of Assets: {portfolio.assetsCount}</p>
                        <Link to={`/portfolio/${portfolio.id}`} className="text-accent hover:underline mt-4 inline-block">View Portfolio</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
