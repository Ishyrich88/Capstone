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
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
          <div className="container mx-auto p-8 w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 bg-opacity-70 rounded-lg shadow-md" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
            <h1 className="text-3xl font-bold mb-6 text-center text-white">Sign Up</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {success && <p className="text-green-500 text-center mb-4">{success}</p>}
            <form onSubmit={handleRegister} className="text-center">
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-white font-bold mb-2">First Name</label>
                <input
                  type="text"
                  className="p-3 mb-4 w-full border rounded text-black bg-white border-gray-500 font-semibold"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-white font-bold mb-2">Last Name</label>
                <input
                  type="text"
                  className="p-3 mb-4 w-full border rounded text-black bg-white border-gray-500 font-semibold"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-white font-bold mb-2">Email</label>
                <input
                  type="email"
                  className="p-3 mb-4 w-full border rounded text-black bg-white border-gray-500 font-semibold"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-white font-bold mb-2">Password</label>
                <input
                  type="password"
                  className="p-3 w-full border rounded text-black bg-white border-gray-500 font-semibold"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="bg-light-blue-500 text-white font-bold p-3 rounded w-full hover:bg-blue-700 transition duration-200 ease-in-out">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      );
      
      
};

export default Register;

