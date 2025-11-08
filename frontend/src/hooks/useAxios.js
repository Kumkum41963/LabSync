import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export const useAxios = () => {
  const { authToken, handleLogout } = useAuth();
  const [axiosInstance, setAxiosInstance] = useState(null);

  useEffect(() => {
    const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000/api";

    console.log("🧩 [useAxios] Setting up Axios instance...");
    console.log("➡️ Base URL:", baseURL);
    console.log("🔑 Auth Token Present:", !!authToken);

    const instance = axios.create({
      baseURL,
      // withCredentials: true,
    });

    // Request interceptor
    instance.interceptors.request.use(
      (config) => {
        console.log("🚀 [Request]", {
          method: config.method?.toUpperCase(),
          url: config.baseURL + config.url,
          //  url: config.baseURL,
          headers: config.headers,
        });
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
          console.log("✅ JWT token attached to request headers");
        } else {
          console.warn("⚠️ No JWT token found — sending request without auth");
        }
        return config;
      },
      (error) => {
        console.error("❌ [Request Error]", error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    instance.interceptors.response.use(
      (response) => {
        console.log("📥 [Response]", {
          url: response.config.url,
          status: response.status,
          data: response.data,
        });
        return response;
      },
      (error) => {
        console.error("🔥 [Response Error]", {
          url: error.config?.url,
          status: error.response?.status,
          message: error.message,
          data: error.response?.data,
        });

        if (error.response?.status === 401) {
          console.warn("🚫 Unauthorized (401) — triggering logout...");
          handleLogout();
        }
        return Promise.reject(error);
      }
    );

    axios.defaults = instance.defaults;
    setAxiosInstance(instance);

    console.log("✅ [useAxios] Axios instance configured successfully");

  }, [authToken, handleLogout]);

  return axiosInstance;
};

