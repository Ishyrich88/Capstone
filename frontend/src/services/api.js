import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: 'http://localhost:8080', // Adjust this to your API base URL
});

// Attach an interceptor to dynamically set the Authorization header
api.interceptors.request.use(
    (config) => {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');
        console.log('JWT Token from localStorage:', token); // Debug log to confirm token retrieval
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('Authorization header set with token'); // Debug log to confirm header set
        } else {
            console.warn('No JWT token found in localStorage');
        }
        return config;
    },
    (error) => {
        console.error('Error in request interceptor:', error);
        return Promise.reject(error);
    }
);

export default api;

