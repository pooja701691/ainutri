import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService.js';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize and verify active sessions on reload
  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const res = await authService.getMe();
          if (res && res.success) {
            setUser(res.data.user);
            setIsAuthenticated(true);
          } else {
            clearSession();
          }
        } catch (error) {
          console.error('⚠️ Session validation failed:', error.message);
          clearSession();
        }
      }
      setLoading(false);
    };

    restoreSession();
  }, [token]);

  const clearSession = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  /**
   * Log in user
   */
  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const res = await authService.login(email, password);
      if (res && res.success && res.data.token) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        setIsAuthenticated(true);
        return res;
      }
      throw new Error(res.message || 'Login failed');
    } catch (err) {
      clearSession();
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Register new user
   */
  const registerUser = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await authService.register(name, email, password);
      if (res && res.success && res.data.token) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        setIsAuthenticated(true);
        return res;
      }
      throw new Error(res.message || 'Registration failed');
    } catch (err) {
      clearSession();
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Log out user
   */
  const logoutUser = () => {
    clearSession();
  };

  /**
   * Refreshes/updates local user settings from profile changes
   */
  const refreshUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        login: loginUser,
        register: registerUser,
        logout: logoutUser,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
