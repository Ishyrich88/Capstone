// src/components/Logout.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Remove JWT token from local storage
        localStorage.removeItem('jwtToken');
        // Optionally remove user-related information
        localStorage.removeItem('user');
        // Redirect to login page
        navigate('/login');
    }, [navigate]);

    return (
        <div>
            <h2>You have been logged out</h2>
        </div>
    );
};

export default Logout;
