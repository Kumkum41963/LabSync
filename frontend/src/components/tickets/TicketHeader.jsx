import React from "react";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TicketHeader = ({ ticket }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-start justify-between gap-4 mb-4">
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold mb-1">
          {ticket.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {ticket.description}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => navigate(`/tickets/${ticket._id}`)}
          className="p-2 rounded-md hover:bg-accent"
        >
          <ExternalLink size={16} />
        </button>

        <button
          onClick={() => navigate(`/tickets/update/${ticket._id}`)}
          className="p-2 rounded-md hover:bg-accent"
        >
          <Pencil size={16} />
        </button>

        <button
          className="p-2 rounded-md hover:bg-accent text-destructive">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TicketHeader;