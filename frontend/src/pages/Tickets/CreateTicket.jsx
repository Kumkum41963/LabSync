import React from "react";
import TicketForm from "@/components/tickets/TicketForm";
import { useTickets } from "@/context/TicketsContext";
import { useNavigate } from "react-router-dom";
import BackButton from "@/components/tickets/BackButton";

const CreateTicket = () => {
  const { createTicket } = useTickets();
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    await createTicket(data);
    navigate("/tickets");
  };

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
            bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-500
            bg-clip-text text-transparent
            drop-shadow-[0_0_12px_rgba(0,255,200,0.25)]
          "
        >
          Raise a New Ticket
        </h1>
        <p className="text-gray-400 mt-3 text-sm sm:text-base">
          Provide the details below to create a new support request.
        </p>
      </div>

      {/* -------- 🎟️ Ticket Form -------- */}
      <TicketForm mode="create" onSubmit={handleCreate} />
    </div>
  );
};

export default CreateTicket;
