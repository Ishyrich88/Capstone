import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/login', {
                email,
                password,
            });

            // Store the JWT token in localStorage
            localStorage.setItem('token', response.data.jwtToken);

            // Store user information (including userId) in localStorage
            if (response.data.user && response.data.user.id) {
                localStorage.setItem('userId', response.data.user.id);
                localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user object
            } else {
                console.error('User ID is missing in the response data.');
            }

            // Display a success message
            alert('Login successful!');

            // Redirect to the dashboard page
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            setError('Invalid login credentials. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Login</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label htmlFor="email" className="block">Email</label>
                    <input
                        type="email"
                        className="p-2 border w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block">Password</label>
                    <input
                        type="password"
                        className="p-2 border w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;


