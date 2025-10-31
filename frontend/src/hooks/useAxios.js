import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "./useAuth";

// Reusable hook that automatically attaches the JWT token to every API req.
const useAxios = () => {
  const { authToken, handleLogout } = useAuth();

  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000",
    });

    // Add JWT headers for every req.
    axiosInstance.interceptors.request.use(
      config => {
        if (authToken) config.headers.Authorization = `Bearer ${authToken}`;
        return config;  // Always return config to continue request
      },
      error => Promise.reject(error)
    );

    // Automatically logout if token invalid
    axiosInstance.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) handleLogout();
        return Promise.reject(error);
      }
    );

    axios.defaults = axiosInstance.defaults;
  }, [authToken, handleLogout]);

  return axiosInstance
};

export default useAxios;
