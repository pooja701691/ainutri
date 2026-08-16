/**
 * Format calories with commas
 */
export const formatCalories = (cal) => {
  return cal !== undefined ? Math.round(cal).toLocaleString() : '0';
};

/**
 * Format nutrient metrics to 1 decimal place
 */
export const formatNutrient = (val) => {
  return val !== undefined ? parseFloat(val).toFixed(1) : '0';
};

/**
 * Formats a date string beautifully
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

/**
 * Formats a time string beautifully
 */
export const formatTime = (dateString) => {
  if (!dateString) return '';
  const options = { hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleTimeString(undefined, options);
};

/**
 * Capitalize first letter of string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
