import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RaiseTicketButton = ({ variant = "default", size = "sm" }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => navigate("/tickets/create")}
      className={`
        flex items-center gap-2
        px-4 sm:px-5 py-2 sm:py-2.5
        text-sm sm:text-base font-medium
        rounded-xl transition-all duration-300 ease-out

        text-white
        bg-gradient-to-r from-teal-800 via-cyan-800 to-blue-900
        hover:from-teal-600 hover:via-sky-800 hover:to-indigo-900
        border border-cyan-500/50
        shadow-md shadow-blue-900/40
        hover:shadow-lg hover:shadow-violet-500/40
        focus:ring-2 focus:ring-teal-400/40 focus:outline-none
        active:scale-[0.98]
      `}
    >
      <Plus size={18} className="sm:w-5 sm:h-5" />
      <span className="hidden sm:inline">Raise Ticket</span>
    </Button>
  );
};

export default RaiseTicketButton;
