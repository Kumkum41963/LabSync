import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const  RaiseTicketButton = ({ variant = "default", size = "sm" })=> {
  const navigate = useNavigate();

  return (
    <Button
      variant={variant}
      size={size}
      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 shadow-indigo-700/40"
      onClick={() => navigate("/tickets/createTicket")}
    >
      <Plus size={16} /> Raise Ticket
    </Button>
  );
}

export default RaiseTicketButton;