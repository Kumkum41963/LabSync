import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

// Custom hook that returns an Axios instance with JWT + auto logout support
export const useAxios = () => {
  const { authToken, handleLogout } = useAuth();
  const [axiosInstance, setAxiosInstance] = useState(null);

  useEffect(() => {
    // Create a new Axios instance with base URL
    const instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000",
    });

    // Add JWT token (if exists) to every request header
    instance.interceptors.request.use(
      (config) => {
        if (authToken) config.headers.Authorization = `Bearer ${authToken}`;
        return config; // Always return config to continue the request
      },
      (error) => Promise.reject(error)
    );

    // Auto-logout user if token is invalid or expired (HTTP 401)
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) handleLogout();
        return Promise.reject(error);
      }
    );

    // (In case) Sync global defaults — only needed if other parts use axios directly
    axios.defaults = instance.defaults;

    // Save the configured instance for later use
    setAxiosInstance(instance);
  }, [authToken, handleLogout]);

  // Return the prepared Axios instance
  return axiosInstance;
};


