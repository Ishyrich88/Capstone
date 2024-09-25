import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/login', {
                email,
                password
            });
            // Handle successful login
            console.log('Logged in:', response.data);
        } catch (error) {
            setError('Invalid login credentials');
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
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block">Password</label>
                    <input
                        type="password"
                        className="p-2 border w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
