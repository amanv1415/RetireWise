import React, { createContext, useContext, useEffect, useState } from 'react';
import { storage } from '../utils/helpers.js';
import { userApi } from '../utils/api.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from storage on mount
    const savedUser = storage.getItem('user');
    const savedToken = storage.getItem('token');

    if (savedUser && savedToken) {
      setUser(savedUser);
      setToken(savedToken);
    }

    setLoading(false);
  }, []);

  const register = async (
    email,
    name,
    gender,
    phone,
    dateOfBirth,
    city,
    occupation,
    password,
    confirmPassword
  ) => {
    try {
      const response = await userApi.register({
        email,
        name,
        gender,
        phone,
        dateOfBirth,
        city,
        occupation,
        password,
        confirmPassword,
      });

      const { user: userData, token: newToken } = response.data.data;

      storage.setItem('user', userData);
      storage.setItem('token', newToken);

      setUser(userData);
      setToken(newToken);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await userApi.login({ email, password });

      const { user: userData, token: newToken } = response.data.data;

      storage.setItem('user', userData);
      storage.setItem('token', newToken);

      setUser(userData);
      setToken(newToken);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const logout = () => {
    storage.removeItem('user');
    storage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
