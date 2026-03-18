// Mapping the endpoints to functions
import axiosInstance from "./axiosInstance"

export const api = {
    auth: {
        login: (data) => axiosInstance.post("/auth/login", data),
        signup: (data) => axiosInstance.post("/auth/signup", data),
        me: () => axiosInstance.get("/auth/current-user"),
        logout: () => axiosInstance.post("/auth/logout"),
    },
    tickets: {
        getAllTickets: () => axiosInstance.get("/tickets"),
        getTicketById: (id) => axiosInstance.get(`/tickets/${id}`),
        delete: (id) => axiosInstance.delete(`/tickets/${id}`),
        update: (id, data) => axiosInstance.put(`/tickets/${id}`, data),
        create: (data) => axiosInstance.post("/tickets", data),
        assignModerator: (id, moderatorId) => axiosInstance.patch(`/tickets/${id}/assign`, { moderatorId }),
    }
}