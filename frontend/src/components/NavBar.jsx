import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);

    return (
        <nav className="bg-gradient-to-b from-dark-start to-dark-end text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo or Branding */}
                <div className="text-2xl font-bold">
                    <Link to="/">WealthSync</Link>
                </div>
                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="hover:text-accent">Dashboard</Link>
                    <Link to="/assets" className="hover:text-accent">Assets</Link>
                    <Link to="/login" className="hover:text-accent">Login</Link>
                    <Link to="/register" className="hover:text-accent">Register</Link>
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
                    <Link to="/" className="block px-4 py-2 hover:bg-gray-700">Dashboard</Link>
                    <Link to="/assets" className="block px-4 py-2 hover:bg-gray-700">Assets</Link>
                    <Link to="/login" className="block px-4 py-2 hover:bg-gray-700">Login</Link>
                    <Link to="/register" className="block px-4 py-2 hover:bg-gray-700">Register</Link>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
