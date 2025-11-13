import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ label = "Back" }) => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(-1)}
      variant="outline"
      className="
        flex items-center gap-2 
        bg-gradient-to-r from-slate-800 via-indigo-900 to-slate-700
        text-gray-100
        hover:from-indigo-800 hover:via-purple-700 hover:to-pink-700
        hover:text-white
        border border-indigo-700
        shadow-md hover:shadow-pink-500/30
        rounded-xl px-4 py-2 transition-all duration-300
      "
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </Button>
  );
};

export default BackButton;
