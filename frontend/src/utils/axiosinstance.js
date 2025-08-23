import axios from "axios";
import { API_PATHS } from "./apiPaths";

// Create a new Axios instance
const axiosInstance = axios.create({
  baseURL: API_PATHS.BASE_URL,
  timeout: 10000,
});

// Request Interceptor: Attach the token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle expired tokens
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check if the error is due to an expired token
    const isTokenExpired = error.response && 
                           error.response.status === 401 && 
                           error.response.data.message === "Token expired. Please log in again.";

    if (isTokenExpired) {
      console.log("Token expired. Redirecting to login page.");
      // Clear the expired token from local storage
      localStorage.removeItem("token");
      // Redirect the user to the login page
      // window.location.href works, but for React Router, you might need a different approach
      // like storing a flag in a state management system (e.g., Context API)
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
