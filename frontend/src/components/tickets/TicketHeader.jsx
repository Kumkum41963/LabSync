import React, { useState } from "react";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTickets } from "@/context/TicketsContext";

const TicketHeader = ({ ticket }) => {
  const { deleteTicket } = useTickets()
  const [isDeleting, setIsDeleting] = useState(false)
  const navigate = useNavigate();
  const ticketId = ticket._id;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTicket(ticketId);
    } catch (error) {
      alert("Failed to delete ticket");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="flex items-start justify-between gap-4 mb-4">
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold mb-1 text-primary">
          {ticket.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {ticket.description}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Show the ticket details */}
        <button
          onClick={() => navigate(`/tickets/${ticket._id}`)}
          className="p-2 rounded-md hover:bg-accent/35 transition-colors"
        >
          <ExternalLink size={16} />
        </button>

        {/* Update ticket */}
        <button
          onClick={() => navigate(`/tickets/${ticket._id}/update`)}
          className="p-2 rounded-md hover:bg-accent/35 transition-colors"
        >
          <Pencil size={16} />
        </button>

        {/* Delete ticket */}
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-2 rounded-md hover:bg-destructive/30 text-destructive transition-colors disabled:opacity-50"
        >
          {isDeleting ? "..." : <Trash2 size={16} />}
        </button>
      </div>
    </div>
  );
};

export default TicketHeader;