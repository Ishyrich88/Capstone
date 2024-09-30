// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Portfolio from './components/Portfolio';
import AssetManagement from './components/AssetManagement';
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import Logout from './components/Logout';  // Import Logout component

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<LandingPage />} />  {/* Set LandingPage as default */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/portfolio/:id" element={<Portfolio />} />
                <Route path="/assets" element={<AssetManagement />} />
                <Route path="/logout" element={<Logout />} /> {/* Add Logout route */}
            </Routes>
        </Router>
    );
}

export default App;

