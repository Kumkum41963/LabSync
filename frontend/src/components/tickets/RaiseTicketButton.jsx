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

        bg-gradient-to-r from-slate-700 to-indigo-700
        hover:from-slate-600 hover:to-indigo-600
        text-white
        shadow-md shadow-indigo-900/30 hover:shadow-lg hover:shadow-indigo-500/40
        focus:ring-2 focus:ring-indigo-400/60 focus:outline-none
        active:scale-[0.98]
      `}
    >
      <Plus size={18} className="sm:w-5 sm:h-5" />
      <span className="hidden sm:inline">Raise Ticket</span>
    </Button>
  );
};

export default RaiseTicketButton;
