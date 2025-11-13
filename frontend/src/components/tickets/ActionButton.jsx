import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTickets } from "@/context/TicketsContext";
import { toast } from "sonner";

const ActionButton = ({ ticketId }) => {
  const [hovered, setHovered] = useState(null); // for displaying hovered icons name
  const navigate = useNavigate();
  const { deleteTicket } = useTickets();

  // Shared Tailwind styles for both buttons
  const baseClasses = `
    relative flex items-center justify-center 
    w-9 h-9 rounded-lg transition-all duration-300
    shadow-md hover:shadow-lg active:scale-95
  `;

  const handleEdit = async () => {
    navigate(`/tickets/${ticketId}/edit`);
  };

  const handleDelete = async () => {
    try {
      // Call context delete function
      await deleteTicket(ticketId);

      // Show success toast using sonner
      toast.success("Ticket deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete ticket. Try again.");
      console.error("Delete failed:", error);
    }
  };
  return (
    <div className="flex gap-3">
      {/* ------------------ ✏️ Edit Button ------------------ */}
      <div
        className="relative"
        onMouseEnter={() => setHovered("edit")}
        onMouseLeave={() => setHovered(null)}
      >
        <Button
          size="icon"
          onClick={handleEdit}
          className={`${baseClasses}
            bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-800
            hover:from-sky-500 hover:via-teal-500 hover:to-blue-700
            text-white border border-cyan-500/50
          `}
        >
          <Pencil className="w-4 h-4" />
        </Button>

        {/* Tooltip shown when hovered */}
        {hovered === "edit" && (
          <span
            className="
              absolute -bottom-9 left-1/2 -translate-x-1/2
              bg-gradient-to-r from-cyan-600 to-blue-700
              text-white text-xs font-medium px-2 py-1 rounded-md
              shadow-md shadow-blue-900/30
            "
          >
            Edit
          </span>
        )}
      </div>

      {/* ------------------ 🗑️ Delete Button ------------------ */}
      <div
        className="relative"
        onMouseEnter={() => setHovered("delete")}
        onMouseLeave={() => setHovered(null)}
      >
        <Button
          size="icon"
          onClick={handleDelete}
          className={`${baseClasses}
            bg-gradient-to-r from-teal-500 via-rose-600 to-pink-700
            hover:from-pink-500 hover:via-rose-600 hover:to-red-700
            text-white border border-rose-500/50
          `}
        >
          <Trash2 className="w-4 h-4" />
        </Button>

        {/* Tooltip shown when hovered */}
        {hovered === "delete" && (
          <span
            className="
              absolute -bottom-9 left-1/2 -translate-x-1/2
              bg-gradient-to-r from-rose-600 to-pink-700
              text-white text-xs font-medium px-2 py-1 rounded-md
              shadow-md shadow-pink-900/30
            "
          >
            Delete
          </span>
        )}
      </div>
    </div>
  );
};

export default ActionButton;
