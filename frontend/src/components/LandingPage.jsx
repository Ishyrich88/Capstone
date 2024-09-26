import React from 'react';
import { Link } from 'react-router-dom';
import Image1 from '../assets/Analysis resized.jpg';
import Image2 from '../assets/Familly Saving resized.jpg';
import Image3 from '../assets/Header Image resized.jpg';
import Image4 from '../assets/Secure resized.jpg';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-body-bg text-primary-text">
            <div className="container mx-auto p-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                    <div className="md:w-1/2 text-center md:text-left">
                        <h1 className="text-4xl font-bold mb-4">Track Your Investments With WealthSync</h1>
                        <p className="text-lg">
                            Manage all your financial assets in one place. Whether you're tracking stocks, crypto, or your personal investments, WealthSync helps you stay on top of your portfolio.
                        </p>
                        <Link to="/register">
                            <button className="bg-accent text-white font-bold py-2 px-4 rounded mt-6 hover:bg-blue-600">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                    <div className="md:w-1/2 mt-8 md:mt-0">
                        <img src={Image3} alt="Investment Analysis" className="rounded shadow-lg" />
                    </div>
                </div>

                {/* Why WealthSync Section */}
                <div className="mt-16 text-center">
                    <h2 className="text-3xl font-bold mb-10">Why WealthSync?</h2>
                </div>
                
                {/* Advanced Investment Analysis and Real-Time Data */}
                <div className="flex flex-col md:flex-row justify-center items-start mb-10">
                    <div className="md:w-1/2 mb-6 md:mb-0">
                        <img src={Image1} alt="Portfolio Management" className="w-[85%] h-auto rounded shadow-md" />
                    </div>
                    <div className="md:w-1/2 md:pl-8 flex items-start">
                        <div>
                            <h3 className="font-bold text-xl">Advanced Investment Analysis & Real-time Data</h3>
                            <p>Gain insights into your investment performance with our powerful analysis tools, while tracking asset values with real-time API integration.</p>
                        </div>
                    </div>
                </div>

                {/* Manage Your Finances */}
                <div className="flex flex-col md:flex-row justify-center items-start mb-10">
                    <div className="md:w-1/2 mb-6 md:mb-0 md:order-2">
                        <img src={Image2} alt="Client Management" className="w-[85%] h-auto rounded shadow-md" />
                    </div>
                    <div className="md:w-1/2 md:pr-8 flex items-start">
                        <div>
                            <h3 className="font-bold text-xl">Manage Your Finances and Your Loved Ones</h3>
                            <p>Manage your own financial portfolio, along with the ones of your loved ones, and be on the way to financial wealth.</p>
                        </div>
                    </div>
                </div>

                {/* Secure and Private */}
                <div className="flex flex-col md:flex-row justify-center items-start mb-10">
                    <div className="md:w-1/2 mb-6 md:mb-0">
                        <img src={Image4} alt="Security" className="w-[85%] h-auto rounded shadow-md" />
                    </div>
                    <div className="md:w-1/2 md:pl-8 flex items-start">
                        <div>
                            <h3 className="font-bold text-xl">Secure and Private</h3>
                            <p>Your data is secured with the latest encryption technology, ensuring that your information is protected at all times.</p>
                        </div>
                    </div>
                </div>

                {/* Sign Up and Log In Section */}
                <div className="mt-16 flex flex-col items-center">
                    <Link to="/register">
                        <button className="bg-accent text-white font-bold py-2 px-6 rounded mb-4 hover:bg-blue-600">
                            Sign Up
                        </button>
                    </Link>
                    <p className="text-lg">
                        Already a client?{' '}
                        <Link to="/login" className="text-accent underline">
                            Log in to your account
                        </Link>
                    </p>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="bg-gradient-to-b from-dark-start to-dark-end text-white py-6 mt-16">
                <div className="container mx-auto text-center">
                    <p className="text-sm">© 2024 WealthSync. All rights reserved.</p>
                    <div className="mt-4 space-x-4">
                        <Link to="/privacy-policy" className="text-accent">Privacy Policy</Link>
                        <Link to="/terms-of-service" className="text-accent">Terms of Service</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;