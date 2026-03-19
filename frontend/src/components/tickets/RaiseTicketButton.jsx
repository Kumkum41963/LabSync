import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RaiseTicketButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/tickets/create")}
      className="
        inline-flex items-center gap-2
        px-5 py-2.5 rounded-lg
        bg-primary text-primary-foreground
        hover-elevate
        border border-[var(--primary-border)]
        font-medium
      "
    >
      <Plus size={16} />
      Create Ticket
    </button>
  );
};

export default RaiseTicketButton;