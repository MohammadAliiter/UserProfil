import axios from 'axios';

// Base URL for API
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Register user
export const registerUser = (userData) => API.post('/users/register', userData);

// Login user
export const loginUser = (userData) => API.post('/users/login', userData);

// Update user profile (PUT request)
export const updateUserProfile = (userData, token) =>
    API.put('/users/profile', userData, { headers: { Authorization: `Bearer ${token}` } });

// Get user profile (GET request)
export const getUserProfile = (token) =>
    API.get('/users/profile', { headers: { Authorization: `Bearer ${token}` } });
