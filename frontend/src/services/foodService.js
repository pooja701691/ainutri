import API from './api.js';

/**
 * Sends multipart form data containing food image and optional overrides to backend for AI scanning
 * @param {File} imageFile - The selected image file object
 * @param {string} mealType - e.g. 'breakfast', 'lunch', 'dinner', 'snack'
 * @param {string} notes - Extra context text
 * @param {number|string} quantity - Optional manual quantity override
 * @param {string} unit - Optional manual unit override
 */
export const analyzeFoodImage = async (imageFile, mealType = 'snack', notes = '', quantity = '', unit = '') => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('mealType', mealType);
  formData.append('notes', notes);
  if (quantity) formData.append('quantity', quantity);
  if (unit) formData.append('unit', unit);

  // We let Axios handle standard boundary parsing by not hardcoding Content-Type header manually
  const response = await API.post('/food/analyze', formData);
  return response.data;
};

/**
 * Fetch paginated food log logs
 */
export const getFoodHistory = async (page = 1, limit = 10) => {
  const response = await API.get(`/food/history?page=${page}&limit=${limit}`);
  return response.data;
};

/**
 * Fetch detail information for a single food entry ID
 */
export const getFoodEntryById = async (id) => {
  const response = await API.get(`/food/${id}`);
  return response.data;
};

/**
 * Request log deletion from database
 */
export const deleteFoodEntry = async (id) => {
  const response = await API.delete(`/food/${id}`);
  return response.data;
};

/**
 * Retrieve today's aggregated nutritional metrics compared to calorie target
 */
export const getDashboardSummary = async () => {
  const response = await API.get('/food/dashboard');
  return response.data;
};

export default {
  analyzeFoodImage,
  getFoodHistory,
  getFoodEntryById,
  deleteFoodEntry,
  getDashboardSummary
};
