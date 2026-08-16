import API from './api.js';

/**
 * Log in a user with credentials
 */
export const login = async (email, password) => {
  const response = await API.post('/auth/login', { email, password });
  return response.data;
};

/**
 * Register a new user
 */
export const register = async (name, email, password) => {
  const response = await API.post('/auth/register', { name, email, password });
  return response.data;
};

/**
 * Get current authenticated user details
 */
export const getMe = async () => {
  const response = await API.get('/auth/me');
  return response.data;
};

export default {
  login,
  register,
  getMe
};
