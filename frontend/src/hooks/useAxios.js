// import axios from "axios";
// import { storage } from "@/services/storage";
// import { useAuth } from "@/context/AuthContext";
// import { useMemo } from "react";
// import { useEffect } from "react";

// //  Creates a single Axios instance with interceptors for token and role management 
// // where it attaches them to headers for each call
// export const useAxios = () => {
//   console.log('useAxios loaded')
//   const { authToken } = useAuth();

//   const axiosInstance = useMemo(() => {
//     const baseURL =
//       import.meta.env.VITE_BASE_URL || "http://localhost:3000/api";

//     console.groupCollapsed("🧩 [useAxios] Initializing Axios");
//     console.log("➡️ Base URL:", baseURL);
//     console.log("🔑 Token present:", !!authToken);
//     console.groupEnd();

//     const instance = axios.create({
//       baseURL,
//       withCredentials: true,
//     });

//     // 🟡 REQUEST Interceptor
//     instance.interceptors.request.use(
//       (config) => {
//         const safeUrl = config.url?.startsWith("/")
//           ? config.url
//           : `/${config.url || ""}`;
//         config.url = safeUrl;

//         console.groupCollapsed("🚀 [Axios Request]");
//         console.log("📤 Method:", config.method?.toUpperCase());
//         console.log("🌍 URL:", `${config.baseURL}${safeUrl}`);
//         if (authToken) {
//           config.headers.Authorization = `Bearer ${authToken}`;
//           console.log("✅ Token attached in headers");
//         } else {
//           console.warn("⚠️ No auth token attached");
//         }
//         console.groupEnd();

//         return config;
//       },
//       (error) => {
//         console.error("❌ [Axios Request Error]", error);
//         return Promise.reject(error);
//       }
//     );

//     // 🟢 RESPONSE Interceptor
//     instance.interceptors.response.use(
//       (response) => {
//         console.groupCollapsed("📥 [Axios Response]");
//         console.log("✅ URL:", response.config.url);
//         console.log("📊 Status:", response.status);
//         console.log("🧾 Data:", response.data);
//         console.groupEnd();
//         return response;
//       },
//       (error) => {
//         console.groupCollapsed("🔥 [Axios Response Error]");
//         console.error("❌ URL:", error.config?.url);
//         console.error("📊 Status:", error.response?.status);
//         console.error("🧾 Data:", error.response?.data);
//         console.groupEnd();

//         return Promise.reject(error);
//       }
//     );

//     return instance;
//   }, [authToken]);

//   useEffect(() => {
//     console.log(
//       "🧠 [useAxios] Hook mounted — Axios instance ready with token:",
//       authToken ? "✅ Yes" : "❌ No"
//     );
//   }, [authToken]);

//   return axiosInstance;
// };
