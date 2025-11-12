import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTickets } from "@/context/TicketsContext";
import TicketList from "@/components/tickets/TicketList";
import RaiseTicketButton from "@/components/tickets/RaiseTicketButton";
import { useAuth } from "@/context/AuthContext";

const Tickets = () => {
  const navigate = useNavigate();
  const { tickets, getTickets } = useTickets();
  const { currentUser } = useAuth();

  useEffect(() => {
    getTickets(); // load all tickets on mount
  }, []);

  const handleTicketClick = (ticket) => {
    navigate(`/tickets/${ticket._id}`); // go to ticket details
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-4 sm:p-6 md:p-10 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Tickets
        </h1>
        <RaiseTicketButton />
      </div>

      {/* Grid/List view - can later switch based on role */}
      <TicketList tickets={tickets} onTicketClick={handleTicketClick} />
    </div>
  );
};

export default Tickets;
