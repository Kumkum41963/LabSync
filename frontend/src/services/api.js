// Mapping the endpoints to functions
import axiosInstance from "./axiosInstance"

export const api = {
    auth: {
        login: (data) => axiosInstance.post("/auth/login", data),
        signup: (data) => axiosInstance.post("/auth/signup", data),
        logout: () => axiosInstance.post("/auth/logout"),
        getAllUsers: () => axiosInstance.get("/auth/users"),
        updateRole: (targetId, role) => axiosInstance.put(`/auth/${targetId}/update-role`, { role }),
        updateSkills: (targetId, skills) => axiosInstance.put(`/auth/${targetId}/update-skills`, { skills }),
        removeSkill: (targetId, skillToRemove) => axiosInstance.delete(`/auth/${targetId}/remove-skill`, {
            data: { skillToRemove }
        }),
        getCurrentUser: () => axiosInstance.get("/auth/current-user"),
        getUserById: (userId) => axiosInstance.get(`/auth/${userId}/user`)
    },
    tickets: {
        getAllTickets: () => axiosInstance.get("/tickets"),
        getTicketById: (id) => axiosInstance.get(`/tickets/${id}`),
        delete: (id) => axiosInstance.delete(`/tickets/${id}`),
        update: (id, data) => axiosInstance.put(`/tickets/${id}`, data),
        create: (data) => axiosInstance.post("/tickets", data),
        assignMod: (id, moderatorId) => axiosInstance.patch(`/tickets/${id}/assign-mod`, { moderatorId }),
        unassignMod: (id) => axiosInstance.patch(`/tickets/${id}/unassign-mod`),
        updateTicketByModerator: (id, data) => axiosInstance.patch(`/tickets/${id}/moderator-update`, data),
        getSuggestedModerators: (id) => axiosInstance.get(`/tickets/${id}/suggested-moderators`),
    },
    comments: {
        getByTicket: (ticketId) => axiosInstance.get(`/tickets/${ticketId}/comments`),
        create: (ticketId, text) => axiosInstance.post(`/tickets/${ticketId}/comments`, { text }),
        update: (commentId, text) => axiosInstance.put(`/comments/${commentId}`, { text }),
        delete: (commentId) => axiosInstance.delete(`/comments/${commentId}`),
    }
}