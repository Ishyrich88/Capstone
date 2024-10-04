import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Logging out...");

        // Remove JWT token from local storage
        localStorage.removeItem('token');
        console.log("JWT Token removed");

        // Optionally remove user-related information
        localStorage.removeItem('user');
        console.log("User information removed");

        // Navigate to login page
        if (navigate) {
            console.log("Navigating to /login...");
            navigate('/login');
        } else {
            console.error("Navigation function is not available.");
        }
    }, [navigate]);

    return (
        <div>
            <h2>You have been logged out</h2>
        </div>
    );
};

export default Logout;

