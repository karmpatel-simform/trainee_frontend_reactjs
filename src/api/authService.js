import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKENDURL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authService = {
  register: async (userData) => {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  },
  
  login: async (credentials) => {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
  },
  
  getCurrentUser: async () => {
    try {
      const response = await api.get('/api/auth/me');
      return response.data;  // Returns the entire user object, including the username
    } catch (error) {
      console.error("Error fetching current user:", error);
      throw error;  // Optionally, handle the error based on your needs
    }
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('token'); // Check if token exists in localStorage
  },
};
