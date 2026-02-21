import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const getStoredToken = () => {
  const rawToken = localStorage.getItem('token');

  if (!rawToken) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawToken);
    return typeof parsed === 'string' ? parsed : rawToken;
  } catch {
    return rawToken;
  }
};

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// User API
export const userApi = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

// Calculator API
export const calculatorApi = {
  calculate: (data) => api.post('/calculator/calculate', data),
  estimate: (data) => api.post('/calculator/estimate', data),
  getScenarios: (data) => api.post('/calculator/scenario', data),
  saveForecast: (data) => api.post('/calculator/save-forecast', data),
  getUserForecasts: () => api.get('/calculator/forecasts'),
  getForecast: (id) => api.get(`/calculator/forecasts/${id}`),
  deleteForecast: (id) => api.delete(`/calculator/forecasts/${id}`),
};

export default api;
