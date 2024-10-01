// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import PortfolioManagement from './components/PortfolioManagement';
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import Logout from './components/Logout';

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<LandingPage />} /> {/* Default Landing Page */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/portfolioManagement" element={<PortfolioManagement />} /> {/* New Portfolio Management Path */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </Router>
    );
}

export default App;


