import API from './api.js';

/**
 * Retrieve user profile settings
 */
export const getProfile = async () => {
  const response = await API.get('/users/profile');
  return response.data;
};

/**
 * Update user profile details
 * @param {Object} profileData - Fields to update: { name, dailyCalorieGoal, profileImage }
 */
export const updateProfile = async (profileData) => {
  const response = await API.put('/users/profile', profileData);
  return response.data;
};

export default {
  getProfile,
  updateProfile
};
