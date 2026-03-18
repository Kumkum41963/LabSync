// Storage utility functions for localstorage or cookies 

const TOKEN_KEY = import.meta.env.VITE_STORAGE_TOKEN_KEY
const ROLE_KEY = import.meta.env.VITE_STORAGE_ROLE_KEY
const USER_KEY = import.meta.env.VITE_STORAGE_USER_KEY

export const storage = {
    // Token management
    setToken: (token) => {
        localStorage.setItem(TOKEN_KEY, token)
    },
    getToken: () => {
        const token = localStorage.getItem(TOKEN_KEY)
        return token
    },
    removeToken: () => {
        localStorage.removeItem(TOKEN_KEY);
    },

    // Role management
    setRole: (role) => {
        localStorage.setItem(ROLE_KEY, role)
    },
    getRole: () => {
        const role = localStorage.getItem(ROLE_KEY)
        return role
    },
    removeRole: () => {
        localStorage.removeItem(ROLE_KEY);
    },

    // User management
    setUser: (user) => {
        localStorage.setItem(USER_KEY, JSON.stringify(user))
    },
    getUser: () => {
        const raw = localStorage.getItem(USER_KEY)
        return raw ? JSON.parse(raw) : null
    },
    removeUser: () => {
        localStorage.removeItem(USER_KEY);
    },

    clearLocalStorage: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(ROLE_KEY);
        localStorage.removeItem(USER_KEY);
    },

    getTheme: () => {
    const theme = localStorage.getItem("theme") || "dark";
    console.log("[storage] getTheme:", theme);
    return theme;
  },

  setTheme: (theme) => {
    console.log("[storage] setTheme:", theme);
    localStorage.setItem("theme", theme);
  },
}