// Utility Helper Functions
// This file contains common utility functions that can be used throughout your bot

/**
 * Validates input based on type and constraints
 * @param {any} input - The input to validate
 * @param {string} type - The expected type ('string', 'number', 'email', etc.)
 * @param {Object} options - Additional validation options
 * @returns {Object} - Validation result with isValid boolean and error message
 */
function validateInput(input, type, options = {}) {
  const result = { isValid: true, error: null };

  // Check if input exists when required
  if (
    options.required &&
    (input === null || input === undefined || input === "")
  ) {
    result.isValid = false;
    result.error = "This field is required";
    return result;
  }

  // Skip validation if input is empty and not required
  if (!input && !options.required) {
    return result;
  }

  switch (type) {
    case "string":
      if (typeof input !== "string") {
        result.isValid = false;
        result.error = "Input must be a string";
      } else if (options.minLength && input.length < options.minLength) {
        result.isValid = false;
        result.error = `Input must be at least ${options.minLength} characters long`;
      } else if (options.maxLength && input.length > options.maxLength) {
        result.isValid = false;
        result.error = `Input must be no more than ${options.maxLength} characters long`;
      }
      break;

    case "number":
      const num = Number(input);
      if (isNaN(num)) {
        result.isValid = false;
        result.error = "Input must be a valid number";
      } else if (options.min !== undefined && num < options.min) {
        result.isValid = false;
        result.error = `Number must be at least ${options.min}`;
      } else if (options.max !== undefined && num > options.max) {
        result.isValid = false;
        result.error = `Number must be no more than ${options.max}`;
      }
      break;

    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input)) {
        result.isValid = false;
        result.error = "Input must be a valid email address";
      }
      break;

    case "url":
      try {
        new URL(input);
      } catch {
        result.isValid = false;
        result.error = "Input must be a valid URL";
      }
      break;

    default:
      result.isValid = false;
      result.error = `Unknown validation type: ${type}`;
  }

  return result;
}

/**
 * Formats a response object for consistent API responses
 * @param {any} data - The data to include in the response
 * @param {string} message - Optional message
 * @param {boolean} success - Whether the operation was successful
 * @returns {Object} - Formatted response object
 */
function formatResponse(data, message = null, success = true) {
  const response = {
    success,
    timestamp: new Date().toISOString(),
  };

  if (data !== null && data !== undefined) {
    response.data = data;
  }

  if (message) {
    response.message = message;
  }

  return response;
}

/**
 * Capitalizes the first letter of a string
 * @param {string} str - The string to capitalize
 * @returns {string} - The capitalized string
 */
function capitalize(str) {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Truncates a string to a specified length and adds ellipsis
 * @param {string} str - The string to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} - The truncated string
 */
function truncateString(str, maxLength = 100) {
  if (!str || typeof str !== "string") return str;
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - 3) + "...";
}

/**
 * Formats a timestamp into a readable date string
 * @param {Date|string|number} timestamp - The timestamp to format
 * @param {string} format - Format type ('short', 'long', 'time')
 * @returns {string} - Formatted date string
 */
function formatDate(timestamp, format = "short") {
  const date = new Date(timestamp);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const options = {
    short: { year: "numeric", month: "short", day: "numeric" },
    long: {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
    time: { hour: "2-digit", minute: "2-digit", second: "2-digit" },
  };

  return date.toLocaleDateString("en-US", options[format] || options.short);
}

/**
 * Generates a random string of specified length
 * @param {number} length - Length of the random string
 * @param {string} charset - Character set to use (default: alphanumeric)
 * @returns {string} - Random string
 */
function generateRandomString(
  length = 8,
  charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

/**
 * Delays execution for a specified number of milliseconds
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} - Promise that resolves after the delay
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Safely parses JSON with error handling
 * @param {string} jsonString - JSON string to parse
 * @param {any} defaultValue - Default value if parsing fails
 * @returns {any} - Parsed object or default value
 */
function safeJsonParse(jsonString, defaultValue = null) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.warn("Failed to parse JSON:", error.message);
    return defaultValue;
  }
}

module.exports = {
  validateInput,
  formatResponse,
  capitalize,
  truncateString,
  formatDate,
  generateRandomString,
  delay,
  safeJsonParse,
};
