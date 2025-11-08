import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext"
import { useRole } from "@/context/RoleContext";
import { useAxios } from "@/hooks/useAxios";

const TicketsContext = createContext();

export const TicketsProvider = ({ children }) => {
  const axiosInstance = useAxios()
  const { user } = useAuth()
  const { role, permissions } = useRole()

  const [tickets, setTickets] = useState()
  const [loading, setLoading] = useState(false)

  // GET/Fetch tickets 
  const getTickets = async () => {
    if (!user) return; // no fetching 
    console.log('fetching tickets started!!!')
    setLoading(true); // start fetching
    try {
      const res = await axiosInstance.get("/tickets"); // backend auto-handles filtering by role
      setTickets(res.data.tickets || []);
    } catch (err) {
      console.error("❌ Failed to fetch tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new ticket
  const createTicket = async (data) => {
    if (!permissions.canCreate) {
      return alert("Not allowed to create ticket")
    };
    try {
      const res = await axiosInstance.post("/tickets", data);
      setTickets((prev) => [...prev, res.data.ticket]); // create new arr. to add 
    } catch (err) {
      console.error("❌ Error creating ticket:", err);
    }
  };

  // Update a ticket
  const updateTicket = async (id, updates) => {
    try {
      const res = await axiosInstance.put(`/tickets/${id}`, updates);
      setTickets((prev) =>
        prev.map((t) => (t._id === id ? res.data.updatedTicket : t))
      );
    } catch (err) {
      console.error("❌ Error updating ticket:", err);
    }
  };

  // Delete a ticket
  const deleteTicket = async (id) => {
    if (!permissions.canDelete && !permissions.canDeleteOwn) {
      return alert("Not allowed to delete ticket");
    }
    try {
      await axiosInstance.delete(`/tickets/${id}`);
      setTickets((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("❌ Error deleting ticket:", err);
    }
  };

  // Assign mods (lab_assistant/admin)
  const assignModerator = async (ticketId, moderatorId) => {
    if (!["lab_assistant", "admin"].includes(role)) {
      return alert("You are not authorized to assign moderators");
    }

    try {
      const res = await axiosInstance.post(`/tickets/${ticketId}/assign`, {
        moderatorId,
      });

      // Update the assigned ticket in state
      setTickets((prev) =>
        prev.map((t) => (t._id === ticketId ? res.data.ticket : t))
      );

      console.log("✅ Moderator assigned successfully");
    } catch (err) {
      console.error("❌ Error assigning moderator:", err);
    }
  };

  // Manual refresh helper (for refresh button)
  const refreshTickets = async () => {
    console.log("🔁 Refreshing tickets...");
    await getTickets();
  };

  // Fetch tickets when user logs in or changes
  useEffect(() => {
    if (user) {
      getTickets()
    };
  }, [user]);

  return (
    <TicketsContext.Provider
      value={{
        tickets,
        loading,
        getTickets,
        refreshTickets,
        createTicket,
        updateTicket,
        deleteTicket,
        assignModerator,
        permissions,
        role,
      }}
    >
      {children}
    </TicketsContext.Provider>
  );
};

// Custom hook for consuming tickets context easily
export const useTickets = () => useContext(TicketsContext);