import axios from 'axios'
import { storage } from './storage';

// Abstracted axios instace with baseURL 
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000/api",
    withCredentials: true,
});

// attach token and role when requesting
axiosInstance.interceptors.request.use((config) => {
    const token = storage.getToken()
    const role = storage.getRole()

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (role) {
        config.headers["x-user-role"] = role;
    }

    return config
})

// checking response status and errors
axiosInstance.interceptors.response.use(
    (response) => {
        console.log("[Axios ← Response]", response.status, response.config.url);
        return response;
    },
    (error) => {
        console.error("[Axios Error]", error.response?.status, error.message);
        return Promise.reject(error);
    }
)

export default axiosInstance;