import { Badge } from "@/components/ui/badge";

const statusColors = {
  open: "bg-green-500/20 text-green-400 border-green-500/30",
  pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  resolved: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  closed: "bg-gray-500/20 text-gray-300 border-gray-500/30",
};

const TicketStatusBadge = ({ status = "open" }) => {
  return (
    <Badge className={`${statusColors[status]} capitalize border`}>
      {status}
    </Badge>
  )
}

export default TicketStatusBadge