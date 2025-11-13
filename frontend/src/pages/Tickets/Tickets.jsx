import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTickets } from "@/context/TicketsContext";
import TicketList from "@/components/tickets/TicketList";
import RaiseTicketButton from "@/components/tickets/RaiseTicketButton";
import { useAuth } from "@/context/AuthContext";

const Tickets = () => {
  const { tickets, getTickets } = useTickets();

  useEffect(() => {
    getTickets(); // load all tickets on mount
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-4 sm:p-6 md:p-10 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_1px_4px_rgba(79,70,229,0.4)]"
        >
          Tickets
        </h1>

        <RaiseTicketButton />
      </div>

      {/* Grid/List view - can later switch based on role */}
      <TicketList tickets={tickets} />
    </div>
  );
};

export default Tickets;
