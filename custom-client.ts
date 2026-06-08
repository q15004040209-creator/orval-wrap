import axios from 'axios';

/**
 * Custom Axios client for orval-generated API calls
 * Configure base URL, interceptors, auth headers, etc.
 */
export const customClient = axios.create({
  baseURL: 'https://petstore.swagger.io/v2',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor: add auth token
customClient.interceptors.request.use((config) => {
  const token = process.env.API_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: global error handling
customClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized — redirect to login');
    } else if (error.response?.status === 404) {
      console.error('Resource not found');
    } else if (error.response?.status >= 500) {
      console.error('Server error');
    }
    return Promise.reject(error);
  }
);

export default customClient;
