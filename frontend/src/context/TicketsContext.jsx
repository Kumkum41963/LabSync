import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRole } from "@/context/RoleContext";
import { useAxios } from "@/hooks/useAxios";

const TicketsContext = createContext();

export const TicketsProvider = ({ children }) => {
  const axiosInstance = useAxios();
  const { currentUser } = useAuth();
  const { role, permissions } = useRole();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  // ===========================================================
  // 📡 FETCH ALL TICKETS
  // ===========================================================
  const getTickets = async () => {
    if (!currentUser) {
      console.warn("⚠️ [TicketsContext] No user found, skipping fetch.");
      return;
    }
    if (!axiosInstance) {
      console.warn("⚠️ [TicketsContext] Axios instance not ready yet.");
      return;
    }

    console.group("📡 [getTickets]");
    console.log("👤 User:", currentUser?.email || currentUser?._id);
    console.log("🌍 Endpoint:", axiosInstance.defaults.baseURL + "/tickets");

    setLoading(true);
    try {
      const res = await axiosInstance.get("/tickets");
      console.log("✅ Response data:", res.data);
      setTickets(res.data.tickets || []);
    } catch (err) {
      console.error("❌ [getTickets] Error fetching tickets:", err);
    } finally {
      setLoading(false);
      console.log("⏹️ Loading stopped");
      console.groupEnd();
    }
  };

  // ===========================================================
  // 🔍 FETCH SINGLE TICKET BY ID
  // ===========================================================
  const getTicketById = async (id) => {
    console.group("🔍 [getTicketById]");
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/tickets/${id}`);
      console.log("✅ Response data:", res.data);
      return res.data.ticket;
    } catch (error) {
      console.error("❌ [getTicketById] Error fetching ticket by ID:", error);
    } finally {
      setLoading(false);
      console.groupEnd();
    }
  };

  // ===========================================================
  // 🆕 CREATE NEW TICKET
  // ===========================================================
  const createTicket = async (data) => {
    console.group("🆕 [createTicket]");
    if (!permissions?.canCreate) {
      console.warn("🚫 Not allowed to create tickets");
      console.groupEnd();
      return;
    }

    try {
      console.log("📦 Payload:", data);
      const res = await axiosInstance.post("/tickets", data);
      console.log("✅ Ticket created:", res.data.ticket);
      setTickets((prev) => [...prev, res.data.ticket]);
      return res.data.ticket;
    } catch (err) {
      console.error("❌ [createTicket] Error:", err);
    } finally {
      console.groupEnd();
    }
  };

  // ===========================================================
  // ✏️ UPDATE EXISTING TICKET
  // ===========================================================
  const updateTicket = async (id, updates) => {
    console.group("✏️ [updateTicket]");
    console.log("🆔 ID:", id);
    console.log("📦 Updates:", updates);

    try {
      const res = await axiosInstance.put(`/tickets/${id}`, updates);
      console.log("✅ Updated ticket:", res.data.updatedTicket);
      setTickets((prev) =>
        prev.map((t) => (t._id === id ? res.data.updatedTicket : t))
      );
      return res.data.updatedTicket;
    } catch (err) {
      console.error("❌ [updateTicket] Error:", err);
    } finally {
      console.groupEnd();
    }
  };

  // ===========================================================
  // 🗑️ DELETE TICKET
  // ===========================================================
  const deleteTicket = async (id) => {
    console.group("🗑️ [deleteTicket]");
    console.log("🆔 ID:", id);

    if (!permissions?.canDelete && !permissions?.canDeleteOwn) {
      console.warn("🚫 Not allowed to delete tickets");
      console.groupEnd();
      return;
    }

    try {
      await axiosInstance.delete(`/tickets/${id}`);
      setTickets((prev) => prev.filter((t) => t._id !== id));
      console.log("✅ Ticket deleted successfully");
    } catch (err) {
      console.error("❌ [deleteTicket] Error:", err);
    } finally {
      console.groupEnd();
    }
  };

  // ===========================================================
  // 🎯 ASSIGN MODERATOR (ADMIN / LAB ASSISTANT ONLY)
  // ===========================================================
  const assignModerator = async (ticketId, moderatorId) => {
    console.group("🎯 [assignModerator]");
    console.log("🆔 Ticket:", ticketId);
    console.log("🧍 Moderator:", moderatorId);

    if (!["lab_assistant", "admin"].includes(role)) {
      console.warn("🚫 Unauthorized role:", role);
      console.groupEnd();
      return;
    }

    try {
      const res = await axiosInstance.post(`/tickets/${ticketId}/assign`, {
        moderatorId,
      });
      console.log("✅ Updated ticket:", res.data.ticket);
      setTickets((prev) =>
        prev.map((t) => (t._id === ticketId ? res.data.ticket : t))
      );
    } catch (err) {
      console.error("❌ [assignModerator] Error:", err);
    } finally {
      console.groupEnd();
    }
  };

  // ===========================================================
  // 🔁 REFRESH / RELOAD ALL TICKETS
  // ===========================================================
  const refreshTickets = async () => {
    console.group("🔁 [refreshTickets]");
    await getTickets();
    console.groupEnd();
  };

  // ===========================================================
  // ⚙️ AUTO FETCH ON USER LOGIN
  // ===========================================================
  useEffect(() => {
    console.log(
      "🧠 [TicketsContext] useEffect triggered (user or axios change)",
      { currentUser, axiosReady: !!axiosInstance }
    );
    if (currentUser && axiosInstance) getTickets();
  }, [currentUser, axiosInstance]);

  // ===========================================================
  // PROVIDER EXPORT
  // ===========================================================
  return (
    <TicketsContext.Provider
      value={{
        tickets,
        loading,
        role,
        permissions,
        getTickets,
        getTicketById,
        createTicket,
        updateTicket,
        deleteTicket,
        assignModerator,
        refreshTickets,
      }}
    >
      {children}
    </TicketsContext.Provider>
  );
};

// ===========================================================
// 🔄 CUSTOM HOOK
// ===========================================================
export const useTickets = () => useContext(TicketsContext);
