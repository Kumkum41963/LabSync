import React, { useContext } from "react";
import TicketForm from "@/components/tickets/TicketForm";
import { useTickets } from "@/context/TicketsContext";
import { useNavigate } from "react-router-dom";

const CreateTicket = () => {
  const { createTicket } = useTickets();
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    await createTicket(data);
    navigate("/tickets");
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 text-gray-100">
      <TicketForm mode="create" onSubmit={handleCreate} />
    </div>
  );
};

export default CreateTicket;
