import axios from 'axios';

// const API_BASE_URL = 'http://localhost:3000/api';
const API_BASE_URL = 'http://192.168.1.93:3000/api';
// const API_BASE_URL = 'http://192.168.29.20:3000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptors
// apiClient.interceptors.request.use((config) => {
//   // Add auth token if exists
//   const token = ''; // Get from storage
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// Response interceptors
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle errors globally
//     return Promise.reject(error);
//   }
// );