import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuthToken, removeAuthToken } from '../utils/client-storage';

const URL_PATH = process.env.REACT_APP_ENDPOINT;

// To prevent multiple error toasts from being shown in quick succession
let isErrorToastShown = false; // Flag to prevent multiple toasts

const client = axios.create({
  baseURL: URL_PATH, // Base URL for your API
  timeout: 10000, // Timeout after 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the token to every request
client.interceptors.request.use(
  (config) => {
    const token = getAuthToken() ?? '';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    toast.error('Request failed to send. Please try again.');
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    // If the response is successful, just return the response
    return response;
  },
  (error) => {
    // Show only one error toast within a short time span
    if (!isErrorToastShown) {
      isErrorToastShown = true;

      // Check if it's an unauthorized error
      if (error.response && error.response?.data?.message === 'Unauthorized') {
        toast.error('Unauthorized. Redirecting to login.');
        // Remove token and redirect to home
        removeAuthToken();
        window.location.href = '/';
      } else {
        // Show generic error message for other errors
        toast.error(
          error.response?.data?.message ||
            'Something went wrong. Please try again.'
        );
      }

      // Reset the flag after a small delay to allow future error notifications
      setTimeout(() => {
        isErrorToastShown = false;
      }, 2000); // 2 seconds delay (adjust as needed)
    }

    // Pass the error to the next handler
    return Promise.reject(error);
  }
);

export default client;
