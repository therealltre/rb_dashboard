import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInt = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST_API_KEY || 'http://localhost:3030', // fallback if env is not set
  timeout: 10000, // Optional: Set a timeout for requests
  headers: {
    'Content-Type': 'application/json',
    // Add other headers here if needed, such as authorization tokens
  },
});

// Interceptor for handling responses and errors
axiosInt.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'Server error!'
    )
);

export default axiosInt;
