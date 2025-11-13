import React, { useContext, useEffect, useState } from "react";
import TicketForm from "@/components/tickets/TicketForm";
import { useTickets } from "@/context/TicketsContext";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "@/components/tickets/BackButton";

const UpdateTicket = () => {
  const { tickets, updateTicket } = useTickets();
  const [ticket, setTicket] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const existing = tickets.find((t) => t._id === id);
    setTicket(existing);
  }, [id, tickets]);

  const handleUpdate = async (data) => {
    await updateTicket(id, data);
    navigate(`/tickets/${id}`);
  };

  if (!ticket) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400 text-lg">
        Loading ticket...
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen px-4 sm:px-6 md:px-10 py-10
        bg-gradient-to-b from-[#041013] via-[#07252d] to-[#0b2d33]
        text-gray-100
      "
    >
      {/* -------- 🔙 Back Button -------- */}
      <div className="mb-6">
        <BackButton label="Back to Tickets" />
      </div>

      {/* -------- 🦚 Page Header -------- */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1
          className="
            text-3xl sm:text-4xl font-bold tracking-tight
            bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500
            bg-clip-text text-transparent
            drop-shadow-[0_0_12px_rgba(0,255,255,0.25)]
          "
        >
          Update Ticket
        </h1>
        <p className="text-gray-400 mt-3 text-sm sm:text-base">
          Modify the details below and save your changes.
        </p>
      </div>

      {/* -------- 🎟️ Ticket Form -------- */}
      <TicketForm
        mode="edit"
        initialData={ticket}
        onSubmit={handleUpdate}
      />
    </div>
  );
};

export default UpdateTicket;


//  <TicketForm mode="edit" initialData={ticket} onSubmit={handleUpdate} />