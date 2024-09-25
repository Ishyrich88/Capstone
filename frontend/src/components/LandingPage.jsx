import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="bg-gradient-to-b from-dark-start to-dark-end text-white min-h-screen">
            {/* Hero Section */}
            <div className="container mx-auto flex flex-col items-center justify-center text-center py-20">
                <h1 className="text-5xl font-bold mb-6">Welcome to WealthSync</h1>
                <p className="text-xl mb-8">
                    Manage all your assets in one place. Track your investments in real-time and grow your net worth with ease.
                </p>
                <Link to="/register">
                    <button className="bg-accent text-white py-3 px-8 rounded-lg shadow-lg hover:bg-accent-dark">
                        Get Started
                    </button>
                </Link>
            </div>

            {/* Creator Section */}
            <div className="container mx-auto flex flex-col items-center justify-center text-center py-10">
                <img
                    src="/path-to-your-image.jpg"
                    alt="Creator's Picture"
                    className="w-32 h-32 rounded-full mb-4"
                />
                <h2 className="text-3xl font-bold">Meet the Creator</h2>
                <p className="text-lg mt-4 max-w-2xl">
                    Hello, I'm Ismail Fofana. WealthSync was born from my passion to help individuals track and manage their wealth, and I am excited to share it with you.
                </p>
            </div>
        </div>
    );
};

export default LandingPage;
