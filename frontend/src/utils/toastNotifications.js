// toastNotifications.js
import { toast } from "react-toastify";

/**
 * Displays a success toast notification.
 * @param {string} message - The message to display.
 * @param {Object} [options] - Optional toast configuration.
 */
export const showSuccessToast = (message, options) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    ...options, // Allow overriding default options
  });
};

/**
 * Displays an error toast notification.
 * @param {string} message - The message to display.
 * @param {Object} [options] - Optional toast configuration.
 */
export const showErrorToast = (message, options) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    ...options, // Allow overriding default options
  });
};

/**
 * Displays an info toast notification.
 * @param {string} message - The message to display.
 * @param {Object} [options] - Optional toast configuration.
 */
export const showInfoToast = (message, options) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    ...options, // Allow overriding default options
  });
};

/**
 * Displays a warning toast notification.
 * @param {string} message - The message to display.
 * @param {Object} [options] - Optional toast configuration.
 */
export const showWarningToast = (message, options) => {
  toast.warn(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    ...options, // Allow overriding default options
  });
};
