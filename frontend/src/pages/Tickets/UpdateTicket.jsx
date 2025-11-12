import React, { useContext, useEffect, useState } from "react";
import TicketForm from "@/components/tickets/TicketForm";
import { useTickets } from "@/context/TicketsContext";
import { useNavigate, useParams } from "react-router-dom";

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
    return <p className="text-center text-gray-400 mt-10">Loading ticket...</p>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 text-gray-100">
      <TicketForm
        mode="edit"
        initialData={ticket}
        onSubmit={handleUpdate}
      />
    </div>
  );
};

export default UpdateTicket;
