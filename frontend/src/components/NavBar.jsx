import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/WealthSyncLogo.png';

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in by looking for the presence of the JWT token in localStorage
        setIsLoggedIn(!!localStorage.getItem('token'));
    }, []);

    const handleLogout = () => {
        // Remove JWT token and user information from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Update state to reflect that user is logged out
        setIsLoggedIn(false);

        // Redirect to the login page
        navigate('/login');
    };

    return (
        <nav className="bg-gradient-to-b from-dark-start to-dark-end text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo or Branding */}
                <div className="text-2xl font-bold">
                    <Link to="/">WealthSync</Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                    <Link to="/dashboard" className="hover:text-accent">Dashboard</Link>
                    {/* Show Login/Register if not logged in */}
                    {!isLoggedIn ? (
                        <>
                            <Link to="/login" className="hover:text-accent">Login</Link>
                            <Link to="/register" className="hover:text-accent">Register</Link>
                        </>
                    ) : (
                        // Show Logout if logged in
                        <button onClick={handleLogout} className="hover:text-accent">
                            Logout
                        </button>
                    )}
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-3xl">
                        {menuOpen ? '✖' : '☰'}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden">
                    <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-700">Dashboard</Link>
                    {/* Show Login/Register if not logged in */}
                    {!isLoggedIn ? (
                        <>
                            <Link to="/login" className="block px-4 py-2 hover:bg-gray-700">Login</Link>
                            <Link to="/register" className="block px-4 py-2 hover:bg-gray-700">Register</Link>
                        </>
                    ) : (
                        // Show Logout if logged in
                        <button onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-700">
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default NavBar;


