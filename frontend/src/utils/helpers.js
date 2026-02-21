/**
 * Local storage utilities
 */

export const storage = {
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item ${key}:`, error);
    }
  },

  getItem: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting item ${key}:`, error);
      return null;
    }
  },

  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key}:`, error);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};

/**
 * Number formatting utilities
 */
export const formatCurrency = (value, currency = 'INR') => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(value);
};

export const formatNumber = (value) => {
  return new Intl.NumberFormat('en-IN').format(value);
};

export const formatPercent = (value) => {
  return `${Math.round(value * 100) / 100}%`;
};

/**
 * Validation utilities
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 8;
};

/**
 * Date utilities
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Common calculations
 */
export const calculateYearsToRetirement = (currentAge, retirementAge) => {
  return Math.max(0, retirementAge - currentAge);
};

export const calculateMonthsToRetirement = (currentAge, retirementAge) => {
  return calculateYearsToRetirement(currentAge, retirementAge) * 12;
};
