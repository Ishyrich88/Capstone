// src/components/Register.jsx

import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');  // Clear any previous error
        setSuccess('');  // Clear any previous success message
        try {
            const response = await axios.post('http://localhost:8080/auth/register', {
                firstName,
                lastName,
                email,
                password
            });
            setSuccess('User registered successfully!');
            console.log('Registered:', response.data);
        } catch (error) {
            setError('Error during registration');
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <form onSubmit={handleRegister}>
                <div className="mb-4">
                    <label htmlFor="firstName" className="block">First Name</label>
                    <input
                        type="text"
                        className="p-2 border w-full"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block">Last Name</label>
                    <input
                        type="text"
                        className="p-2 border w-full"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit" className="bg-green-500 text-white p-2 rounded">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Register;

